import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ProgramModules from "@/components/ProgramModules";
import ProcessTimeline from "@/components/ProcessTimeline";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-deep-void w-full overflow-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <ProgramModules />
      <ProcessTimeline />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
