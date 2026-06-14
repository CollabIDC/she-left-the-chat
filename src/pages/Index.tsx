import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import LatestStories from "@/components/LatestStories";
import StumbledUponMadrid from "@/components/StumbledUponMadrid";
import RealGuides from "@/components/RealGuides";
import Seo from "@/components/Seo";


import Footer from "@/components/Footer";

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "she left the chat",
    url: "https://www.shelefthechat.com",
    description:
      "Stories of wanderlust, bold choices, and building a life on your own terms: from Atlanta to Madrid.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kimberly",
    url: "https://www.shelefthechat.com/about",
    jobTitle: "Writer",
    description:
      "Program manager and writer who left Atlanta for Madrid and writes about the life she's building there.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="She Left the Chat | Choosing Yourself in Madrid"
        description="Stories of bold choices and building a life on your own terms in Madrid. Proof that it is never too late to choose yourself."
        path="/"
        jsonLd={homeJsonLd}
      />
      <Navbar />
      <main id="main-content">
        <HeroCarousel />
        <LatestStories />
        <StumbledUponMadrid />
        <RealGuides />
        
        
      </main>
      <Footer />
    </div>
  );
};

export default Index;
