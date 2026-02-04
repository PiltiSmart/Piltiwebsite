"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="pt-20">
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-5xl font-black mb-8">Get in Touch</h1>
                            <p className="text-lg text-secondary-text mb-12">
                                Have questions about our IoT solutions? Send us a message and our
                                team will get back to you within 24 hours.
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Email Us</h4>
                                        <p className="text-secondary-text">enquiry@pilti.in</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Call Us</h4>
                                        <p className="text-secondary-text">+91 98948 63127 / 98654 08655</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 p-8 bg-background rounded-[32px] border border-border">
                                <h4 className="font-bold mb-4">India Headquarters</h4>
                                <p className="text-sm text-secondary-text leading-relaxed">
                                    PiltiSmart, 143 South Veli Street, Madurai - 625001, Tamil Nadu, India.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-background p-10 rounded-[40px] border border-border shadow-2xl shadow-accent/5"
                        >
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold pl-2">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-border focus:outline-none focus:border-accent transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold pl-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-border focus:outline-none focus:border-accent transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold pl-2">Your Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="How can we help you?"
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-border focus:outline-none focus:border-accent transition-all resize-none"
                                    />
                                </div>
                                <button className="w-full py-5 bg-accent text-white rounded-full font-black flex items-center justify-center gap-3 hover:bg-accent/90 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Locations */}
            <section className="py-32 bg-background">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <MapPin className="text-accent" /> Madurai, India
                            </h3>
                            <div className="rounded-[32px] overflow-hidden border border-border h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.2756666389405!2d78.11800701473246!3d9.91098347728015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c57845949ffd%3A0x79bd2c911bd095bf!2s143%2C%20S%20Veli%20St%2C%20South%20Gate%2C%20Panthadi%2C%20Tamil%20Nadu%20625001!5e0!3m2!1sen!2sin!4v1621471176791!5m2!1sen!2sin"
                                    className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <MapPin className="text-accent" /> Dublin, Ireland
                            </h3>
                            <div className="rounded-[32px] overflow-hidden border border-border h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.632593787099!2d-6.271750283887086!3d53.34983277997977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c29fcdd95ab%3A0x1de927b305ed43f6!2sSemple%20Court%2C%20Capel%20St%2C%20Rotunda%2C%20Dublin%201%2C%20Ireland!5e0!3m2!1sen!2sin!4v1622466857614!5m2!1sen!2sin"
                                    className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-500"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
