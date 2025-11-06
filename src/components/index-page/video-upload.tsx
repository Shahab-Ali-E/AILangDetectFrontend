import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, FileVideo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApi } from "@/hooks/use-api";
import { DETECT_VIDEO_URL } from "@/constant/apiUrls";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

interface VideoUploadProps {
  className?: string;
}

export function VideoUpload({ className }: VideoUploadProps) {

  interface PredictionResponse {
    prediction?: string;
    probability?: number;
    video_path?: string; 
    extracted_audio?: string; 
  }

  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const { data: prediction, isLoading, request, reset: resetApi } = useApi<PredictionResponse>();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const getLanguageLabel = (code?: string) => {
    if (!code) return "Unknown";
    switch (code.toLowerCase()) {
      case "ps":
        return "Pashto";
      case "ur":
        return "Urdu";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    if (!videoRef.current || !isProcessing) return;

    const video = videoRef.current;

    const captureThumbnail = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/png");
      setThumbnail(imageUrl);
    };

    // Wait a moment to ensure metadata is loaded and video is seekable
    const handleLoadedData = () => {
      video.currentTime = 0;
      video.pause();
      captureThumbnail();
    };

    if (video.readyState >= 2) {
      handleLoadedData();
    } else {
      video.addEventListener("loadeddata", handleLoadedData, { once: true });
    }
  }, [isProcessing]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!isSignedIn) {
      toast.info("Please sign in", { description: "Sign in to use video language detection." });
      navigate("/sign-in");
      return;
    }
    const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
    const MAX_DURATION_SECONDS = 120; // 2 minutes

    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Invalid file type", { description: "Please upload a video file." });
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      toast.error("File too large", { description: "Maximum allowed size is 20 MB." });
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    try {
      const duration = await new Promise<number>((resolve, reject) => {
        const vid = document.createElement("video");
        const cleanup = () => {
          vid.removeAttribute("src");
          vid.load();
        };
        vid.preload = "metadata";
        vid.onloadedmetadata = () => {
          const d = vid.duration;
          cleanup();
          resolve(d);
        };
        vid.onerror = () => {
          cleanup();
          reject(new Error("Could not read video metadata"));
        };
        vid.src = objectUrl;
      });

      if (!isFinite(duration) || duration <= 0) {
        toast.error("Invalid video", { description: "Could not determine video duration." });
        URL.revokeObjectURL(objectUrl);
        return;
      }

      if (duration > MAX_DURATION_SECONDS) {
        toast.error("Video too long", { description: "Maximum allowed length is 2 minutes." });
        URL.revokeObjectURL(objectUrl);
        return;
      }

      setVideo(file);
      setVideoUrl(objectUrl);
    } catch (e) {
      URL.revokeObjectURL(objectUrl);
      toast.error("Upload failed", { description: e instanceof Error ? e.message : "Unknown error" });
    }
  }, [isSignedIn, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (rejections) => {
      const MAX_SIZE_MB = 20;
      const rejected = rejections[0];
      if (!rejected) return;
      const hasFileTooLarge = rejected.errors?.some((e) => e.code === "file-too-large");
      const hasInvalidType = rejected.errors?.some((e) => e.code === "file-invalid-type");
      if (hasFileTooLarge) {
        toast.error("File too large", { description: `Maximum allowed size is ${MAX_SIZE_MB} MB.` });
      } else if (hasInvalidType) {
        toast.error("Invalid file type", { description: "Please upload a supported video format." });
      } else {
        toast.error("Cannot upload file");
      }
    },
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"],
    },
    maxFiles: 1,
    maxSize: 20 * 1024 * 1024,
    multiple: false,
  });

  const handleDetectLanguage = async () => {
    if (!video) return;
    if (!isSignedIn) {
      toast.info("Please sign in", { description: "Sign in to detect language for your video." });
      navigate("/sign-in");
      return;
    }
    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", video);

    const result = await request({
      url: DETECT_VIDEO_URL,
      method: "POST",
      body: formData,
      // Show a tailored success message when the API succeeds
      successMessage: "Language detection completed",
    });

    if (result) {
      // success toast is already shown by the hook; keep UX snappy here
    } else {
      // error toast handled in hook; optional local hint
      toast.info("Please try again after fixing the issue.");
    }

    setIsProcessing(false);
  };

  const resetUpload = () => {
    setVideo(null);
    setVideoUrl(null);
    setIsProcessing(false);
    setThumbnail(null);
    resetApi();
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <AnimatePresence mode="wait">
        {!video ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed border-primary/60 bg-primary/5 rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer",
                isDragActive &&
                  "active border-primary/80 bg-primary/10 scale-105"
              )}
            >
              <input {...getInputProps()} />
              <motion.div
                className="flex flex-col items-center space-y-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-4 rounded-full bg-primary/20">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">
                    {isDragActive
                      ? "Drop your video here"
                      : "Upload a video file"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your video file here, or click to browse
                  </p>
                  {!isDragActive && (
                    <Button variant="outline" className="pointer-events-none">
                      <FileVideo className="h-4 w-4 mr-2" />
                      Choose Video
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports MP4, AVI, MOV, WMV, FLV, WebM
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Processing Preview / Results */}
            {isProcessing || isLoading ? (
              <>
                {/* Processing Animation */}
                <div className="flex flex-col h-80">
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={cn(
                        "p-6 rounded-xl border bg-card-foreground/5 flex flex-col flex-grow",
                        thumbnail && "text-white"
                      )}
                      style={{
                        backgroundImage: thumbnail
                          ? `url(${thumbnail})`
                          : undefined,
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <div>
                          <p className="font-medium">Analyzing your video...</p>
                          <p className="text-sm text-muted-foreground">
                            Our AI is detecting Pakistani languages in your
                            video
                          </p>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-4 w-full bg-muted rounded-full h-2">
                        <motion.div
                          className="bg-primary h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, ease: "easeInOut" }}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                {prediction ? (
                  <div className="p-6 rounded-2xl bg-card border space-y-5">
                    <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center space-y-2">
                      <p className="text-sm text-muted-foreground">Detected Language</p>
                      <h3 className="text-4xl font-extrabold tracking-tight text-primary">
                        {getLanguageLabel(prediction.prediction)}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Code: {prediction.prediction?.toUpperCase() || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border">
                      <div>
                        <p className="text-sm text-muted-foreground">File</p>
                        <p className="font-medium truncate max-w-[220px]">{video?.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{(video!.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>


                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" onClick={resetUpload} className="cursor-pointer">Analyze Another Video</Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden bg-primary">
                    {videoUrl && (
                      <video
                        src={videoUrl}
                        className="w-full h-64 object-contain bg-black"
                        preload="metadata"
                        controls
                        ref={videoRef}
                      />
                    )}
                  </div>
                )}

                {/* Video Info */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-card border">
                  <div>
                    <p className="font-medium">{video.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(video.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={resetUpload}
                    className="cursor-pointer"
                  >
                    Remove
                  </Button>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleDetectLanguage}
                disabled={isProcessing || isLoading}
                className="flex-1 h-12 text-base cursor-pointer"
              >
                {isProcessing || isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Detecting Languages...
                  </>
                ) : (
                  "Detect Language"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={resetUpload}
                className="h-12 cursor-pointer"
                disabled={isProcessing || isLoading}
              >
                Upload New Video
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
