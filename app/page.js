import CallToAction from "@/components/CallToAction";
import FeaturedVenues from "@/components/FeaturedVenues";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedVenues />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </main>
  );
}
