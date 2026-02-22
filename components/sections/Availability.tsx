"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export default function Availability() {
    const t = useTranslations("Availability");
    const [iframeHeight, setIframeHeight] = useState(700);

    useEffect(() => {
        const resizeCalendar = () => {
            if (window.innerWidth < 600) {
                setIframeHeight(900);
            } else {
                setIframeHeight(700);
            }
        };

        resizeCalendar();
        window.addEventListener("resize", resizeCalendar);
        return () => window.removeEventListener("resize", resizeCalendar);
    }, []);

    return (
        <section id="availability" className="section-padding bg-white">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                    {t("title")}
                </h2>

                <iframe
                    className="gcal"
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FAmsterdam&showPrint=0&showCalendars=0&showTz=0&showTabs=0&src=aW5mb0BvbGl2YWJlYWNoYXBhcnRtZW50LmNvbQ&color=%23d50000"
                    style={{ width: "100%", height: iframeHeight, border: 0 }}
                    frameBorder={0}
                    scrolling="no"
                />
            </div>
        </section>
    );
}
