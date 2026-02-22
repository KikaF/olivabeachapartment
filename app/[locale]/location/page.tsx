import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocationContent from "@/components/sections/LocationContent";

export default function LocationPage() {
    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className="pt-24 flex-grow">
                <LocationContent />
            </div>
            <Footer />
        </main>
    );
}
