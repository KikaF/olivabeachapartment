"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section id="home" className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/oliva/hero-main.jpg"
                    alt="Oliva Beach Apartment with Sea View"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up tracking-tight drop-shadow-lg">
                    {t("title")}
                </h1>
                <p className="text-xl md:text-2xl mb-10 animate-fade-in-up delay-100 font-light tracking-wide drop-shadow-md">
                    {t("subtitle")}
                </p>
            </div>

            {/* Wave Divider removed as per user request */}
        </section>
    );
}
