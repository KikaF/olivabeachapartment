import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Resort from "@/components/sections/Resort";
import Pricing from "@/components/sections/Pricing";
import Availability from "@/components/sections/Availability";
import BookingForm from "@/components/sections/BookingForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <GalleryPreview />
      <Resort />
      <Pricing />
      <Availability />
      <BookingForm />
      <Footer />
    </main>
  );
}
