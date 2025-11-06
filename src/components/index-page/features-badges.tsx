import React from "react";
import { ActivitySquare, Globe, Languages, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SlideInFromBottom from "@/components/slidein-from-bottom";

// interface for badge features
interface FeatureBadge {
  label: string;
  icon: React.ReactNode;
}

const featuresBadges: FeatureBadge[] = [
  {
    label: "Real-Time Detection",
    icon: <ActivitySquare className="h-4 w-4" />,
  },
  {
    label: "Language Detection",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    label: "Multilingual Support",
    icon: <Languages className="h-4 w-4" />,
  },
  {
    label: "AI-Powered Accuracy",
    icon: <Target className="h-4 w-4" />,
  },
];

function FeaturesBadges() {
  return (
    <div className="relative z-10 flex flex-wrap justify-center gap-5 mt-10">
      {featuresBadges.slice(0, 5).map((feature, index) => (
        <SlideInFromBottom delay={index * 0.1} key={index}>
          <Badge
            // key={index}
            variant={"secondary"}
            className="border border-primary/50 bg-primary/15 rounded-full py-2 px-4"
          >
            <div className="flex items-center gap-2">
              <div className="text-primary">{feature.icon}</div>
              <p className="text-sm font-medium">{feature.label}</p>
            </div>
          </Badge>
        </SlideInFromBottom>
      ))}
    </div>
  );
}

export default FeaturesBadges;
