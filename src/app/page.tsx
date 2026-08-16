import HeroFullscreen from "@/components/HeroFullscreen";
import RobotMascot from "@/components/RobotMascot";
import ScrollProgress from "@/components/ScrollProgress";
import SpeedStats from "@/components/SpeedStats";
import VoiceAssistant from "@/components/VoiceAssistant";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Proof from "@/components/Proof";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <RobotMascot />
      <HeroFullscreen />
      <SpeedStats />
      <VoiceAssistant />
      <Services />
      <Process />
      <Proof />
      <CTA />
      <Footer />
    </main>
  );
}