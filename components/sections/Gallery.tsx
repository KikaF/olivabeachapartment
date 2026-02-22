"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useTranslations } from "next-intl";

const photos = [
    "/images/oliva/IMG_5083.jpg",
    "/images/oliva/IMG_0370.jpg",
    "/images/oliva/IMG_5134.jpg",
    "/images/oliva/IMG_5089.jpg",
    "/images/oliva/IMG_0356.jpg",
    "/images/oliva/IMG_0361.jpg",
    "/images/oliva/kitchen.jpg",
    "/images/oliva/IMG_0347.jpg",
    "/images/oliva/IMG_5075.jpg",
    "/images/oliva/IMG_5076.jpg",
    "/images/oliva/IMG_0391.jpg",
    "/images/oliva/IMG_0374.jpg",
    "/images/oliva/84ED265C-871C-4DC6-A408-E307363CF6EB.PNG",
    "/images/oliva/IMG_6036.jpg",
    "/images/oliva/resort_pool_view_1.png",
    "/images/oliva/IMG_6038.jpg",
    "/images/oliva/IMG_8953.jpg",
    "/images/oliva/251f9a5b-677a-4121-a0fc-d45ea8cbc39c.jpg",
    "/images/oliva/fd7a19a1-7d7a-4bda-9bb6-2886b2e671d0.jpg",
    "/images/oliva/IMG_3625.jpg",
    "/images/oliva/IMG_4656.jpg",
    "/images/oliva/IMG_1341.jpg",
    "/images/oliva/IMG_4648.jpg",
    "/images/oliva/IMG_2515.jpg",
    "/images/oliva/IMG_1138.jpg",
    "/images/oliva/349bba44-fd08-43dd-873e-20fa42904c59.jpg",
    "/images/oliva/IMG_5151.jpg",
    "/images/oliva/IMG_5155.jpg",
];

export default function Gallery() {
    const t = useTranslations("Gallery");
    const [index, setIndex] = useState(-1);

    return (
        <section id="gallery" className="section-padding bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                    {t("title")}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((src, i) => (
                        <div
                            key={i}
                            className="group relative h-64 overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                            onClick={() => setIndex(i)}
                        >
                            <Image
                                src={src}
                                alt={`Apartment photo ${i + 1}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg uppercase tracking-widest">
                                    {t("view")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <Lightbox
                    index={index}
                    open={index >= 0}
                    close={() => setIndex(-1)}
                    slides={photos.map(src => ({ src }))}
                />
            </div>
        </section>
    );
}
