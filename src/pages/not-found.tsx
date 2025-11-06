import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import SlideInFromBottom from "@/components/slidein-from-bottom";
import { Link } from "react-router";

function NotFound() {
  return (
    <Section className="pt-32 pb-20 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <SlideInFromBottom delay={0.2}>
          <h1 className="text-8xl sm:text-9xl font-bold text-primary mb-5">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-7 leading-relaxed">
            The page you're looking for doesn't exist. Let's get you back on track.
          </p>
          <Button className="text-lg rounded-full px-7 py-6" asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </SlideInFromBottom>
      </div>
    </Section>
  );
}

export default NotFound;
