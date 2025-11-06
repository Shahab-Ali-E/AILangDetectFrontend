// DefaultLayout.tsx
import FooterSection from "@/components/sections/footer/default";
import Navbar from "@/components/sections/navbar/default";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-screen bg-background">
      <Navbar />
      <div className="container mx-auto flex-grow">
        {children}
      </div>
      <FooterSection />
    </main>
  );
}
