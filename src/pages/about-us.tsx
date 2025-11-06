import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SlideInFromBottom from "@/components/slidein-from-bottom";
import Eyebrow from "@/components/eyebrow";

function AboutUs() {
  const milestones = [
    {
      year: "2025 Q2",
      title: "Requirements Elicitation",
      description:
        "Conducted extensive user research and finalized core features for the platform.",
    },
    {
      year: "2025 Q4",
      title: "Model & Frontend Development",
      description:
        "Developed language detection model and built a responsive frontend interface.",
    },
    {
      year: "2026",
      title: "API Integration, Testing & Launch",
      description:
        "Integrated backend APIs, conducted rigorous testing, and launched the platform publicly.",
    },
  ];

  const values = [
    {
      icon: "🌍",
      title: "Inclusivity",
      description: "Every voice matters, regardless of the language spoken",
    },
    {
      icon: "🔬",
      title: "Innovation",
      description: "Pushing the boundaries of AI technology for social good",
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description:
        "Working with communities to understand their linguistic needs",
    },
    {
      icon: "🔒",
      title: "Privacy",
      description: "Your data security is our top priority",
    },
  ];

  return (
    <>
      {/* Our Story Section */}
      <Section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <Eyebrow
            title="Bridging Pakistan's"
            highlight="Linguistic Divide"
            className="mb-20"
          />
          <SlideInFromBottom delay={0.3}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Born from the recognition that Pakistan's linguistic diversity
                  is both a strength and a challenge, AILangDetect emerged as a
                  solution to bridge communication gaps that have existed for
                  decades.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our journey began when our founder, a native of Multan,
                  witnessed firsthand how language barriers prevented access to
                  essential services in rural areas. What started as a
                  university project has grown into a platform serving millions
                  across Pakistan.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we're proud to support 7 major Pakistani languages,
                  with plans to expand to regional dialects and minority
                  languages that are at risk of being forgotten.
                </p>
              </div>

              <Card className="p-8 border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    Why We Do This
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Enable access to digital services for non-Urdu speakers
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Preserve and promote linguistic diversity
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Bridge communication gaps in healthcare and education
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">
                      Empower local businesses to serve diverse communities
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SlideInFromBottom>
        </div>
      </Section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Our Values Section */}
      <Section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Eyebrow
            title=" What Drives Us"
            highlight="Forward"
            description="These principles guide everything we do, from technology
              development to community engagement."
            className="mb-20"
          />
          <SlideInFromBottom delay={0.3}>
            <div className="grid sm:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-8 hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30"
                >
                  <CardContent className="p-0 text-center">
                    <div className="text-4xl mb-6">{value.icon}</div>
                    <h3 className="text-2xl font-semibold mb-4 text-primary">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SlideInFromBottom>
        </div>
      </Section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Our Journey Section */}
      <Section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <Eyebrow
            title="From Vision"
            highlight="to Reality"
            description=" Our roadmap to making language detection accessible to every
              Pakistani."
            className="mb-20"
          />
          <SlideInFromBottom delay={0.3}>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-semibold mb-3 text-primary">
                      {milestone.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SlideInFromBottom>
        </div>
      </Section>
    </>
  );
}

export default AboutUs;
