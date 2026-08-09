import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VoiceAssistant from "@/components/VoiceAssistant";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Proof from "@/components/Proof";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <VoiceAssistant />
      <Services />
      <Process />
      <Proof />
      <CTA />
      <Footer />
    </main>
  );
}