"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, X } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        service: "Smart Home Systems",
        message: ""
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Send email via API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.error('API Error Response:', responseData);
                throw new Error(responseData.details?.message || 'Failed to send email');
            }

            // Show success modal
            setShowSuccess(true);
            
            // Reset form
            setFormData({
                name: "",
                email: "",
                service: "Smart Home Systems",
                message: ""
            });
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send message. Please try again or contact us directly at enquiry@piltismart.com');
        } finally {
            setIsSubmitting(false);
        }


    };


    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-white py-24 border-b border-border">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-[46px] font-semibold leading-tight text-[#262626] mb-6">
                            Let's build a smarter world together.
                        </h1>
                        <p className="text-[17px] text-[#616161] leading-relaxed">
                            Whether you're looking for enterprise IoT scaling or high-fidelity
                            residential automation, our technical team is ready to collaborate.
                            Reach out to start your digital transformation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-24 bg-[#F2F2F2]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Contact Information Cards */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                            >
                                <div className="bg-white p-8 border border-transparent hover:border-[#0078D4] shadow-sm transition-all group">
                                    <div className="w-12 h-12 rounded-full bg-[#0078D4]/5 text-[#0078D4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <h4 className="font-bold text-[#262626] dark:text-foreground mb-1">Email</h4>
                                    <p className="text-[14px] text-[#616161] dark:text-muted-foreground mb-6">Inquiry & Feedback</p>
                                    <a href="mailto:enquiry@piltismart.com" className="text-[#0078D4] font-bold text-base hover:underline transition-all">enquiry@piltismart.com</a>
                                    <p className="text-[12px] text-muted-foreground mt-4">Average response: 24h</p>
                                </div>

                                <div className="bg-white p-8 border border-transparent hover:border-[#0078D4] shadow-sm transition-all group">
                                    <div className="w-12 h-12 rounded-full bg-[#0078D4]/5 text-[#0078D4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <h4 className="font-bold text-[#262626] dark:text-foreground mb-1">Phone</h4>
                                    <p className="text-[14px] text-[#616161] dark:text-muted-foreground mb-6">Mon-Sat, 10AM-5PM</p>
                                    <div className="space-y-2">
                                        <a href="tel:+919894863127" className="block text-[#0078D4] font-bold text-base hover:underline transition-all">+91 98948 63127</a>
                                        <a href="tel:+919865408655" className="block text-[#0078D4] font-bold text-base hover:underline transition-all">+91 98654 08655</a>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-10 border border-border shadow-sm flex flex-col gap-6"
                            >
                                <div className="flex items-center gap-4 text-[#0078D4]">
                                    <MapPin size={24} />
                                    <h4 className="font-bold text-[18px]">Corporate Headquarters</h4>
                                </div>
                                <p className="text-[15px] text-[#616161] leading-relaxed">
                                    PiltiSmart Technology Solutions<br />
                                    143 South Veli Street, South Gate<br />
                                    Madurai - 625001, Tamil Nadu, India.
                                </p>
                            </motion.div>
                        </div>

                        {/* Professional Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white p-12 border border-border shadow-2xl"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[13px] font-semibold uppercase tracking-wider text-[#616161]">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className="w-full px-0 py-3 bg-transparent border-b border-border focus:outline-none focus:border-[#0078D4] transition-all font-medium text-[16px]"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[13px] font-semibold uppercase tracking-wider text-[#616161]">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@business.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="w-full px-0 py-3 bg-transparent border-b border-border focus:outline-none focus:border-[#0078D4] transition-all font-medium text-[16px]"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[13px] font-semibold uppercase tracking-wider text-[#616161]">Service of Interest</label>
                                    <select
                                        value={formData.service}
                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        className="w-full px-0 py-3 bg-transparent border-b border-border focus:outline-none focus:border-[#0078D4] transition-all font-medium text-[16px] appearance-none"
                                    >
                                        <option>Smart Home Systems</option>
                                        <option>Smart Office & Workplace</option>
                                        <option>Agricultural IoT</option>
                                        <option>Industrial IIoT</option>
                                        <option>Digital Media Conversion</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[13px] font-semibold uppercase tracking-wider text-[#616161]">Your Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="How can we assist with your project?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        className="w-full px-0 py-3 bg-transparent border-b border-border focus:outline-none focus:border-[#0078D4] transition-all font-medium text-[16px] resize-none"
                                    />
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-10 py-3 bg-[#0078D4] text-white font-semibold flex items-center gap-3 hover:bg-[#0067B8] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Global Presence Map */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-[32px] font-semibold mb-4 text-[#262626]">Global Presence</h2>
                            <p className="text-[#616161]">Strategically located to serve South Asia and European markets.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group">
                            <h3 className="text-[18px] font-bold mb-6 flex items-center gap-2 group-hover:text-[#0078D4] transition-colors">
                                <span className="w-2 h-2 rounded-full bg-[#0078D4]" /> Madurai, India
                            </h3>
                            <div className="aspect-video rounded-[2px] overflow-hidden border border-border grayscale group-hover:grayscale-0 transition-all duration-700">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.2756666389405!2d78.11800701473246!3d9.91098347728015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c57845949ffd%3A0x79bd2c911bd095bf!2s143%2C%20S%20Veli%20St%2C%20South%20Gate%2C%20Panthadi%2C%20Tamil%20Nadu%20625001!5e0!3m2!1sen!2sin!4v1621471176791!5m2!1sen!2sin"
                                    className="w-full h-full border-none"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div className="group">
                            <h3 className="text-[18px] font-bold mb-6 flex items-center gap-2 group-hover:text-[#0078D4] transition-colors">
                                <span className="w-2 h-2 rounded-full bg-[#0078D4]" /> Dublin, Ireland
                            </h3>
                            <div className="aspect-video rounded-[2px] overflow-hidden border border-border grayscale group-hover:grayscale-0 transition-all duration-700">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.632593787099!2d-6.271750283887086!3d53.34983277997977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c29fcdd95ab%3A0x1de927b305ed43f6!2sSemple%20Court%2C%20Capel%20St%2C%20Rotunda%2C%20Dublin%201%2C%20Ireland!5e0!3m2!1sen!2sin!4v1622466857614!5m2!1sen!2sin"
                                    className="w-full h-full border-none"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSuccess(false)}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white max-w-md w-full p-10 shadow-2xl rounded-[2px] relative text-center"
                        >
                            {/* Success Icon */}
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={48} className="text-green-500" />
                            </div>

                            {/* Content */}
                            <h3 className="text-[24px] font-semibold text-[#262626] mb-4">Message Sent Successfully!</h3>
                            <p className="text-[15px] text-[#616161] leading-relaxed mb-8">
                                Your enquiry has been forwarded to our team at <span className="font-semibold text-[#0078D4]">enquiry@piltismart.com</span>.
                                We typically respond within 24 hours.
                            </p>

                            {/* Close Button */}
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="px-8 py-3 bg-[#0078D4] text-white text-[13px] font-bold uppercase tracking-wider hover:bg-[#0067B8] transition-all rounded-[2px] w-full"
                            >
                                Close
                            </button>

                            {/* X Button */}
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="absolute top-6 right-6 text-[#616161] hover:text-[#262626] transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
