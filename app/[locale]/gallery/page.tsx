import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Gallery from "@/components/sections/Gallery";

export default function GalleryPage() {
    return (
        <main className="flex flex-col min-h-screen">
            <Header />
            <div className="pt-24 flex-grow">
                <Gallery />
            </div>
            <Footer />
        </main>
    );
}
