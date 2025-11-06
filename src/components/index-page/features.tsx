import SlideInFromBottom from "@/components/slidein-from-bottom";
import FeatureCard from "@/components/index-page/feature-card";

//icons
import { Code, Languages, ShieldCheck, SlidersVertical, Zap } from "lucide-react";
import { Section } from "../ui/section";
import Eyebrow from "../eyebrow";

const benefitsData = [
  {
    id: 1,
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: "7 Pakistani Languages",
    description: "Comprehensive support for Urdu, Punjabi, Pashto, Sindhi, Saraiki, Balochi, and Kashmiri",
  },
  {
    id: 2,
    icon: <Zap  className="h-8 w-8 text-primary" />,
    title: "Fast & Accurate Detection",
    description: "Advanced AI algorithms deliver results in seconds with industry-leading accuracy",
  },
  {
    id: 3,
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Privacy-Focused Analysis",
    description:
      "Your videos are processed securely",
  },
  {
    id: 4,
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Easy Integration",
    description: "Simple API integration with comprehensive documentation and developer tools",
  },
  {
    id: 5,
    icon: <SlidersVertical className="h-8 w-8 text-primary" />,
    title: "Hassle Free Process",
    description: "Fill out a simple form, review, and let us handle the rest!.",
  },
];

function Features() {
  return (
    <Section className="flex flex-col items-center space-y-14 justify-center">
      {/* eyebrow */}
      <Eyebrow
        title="Smart"
        highlight="Language Detection"
        description="Experience the next generation of language detection technology built specifically for Pakistan's rich linguistic diversity."
      />
      <SlideInFromBottom delay={0.3}>
        <div className="grid grid-cols-12 gap-6 w-full">
          {benefitsData.map((item, index) => (
            <div
              key={item.id}
              className={`${
                index < 3
                  ? "col-span-12 md:col-span-6 lg:col-span-4"
                  : "col-span-12 md:col-span-6 lg:col-span-6"
              }`}
            >
              <FeatureCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </SlideInFromBottom>
    </Section>
  );
}

export default Features;
