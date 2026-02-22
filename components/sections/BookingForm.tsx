"use client";

import { useState } from "react";

export default function BookingForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        guests: "1",
        checkIn: "",
        checkOut: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Booking request sent! We will contact you.");
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="booking" className="section-padding bg-accent/20">
            <div className="container mx-auto max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary uppercase tracking-wider">
                    Booking
                </h2>

                <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Number of Guests</label>
                                <select
                                    name="guests"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={formData.guests}
                                    onChange={handleChange}
                                >
                                    <option value="1">1 person</option>
                                    <option value="2">2 people</option>
                                    <option value="3">3 people</option>
                                    <option value="4">4 people</option>
                                    <option value="5">5 people</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Check-in</label>
                                <input
                                    type="date"
                                    name="checkIn"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={formData.checkIn}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Check-out</label>
                                <input
                                    type="date"
                                    name="checkOut"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    value={formData.checkOut}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message (optional)</label>
                            <textarea
                                name="message"
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-cyan-600 hover:scale-[1.02] transition-all duration-300 uppercase tracking-widest text-lg"
                        >
                            Send Booking Request
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
