import { Menu } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import LaunchUI from "@/components/logos/launch-ui";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  NavbarCenter,
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import Navigation from "@/components/ui/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type React from "react";
import { Link } from "react-router";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import SignInButton from "@/components/sign-in-button";
import SignUpButton from "@/components/sign-up-button";
import { Skeleton } from "@/components/ui/skeleton";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: React.ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <LaunchUI />,
  name = "AILangDetect",
  homeUrl = siteConfig.url,
  mobileLinks = [
    { text: "Getting Startedd", href: siteConfig.url },
    { text: "Components", href: siteConfig.url },
    { text: "Documentation", href: siteConfig.url },
  ],
  // actions = [
  //   { text: "Sign in", href: siteConfig.signInUrl, isButton: false },
  //   {
  //     text: "Sign up",
  //     href: siteConfig.signUpUrl,
  //     isButton: true,
  //     variant: "default",
  //   },
  // ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  // Inside your component:
  const { isLoaded } = useAuth();
  return (
    <header
      className={cn(
        "relative top-5 z-50 max-w-4xl -translate-x-1/2 left-[50%]",
        className
      )}
    >
      <div className="fade-bottom absolute left-0 h-full w-full backdrop-blur-sm border border-primary/50 bg-primary/5 rounded-full"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent className="px-5">
          <NavbarLeft>
            <Link
              to={homeUrl}
              className="flex items-center gap-2 text-xl font-bold"
            >
              {logo}
              {name}
            </Link>
          </NavbarLeft>
          <NavbarCenter className="pl-10">
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarCenter>
          <NavbarRight>
            {/* theme toggle */}
            <ModeToggle />
            {/* actions button sign/signup */}
            {!isLoaded ? (
              // Show skeleton while auth is loading
              <Skeleton className="h-9 w-9 rounded-full bg-card-foreground/25" />
            ) : (
              <>
                <SignedOut>
                  <SignUpButton />
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </>
            )}
            {/* {actions.map((action, index) =>
              action.isButton ? (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  asChild
                  className="rounded-full"
                >
                  <Link to={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </Link>
                </Button>
              ) : (
                <Link
                  key={index}
                  to={action.href}
                  className="hidden text-sm md:block"
                >
                  {action.text}
                </Link>
              )
            )} */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="px-5 py-7">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    to={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{name}</span>
                  </Link>
                  {mobileLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
