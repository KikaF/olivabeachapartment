"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useTranslations } from "next-intl";

const equipmentData = [
    {
        id: "livingroom",
        image: "/images/oliva/IMG_5134.jpg"
    },
    {
        id: "bedroom1",
        image: "/images/oliva/IMG_0347.jpg"
    },
    {
        id: "bedroom2",
        image: "/images/oliva/IMG_0391.jpg"
    },
    {
        id: "kitchen",
        image: "/images/oliva/kitchen.jpg"
    },
    {
        id: "bathroom",
        image: "/images/oliva/84ED265C-871C-4DC6-A408-E307363CF6EB.PNG"
    }
];

export default function Equipment() {
    const t = useTranslations("Equipment");
    const [activeTab, setActiveTab] = useState(equipmentData[0].id);

    const activeData = equipmentData.find(tab => tab.id === activeTab) || equipmentData[0];
    const items = t(`${activeData.id}.items`).split(", ");

    return (
        <section id="equipment" className="section-padding bg-white">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-12 text-secondary uppercase tracking-widest">
                    {t("title")}
                </h2>

                {/* Tabs Row */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {equipmentData.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 text-sm tracking-widest uppercase text-darkGray ${activeTab === tab.id
                                ? "bg-secondary shadow-xl scale-105"
                                : "bg-white hover:bg-gray-50 shadow-sm border border-gray-100"
                                }`}
                        >
                            {t(`${tab.id}.label`)}
                        </button>
                    ))}
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Text Content */}
                        <div className="p-12 lg:p-16">
                            <h3 className="text-3xl font-bold mb-10 text-darkGray">
                                {t(`${activeData.id}.label`)}
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-center gap-4 text-darkGray font-medium">
                                        <span className="text-secondary text-lg flex-shrink-0">
                                            <FaCheck />
                                        </span>
                                        <span className="leading-tight">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image Content */}
                        <div className="relative h-80 lg:h-auto overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110"
                                style={{ backgroundImage: `url("${activeData.image}")` }}
                            />
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
