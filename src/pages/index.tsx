import {
  FeaturedProduct,
  HeroSection,
  OfferSection,
} from "@/components/leadpage";
import PublicLayout from "@/layouts";

const Home = () => {
  return (
    <PublicLayout>
      <section className="relative w-full h-full">
        <HeroSection />
        <OfferSection />
        <FeaturedProduct />
      </section>
    </PublicLayout>
  );
};

export default Home;
