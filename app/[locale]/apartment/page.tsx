import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Equipment from "@/components/sections/Equipment";

export default function ApartmentPage() {
    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className="pt-24 flex-grow">
                <Equipment />
            </div>
            <Footer />
        </main>
    );
}
