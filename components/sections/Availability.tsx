"use client";

import { useTranslations } from "next-intl";
import CustomCalendar from "@/components/ui/CustomCalendar";

export default function Availability() {
    const t = useTranslations("Availability");

    return (
        <section id="availability" className="section-padding bg-accent/10">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                    {t("title")}
                </h2>

                <CustomCalendar occupiedText={t("occupied")} />
            </div>
        </section>
    );
}
