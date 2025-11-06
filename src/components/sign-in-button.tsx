import { SignInButton as ClerkSignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  return (
    // oauthFlow="popup" mode="modal"
    <ClerkSignInButton>
      <Button variant={"default"} className="rounded-full cursor-pointer">
        Sign in
      </Button>
    </ClerkSignInButton>
  );
}
