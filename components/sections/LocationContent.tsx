"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FaUtensils, FaStore, FaBiking, FaExternalLinkAlt } from "react-icons/fa";

interface LinkItem {
    label: string;
    url: string;
}

interface LocationItem {
    name: string;
    description: string;
    link?: string;
    links?: LinkItem[];
}

interface Category {
    id: string;
    title: string;
    icon: React.ReactNode;
    items: LocationItem[];
}

export default function LocationContent() {
    const t = useTranslations("Location");

    const categories: Category[] = [
        {
            id: "restaurants",
            title: t("restaurants.title"),
            icon: <FaUtensils />,
            items: [
                {
                    name: "Olibaba",
                    description: t("restaurants.olibaba"),
                    link: "http://olibaba.es/",
                },
                {
                    name: "Camping Rio Mar",
                    description: t("restaurants.riomar"),
                    link: "https://restaurante-rio-mar.goto-where.com",
                },
                {
                    name: "Darbar Indian Restaurant",
                    description: t("restaurants.darbar"),
                    link: "https://maps.app.goo.gl/yWucdZbLEFwmEPos5?g_st=iw",
                },
                {
                    name: "Alavora Seafood Restaurant",
                    description: t("restaurants.alavora"),
                    link: "https://maps.app.goo.gl/a7bGQAogx76GF77L6?g_st=iw",
                },
                {
                    name: "Tio Rico el Italiano",
                    description: t("restaurants.tiorico"),
                    link: "https://www.tiorico.eu",
                },
                {
                    name: "El Gaucho Steakhouse",
                    description: t("restaurants.gaucho"),
                    link: "https://www.elgauchojavea.com",
                },
                {
                    name: "El Magazinos Denia",
                    description: t("restaurants.magazinos"),
                    link: "https://elsmagazinos.com",
                },
                {
                    name: "Repulic Denia",
                    description: t("restaurants.republic"),
                    link: "https://republicdenia.com/index.php",
                },
                {
                    name: "Bar BBQ Fuego Denia Marina",
                    description: t("restaurants.fuego"),
                    link: "https://www.fuegomarina.com/"
                },
            ],
        },
        {
            id: "establishments",
            title: t("establishments.title"),
            icon: <FaStore />,
            items: [
                {
                    name: "Mercadona Oliva",
                    description: t("establishments.mercadona"),
                    link: "https://maps.app.goo.gl/QQR1fssuf6AY9xbn8",
                },
                {
                    name: "Portal de la Marina",
                    description: t("establishments.portal"),
                    link: "https://portaldelamarina.org/",
                },
                {
                    name: "San Fernando Supermarket",
                    description: t("establishments.fernando"),
                    link: "https://maps.app.goo.gl/gSr8AmBQpHmX9prg6?g_st=in",
                },
                {
                    name: "Café Isabel",
                    description: t("establishments.isabel"),
                    link: "https://maps.app.goo.gl/Y9rKsd1jTMwSuSK36?g_st=in",
                },
            ],
        },
        {
            id: "sports",
            title: t("sports.title"),
            icon: <FaBiking />,
            items: [
                {
                    name: "Kitesurfing / Wingfoil",
                    description: t("sports.kitesurf"),
                    links: [
                        { label: "All Water Sports", url: "https://allwatersportscenter.com/" },
                        { label: "Kite45", url: "https://kite45.com/" },
                    ],
                },
                {
                    name: "Golf Course",
                    description: t("sports.golf"),
                    link: "https://www.olivanova.com/golf",
                },
                {
                    name: "Padel",
                    description: t("sports.padel"),
                    link: "https://www.olivanova.com/padel",
                },
                {
                    name: "Karting",
                    description: t("sports.karting"),
                    link: "https://www.kartingvives.com/",
                },
            ],
        },
    ];

    return (
        <section className="section-padding bg-white min-h-screen">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary uppercase tracking-widest mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed italic">
                        "{t("description")}"
                    </p>
                </div>

                <div className="space-y-20">
                    {categories.map((category) => (
                        <div key={category.id} className="group">
                            <div className="flex items-center gap-4 mb-8 border-b border-accent/20 pb-4">
                                <span className="text-3xl text-primary">{category.icon}</span>
                                <h2 className="text-2xl font-bold text-darkGray uppercase tracking-wider">
                                    {category.title}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-6 bg-accent/5 border border-accent/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                                    >
                                        <div>
                                            <h3 className="text-xl font-bold text-primary mb-3 flex items-center justify-between">
                                                {item.name}
                                                {item.link && (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary/50 hover:text-primary transition-colors"
                                                    >
                                                        <FaExternalLinkAlt size={16} />
                                                    </a>
                                                )}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed mb-4">
                                                {item.description}
                                            </p>
                                        </div>

                                        {(item.link || (item.links && item.links.length > 0)) && (
                                            <div className="mt-4 pt-4 border-t border-accent/10 flex flex-wrap gap-3">
                                                {item.link && (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest hover:translate-x-1 transition-transform"
                                                    >
                                                        Web <FaExternalLinkAlt size={12} />
                                                    </a>
                                                )}
                                                {item.links?.map((l, i) => (
                                                    <a
                                                        key={i}
                                                        href={l.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
                                                    >
                                                        {l.label} <FaExternalLinkAlt size={10} />
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
