import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import LatestStories from "@/components/LatestStories";
import StumbledUponMadrid from "@/components/StumbledUponMadrid";
import RealGuides from "@/components/RealGuides";

import CommunityTeaser from "@/components/CommunityTeaser";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <LatestStories />
        <StumbledUponMadrid />
        <RealGuides />
        
        <CommunityTeaser />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
