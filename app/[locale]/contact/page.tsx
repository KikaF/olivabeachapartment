import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Contact from "@/components/sections/Contact";

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className="pt-24 flex-grow">
                <Contact />
            </div>
            <Footer />
        </main>
    );
}
