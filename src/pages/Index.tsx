import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MissionBanner from "@/components/MissionBanner";
import LatestStories from "@/components/LatestStories";
import AboutTeaser from "@/components/AboutTeaser";
import VideoSection from "@/components/VideoSection";
import EmailSignup from "@/components/EmailSignup";
import CommunityTeaser from "@/components/CommunityTeaser";
import GalleryPreview from "@/components/GalleryPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <MissionBanner />
        <LatestStories />
        <AboutTeaser />
        <VideoSection />
        <EmailSignup />
        <CommunityTeaser />
        <GalleryPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
