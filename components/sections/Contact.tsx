"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Contact() {
    const t = useTranslations("Contact");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="section-padding bg-white">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary uppercase tracking-widest">
                    {t("title")}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-darkGray mb-6">{t("writeUs")}</h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 mb-2 font-medium">{t("name")}</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder={t("name")}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2 font-medium">{t("email")}</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder={t("email")}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2 font-medium">{t("message")}</label>
                                <textarea
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                    placeholder={t("message")}
                                ></textarea>
                            </div>

                            {status === "success" && (
                                <div className="p-3 bg-green-100 text-green-700 rounded-lg">
                                    Message sent successfully!
                                </div>
                            )}
                            {status === "error" && (
                                <div className="p-3 bg-red-100 text-red-700 rounded-lg">
                                    Failed to send message. Please try again.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? "Sending..." : t("send")}
                            </button>
                        </form>
                    </div>

                    {/* Location and Navigation */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-darkGray mb-6">{t("findUs")}</h3>

                        <div className="h-[450px] bg-gray-200 overflow-hidden shadow-lg rounded-xl">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3105.3487750205327!2d-0.0489722!3d38.8931389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzjCsDUzJzM1LjMiTiAwwrAwMic1Ni4zIlc!5e1!3m2!1ssk!2ssk!5m1!1e4"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
