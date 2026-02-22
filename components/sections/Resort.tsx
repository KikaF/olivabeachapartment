"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaSwimmingPool, FaUmbrellaBeach } from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";

export default function Resort() {
    const t = useTranslations("Resort");

    const amenities = [
        { icon: <FaSwimmingPool />, label: t("pools") },
        { icon: <GiPalmTree />, label: t("gardens") },
        { icon: <FaUmbrellaBeach />, label: t("parking") },
    ];

    return (
        <section className="section-padding bg-accent/10">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold mb-4 text-primary uppercase tracking-wider">
                            {t("title")}
                        </h2>
                        <h3 className="text-xl text-darkGray mb-6 font-light">
                            {t("subtitle")}
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {t("text")}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {amenities.map((item, index) => (
                                <div key={index} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                    <span className="text-3xl text-primary mb-2">
                                        {item.icon}
                                    </span>
                                    <span className="font-semibold text-darkGray text-center">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative h-[400px] w-full overflow-hidden shadow-2xl">
                            <Image
                                src="/images/oliva/resort_pool_view_2.jpg"
                                alt="Resort swimming pool and gardens"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
