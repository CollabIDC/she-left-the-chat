import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedStories from "@/components/FeaturedStories";
import VideoSection from "@/components/VideoSection";
import PhotoGallery from "@/components/PhotoGallery";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedStories />
      <VideoSection />
      <PhotoGallery />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
