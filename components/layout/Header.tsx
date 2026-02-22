"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { useTranslations, useLocale } from "next-intl";

export default function Header() {
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { href: `/${locale}#home`, label: t("home") },
        { href: `/${locale}/apartment`, label: t("about") }, // Renamed to "Apartment" in translations
        { href: `/${locale}/gallery`, label: t("gallery") },
        { href: `/${locale}/location`, label: t("location") },
        { href: `/${locale}#availability`, label: t("availability") },
        { href: `/${locale}#booking`, label: t("booking") },
        { href: `/${locale}/contact`, label: t("contact") }, // Dedicated contact page
    ];

    const languages = [
        { code: "sk", label: "SK" },
        { code: "en", label: "EN" },
        { code: "de", label: "DE" },
    ];

    const handleLanguageChange = (newLocale: string) => {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        router.push(segments.join("/"));
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
            <nav className="container mx-auto px-4 sm:px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href={`/${locale}#home`} className="text-2xl font-bold text-primary">
                        Oliva Beach Apartment
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-darkGray hover:text-primary transition-colors font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                            <FaGlobe className="text-gray-400" />
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`text-sm font-bold px-2 py-1 transition-colors ${locale === lang.code ? "text-primary border-b-2 border-primary" : "text-gray-400 hover:text-darkGray"
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-2xl text-darkGray"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-darkGray hover:text-primary transition-colors font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        handleLanguageChange(lang.code);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`text-sm font-bold px-2 py-1 ${locale === lang.code ? "text-primary border-b-2 border-primary" : "text-gray-400"
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
