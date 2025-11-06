import SlideInFromBottom from "./slidein-from-bottom";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  title: string;
  className?: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
}

function Eyebrow({
  title,
  className,
  highlight = "",
  description = "",
  align = "center",
}: EyebrowProps) {
  return (
    <div className={cn(`text-${align}`, className)}>
      <SlideInFromBottom delay={0}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">
          {title}{" "}
          {highlight && <span className="text-primary">{highlight}</span>}
        </h2>
      </SlideInFromBottom>

      {description && (
        <SlideInFromBottom delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </SlideInFromBottom>
      )}
    </div>
  );
}

export default Eyebrow;
