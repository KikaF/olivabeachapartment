"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function Availability() {
    const t = useTranslations("Availability");
    const locale = useLocale();
    const [iframeHeight, setIframeHeight] = useState(700);

    useEffect(() => {
        const resizeCalendar = () => {
            if (window.innerWidth < 640) {
                setIframeHeight(500); // Mobile height
            } else if (window.innerWidth < 1024) {
                setIframeHeight(600); // Tablet height
            } else {
                setIframeHeight(700); // Desktop height
            }
        };

        resizeCalendar();
        window.addEventListener("resize", resizeCalendar);
        return () => window.removeEventListener("resize", resizeCalendar);
    }, []);

    // Construct the embedded calendar URL, hiding external visual borders 
    // and specifying the active language automatically (hl).
    const calendarSrc = `https://calendar.google.com/calendar/embed?height=${iframeHeight}&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FAmsterdam&showTitle=0&showPrint=0&showCalendars=0&showTz=0&showTabs=0&hl=${locale}&src=aW5mb0BvbGl2YWJlYWNoYXBhcnRtZW50LmNvbQ&color=%230284c7`;

    return (
        <section id="availability" className="section-padding bg-accent/10">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                    {t("title")}
                </h2>

                <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-2xl overflow-hidden relative">
                    {/* 
                      By wrapping the iframe in a smaller div (calc(100% - 50px)) and setting overflow-hidden, 
                      we crop out the default Google Calendar bottom footer containing the "Add to Google Calendar" button.
                    */}
                    <div className="relative overflow-hidden rounded-xl border border-gray-100" style={{ height: iframeHeight }}>
                        <iframe
                            className="bg-white transition-opacity duration-300 w-full"
                            src={calendarSrc}
                            style={{
                                height: iframeHeight + 60, // Extend height by 60px behind the clipping container
                                border: 0,
                                marginTop: "-5px", // Slight top margin fix for visual alignment inside embed
                            }}
                            frameBorder={0}
                            scrolling="no"
                            title="Availability Calendar"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
