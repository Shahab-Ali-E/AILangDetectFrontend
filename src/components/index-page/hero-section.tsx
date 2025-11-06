import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import GlowingPill from "@/components/ui/glowing-pill";
import { Link } from "react-router";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonProps["variant"];
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

interface HeroSectionProps {
  title?: React.ReactNode;
  description?: string;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function HeroSection({
  title = (
    <>
      Detect Pakistani <br />
      Languages from Video with AI
    </>
  ),
  description = "Upload a video and let our AI recognize Urdu, Pashto, Punjabi, and more – fast, accurate, and automatic.",
  buttons = [],
  className,
}: HeroSectionProps) {
  return (
    <Section
      className={cn(
        "overflow-hidden pb-0 sm:pb-0 md:pb-0 max-w-full",
        className
      )}
    >
      <div className="absolute inset-0 h-[720px] top-0 w-full flex flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_70%,transparent)]">
        {/* rings */}
        <div className="size-[900px] hero-section-ring"></div>
        <div className="size-[1300px] hero-section-ring"></div>

        {/* rotating pills */}
        <OrbitingCircles radius={450} speed={0.4}>
          <GlowingPill label="Siraki" />
          <GlowingPill label="Pushto" />
          <GlowingPill label="Punjabi" />
        </OrbitingCircles>
        <OrbitingCircles radius={650} reverse speed={0.5}>
          <GlowingPill label="Urdu" />
          <GlowingPill label="Hindko" />
          <GlowingPill label="Kashmiri" />
          <GlowingPill label="Sindhi" />
        </OrbitingCircles>
      </div>

      <div className="max-w-container mx-auto flex flex-col gap-12 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-7">
          <h1 className="max-w-2xl animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-4xl leading-tight font-semibold text-balance text-transparent drop-shadow-2xl sm:text-5xl sm:leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="text-md max-w-xl animate-appear text-muted-foreground relative z-10 font-medium text-balance opacity-100 delay-100 sm:text-xl">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <div className="relative z-10 flex justify-center gap-4 delay-300">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="lg"
                  asChild
                >
                  <Link to={button.href}>
                    {button.icon}
                    {button.text}
                    {button.iconRight}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
