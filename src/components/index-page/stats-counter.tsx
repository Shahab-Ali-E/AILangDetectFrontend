import { Section } from "@/components/ui/section";
import Counter from "@/components/animata/text/counter";
import Eyebrow from "../eyebrow";
import SlideInFromBottom from "@/components/slidein-from-bottom";

type StatItem = {
  label: string;
  value: number;
  format?: (value: number) => string;
};

interface StatsCounterProps {
  stats: StatItem[];
}

const StatsCounter = ({ stats }: StatsCounterProps) => {
  return (
    <Section className="flex flex-col items-center space-y-14 justify-center mt-32">
      {/* eyebrow */}
      <Eyebrow
        title="Trusted by"
        highlight="Thousands"
        description="Join the growing community of developers, researchers, and businesses using our platform."
      />
        <SlideInFromBottom delay={0.3}>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 sm:py-8 max-w-5xl w-full 
        rounded-xl bg-primary/10 border border-primary/20 shadow-md shadow-primary/20 
        divide-y md:divide-y-0 md:divide-x divide-primary/30"
      >
          {stats.map(({ label, value, format }, idx) => (
            <div key={idx} className="text-center px-4">
              <Counter
                direction="up"
                targetValue={value}
                format={format ?? ((val) => `${Math.floor(val)}+`)}
              />
              <p className="mt-2 text-xl text-foreground">{label}</p>
            </div>
          ))}
      </div>
        </SlideInFromBottom>
    </Section>
  );
};

export default StatsCounter;
