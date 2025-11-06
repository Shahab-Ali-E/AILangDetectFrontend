import ContactUsForm from "@/components/contact-us/contact-us-form";
import Eyebrow from "@/components/eyebrow";
import SlideInFromBottom from "@/components/slidein-from-bottom";
import { Section } from "@/components/ui/section";
// import RightSideContact from "@/components/contact-us/RightSideContact";

function ContactUsPage() {
  return (
    <Section className="flex flex-col space-y-10 px-7 md:px-0">
      {/* contact our team description */}
      <Eyebrow
        title="Contact"
        highlight="Our Team"
        description="Got any questions about the product or scaling on our platform? Were
          here to help. Chat to our friendly team 24/7 and get onboard in less then 5
            minutes."
      />

      <section className="flex flex-col md:flex-row w-full md:w-4/5 self-center justify-center space-x-0 md:space-x-10 space-y-6 md:space-y-0">
        {/* contact form */}
        <div className=" w-full md:w-2/3">
          <SlideInFromBottom delay={0.3} >
            <ContactUsForm />
          </SlideInFromBottom>
        </div>

        {/* Right Side Info Section */}
        <div>{/* <RightSideContact /> */}</div>
      </section>
    </Section>
  );
}

export default ContactUsPage;
