import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import LatestStories from "@/components/LatestStories";
import StumbledUponMadrid from "@/components/StumbledUponMadrid";
import RealGuides from "@/components/RealGuides";
import Seo from "@/components/Seo";

import CommunityTeaser from "@/components/CommunityTeaser";
import Footer from "@/components/Footer";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "she left the chat",
    url: "https://shelefthechat.com",
    description:
      "Stories of wanderlust, bold choices, and building a life on your own terms — from Atlanta to Madrid.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kimberly",
    url: "https://shelefthechat.com/about",
    jobTitle: "Writer",
    description:
      "Program manager and writer who left Atlanta for Madrid and writes about the life she's building there.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="she left the chat — Madrid life, travel, and choosing yourself"
        description="Stories of wanderlust, bold choices, and building a life on your own terms — from Atlanta to Madrid."
        path="/"
        jsonLd={homeJsonLd}
      />
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
