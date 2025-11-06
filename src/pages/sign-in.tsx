import BlurryBlob from "@/components/animata/background/blurry-blob";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <BlurryBlob
        className="rounded-xl opacity-45 border-2 border-white"
        firstBlobColor="bg-violet-300 dark:bg-violet-500"
        secondBlobColor="bg-violet-300 dark:bg-violet-600"
      />
      <div className="absolute top-6 right-6 z-10">
        <ModeToggle />
      </div>
      <SignIn />
    </div>
  );
};
export default SignInPage;
