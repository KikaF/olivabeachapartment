"use client";

import { useTranslations } from "next-intl";

export default function Availability() {
    const t = useTranslations("Availability");

    return (
        <section id="availability" className="section-padding bg-white">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                    {t("title")}
                </h2>

                <div className="flex justify-center">
                    <div style={{ position: "relative", width: 800, height: 600 }}>
                        <iframe
                            src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FAmsterdam&showPrint=0&showTabs=0&showTz=0&showCalendars=0&src=aW5mb0BvbGl2YWJlYWNoYXBhcnRtZW50LmNvbQ&color=%23d50000"
                            style={{ border: 0 }}
                            width="800"
                            height="600"
                            frameBorder={0}
                            scrolling="no"
                        />
                        {/* Transparent overlay that blocks event detail clicks
                            but sits below the ~65px navigation header so
                            prev/next month buttons remain clickable */}
                        <div style={{
                            position: "absolute",
                            top: 65,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1,
                            cursor: "default",
                        }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
