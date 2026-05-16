import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import SocialProof from "@/components/sections/SocialProof";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SocialProof />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
