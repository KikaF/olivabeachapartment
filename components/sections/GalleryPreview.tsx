"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const previewPhotos = [
    "/images/oliva/hero-main.jpg",
    "/images/oliva/IMG_0356.jpg",
    "/images/oliva/kitchen.jpg",
    "/images/oliva/IMG_0370.jpg",
    "/images/oliva/IMG_0374.jpg",
    "/images/oliva/IMG_5075.jpg",
];

export default function GalleryPreview() {
    const t = useTranslations("Gallery");
    const locale = useLocale();

    return (
        <section className="section-padding bg-white">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {previewPhotos.map((src, i) => (
                        <div
                            key={i}
                            className="group relative h-64 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                        >
                            <Image
                                src={src}
                                alt={`Apartment preview ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href={`/${locale}/gallery`}
                        className="inline-block bg-primary text-white px-8 py-3 rounded-none uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors"
                    >
                        {t("viewAll")}
                    </Link>
                </div>
            </div>
        </section>
    );
}
