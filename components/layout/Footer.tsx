import { FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-darkGray text-white py-8">
            <div className="container mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <div className="flex flex-col gap-2">
                            <a
                                href="mailto:info@olivabeachapartment.com"
                                className="flex items-center gap-2 hover:text-primary transition-colors"
                            >
                                <FaEnvelope /> info@olivabeachapartment.com
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="flex items-end md:items-center md:justify-end">
                        <p className="text-sm">
                            © {new Date().getFullYear()} Olivabeachapartment. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
