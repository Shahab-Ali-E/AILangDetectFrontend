import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import {
  ContactUsFormSchema,
  type ContactUsFormType,
} from "@/schemas/contact-us";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import LottieSuccess from "./lottie-success";

function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  const contactUsForm = useForm<ContactUsFormType>({
    mode: "onBlur",
    resolver: zodResolver(ContactUsFormSchema),
    defaultValues: {
      description: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  async function onSubmit(submittedData: ContactUsFormType) {
    setLoading(true);
    console.log("data", submittedData);

    try {
      // Dummy promise simulating a successful form submission
      const response = await new Promise<{ success?: boolean; error?: string }>(
        (resolve) => {
          setTimeout(() => {
            resolve({ success: true });
          }, 1000); // Simulates network delay
        }
      );

      if (response?.error) {
        toast.error("Error Submitting Form", {
          description: response.error,
        });
      } else if (response?.success) {
        setIsSubmitted(true); // Set form as submitted
      }
    } catch (error) {
      console.error("Error Submitting Form", error);
      toast.error("Error Submitting Form", {
        description: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...contactUsForm}>
      {isSubmitted ? (
        // Success Animation
        <LottieSuccess />
      ) : (
        // Form
        <form
          onSubmit={contactUsForm.handleSubmit(onSubmit)}
          className="flex flex-col space-y-7 md:space-y-10 w-full justify-between bg-card shadow-md shadow-primay px-10 md:px-16 py-7 md:py-10 rounded-2xl border border-primary/30"
        >
          {/* Form Fields */}
          <div className="flex flex-col space-y-8">
            {/* First Name */}
            <FormField
              control={contactUsForm.control}
              name="firstName"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-secondary-foreground justify-between">
                    First Name
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. John"
                      className={cn(
                        "flex flex-grow border text-secondary-foreground rounded-lg h-11 mt-1",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={contactUsForm.control}
              name="lastName"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-secondary-foreground justify-between">
                    Last Name
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Doe"
                      className={cn(
                        "flex flex-grow border text-secondary-foreground rounded-lg h-11 mt-1",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={contactUsForm.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-secondary-foreground justify-between">
                    Email
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. JohnDoe@gmail.com"
                      className={cn(
                        "w-full border text-secondary-foreground rounded-lg h-11 mt-1",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={contactUsForm.control}
              name="phone"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-secondary-foreground justify-between">
                    Phone
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      defaultCountry="PK"
                      placeholder="e.g. 31232193120"
                      className={cn(
                        "w-full text-secondary-foreground border rounded-sm",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={contactUsForm.control}
              name="description"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className="flex text-secondary-foreground justify-between">
                    Description
                    <FormMessage className="text-destructive">
                      {error?.message}
                    </FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Leave us a message..."
                      className={cn(
                        "border text-secondary-foreground rounded-lg mt-1 h-20",
                        error ? "border-destructive" : "border-muted-foreground"
                      )}
                      disabled={loading} // Disable input when loading
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end w-full">
            <Button
              type="submit"
              className={`w-full rounded-sm py-3 ${
                loading && "opacity-80 hover:bg-primary cursor-not-allowed"
              }`}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <Spinner size="small" className="text-secondary-foreground" />
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </div>
        </form>
      )}
    </Form>
  );
}

export default ContactUsForm;
