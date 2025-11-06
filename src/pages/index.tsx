import Features from "@/components/index-page/features";
import FeaturesBadges from "@/components/index-page/features-badges";
import HeroSection from "@/components/index-page/hero-section";
import StatsCounter from "@/components/index-page/stats-counter";
import { VideoUpload } from "@/components/index-page/video-upload";
import SlideInFromBottom from "@/components/slidein-from-bottom";

function Index() {
  return (
    <>
      <HeroSection />

      {/* Video Upload Section */}
      <SlideInFromBottom delay={0.2} className="mt-96">
        <VideoUpload />
      </SlideInFromBottom>

      {/* features badges */}
      <FeaturesBadges />
      {/* Status Counter */}
      <StatsCounter
        stats={[
          {
            label: "Videos Processed",
            value: 100,
          },
          {
            label: "Users Joined",
            value: 100,
          },
          {
            label: "Accuracy",
            value: 99,
            format: (val) => `${val.toFixed(2)}%`,
          },
          {
            label: "Minutes Analyzed",
            value: 100,
          },
        ]}
      />
      {/* features */}
      <Features />
    </>
  );
}

export default Index;
