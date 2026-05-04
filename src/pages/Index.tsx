import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import MantraSection from "@/components/MantraSection";
import FeaturedStory from "@/components/FeaturedStory";
import LatestStories from "@/components/LatestStories";
import MantraDivider from "@/components/MantraDivider";
import RealGuides from "@/components/RealGuides";
import AboutTeaser from "@/components/AboutTeaser";
import SocialProofStrip from "@/components/SocialProofStrip";
import EmailSignup from "@/components/EmailSignup";
import CommunityTeaser from "@/components/CommunityTeaser";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <MantraSection />
        <FeaturedStory />
        <LatestStories />
        <MantraDivider />
        <RealGuides />
        <AboutTeaser />
        <SocialProofStrip />
        <EmailSignup />
        <CommunityTeaser />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
