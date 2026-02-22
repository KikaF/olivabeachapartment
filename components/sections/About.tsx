import { FaUsers, FaBed, FaShower, FaWind, FaUmbrellaBeach, FaPlane, FaUtensils, FaUmbrella } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function About() {
    const t = useTranslations("About");

    const highlights = [
        { icon: <FaUsers />, label: t("highlights.guests") },
        { icon: <FaBed />, label: t("highlights.bedrooms") },
        { icon: <FaUmbrella />, label: t("highlights.terrace") },
        { icon: <FaShower />, label: t("highlights.bathroom") },
        { icon: <FaWind />, label: t("highlights.pool") },
        { icon: <FaPlane />, label: t("highlights.airport") },
        { icon: <FaUmbrellaBeach />, label: t("highlights.beach") },
        { icon: <FaUtensils />, label: t("highlights.restaurants") },
    ];

    return (
        <section id="about" className="section-padding bg-white">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                    {t("title")}
                </h2>

                <div className="flex flex-col gap-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            {t("text1")}
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {t("text2")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div
                            className="overflow-hidden shadow-2xl h-[400px] bg-cover bg-center"
                            style={{ backgroundImage: 'url("/images/oliva/IMG_0356.jpg")' }}
                        />

                        <div className="grid grid-cols-2 gap-6 p-6 bg-accent/5">
                            {highlights.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 text-darkGray p-4 border border-accent/10">
                                    <span className="text-2xl text-primary">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
