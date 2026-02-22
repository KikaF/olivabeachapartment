import { useTranslations } from "next-intl";

export default function Pricing() {
    const t = useTranslations("Pricing");

    const pricingData = [
        { period: t("lowSeason"), price: `100 € ${t("perDay")}` },
        { period: t("middleSeason"), price: `125 € ${t("perDay")}` },
        { period: t("highSeason"), price: `145 € ${t("perDay")}` },
        { period: t("longTerm"), price: `1000 € ${t("perMonth")}` },
    ];

    return (
        <section id="pricing" className="section-padding bg-accent/10">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                    {t("title")}
                </h2>

                <div className="overflow-x-auto shadow-2xl max-w-4xl mx-auto">
                    <table className="w-full text-left bg-white border-collapse">
                        <tbody className="divide-y divide-gray-100">
                            {pricingData.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-6 font-semibold text-darkGray text-lg">{row.period}</td>
                                    <td className="p-6 text-primary font-bold text-xl text-right">{row.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-center text-gray-500 italic">
                    {t("note")}
                </div>
            </div>
        </section>
    );
}
