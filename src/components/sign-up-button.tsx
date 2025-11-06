import { SignUpButton as ClerkSignUpButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export default function SignUpButton() {
  return (
    <ClerkSignUpButton>
      <Button
        variant={"ghost"}
        className="cursor-pointer p-0 hover:bg-transparent"
      >
        Sign up
      </Button>
    </ClerkSignUpButton>
  );
}
