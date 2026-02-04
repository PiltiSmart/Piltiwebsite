"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home as HomeIcon,
  Briefcase,
  Cpu,
  Sprout,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Search,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Smart Home",
    desc: "Bring the latest technologies in smart lighting, security, and temperature control to your home.",
    icon: HomeIcon,
    img: "/img/premium_smart_home.png",
    link: "/services",
    category: "Consumer"
  },
  {
    title: "Smart Office",
    desc: "Energy-savings and efficient utilization of resources for modern business environments.",
    icon: Briefcase,
    img: "/img/premium_smart_office.png",
    link: "/services",
    category: "Business"
  },
  {
    title: "Smart Farming",
    desc: "Optimize land, water, and fertilizers utilization with precision IoT sensing and data.",
    icon: Sprout,
    img: "/img/premium_smart_farming.png",
    link: "/services",
    category: "Agriculture"
  },
  {
    title: "Smart Schools",
    desc: "Empower students and educators with smart interactions and virtual classroom tools.",
    icon: GraduationCap,
    img: "/img/premium_smart_school.png",
    link: "/services",
    category: "Education"
  },
  {
    title: "Smart Industries",
    desc: "Edge-to-cloud industrial automation for quality control and operational excellence.",
    icon: Cpu,
    img: "/img/premium_smart_industry.png",
    link: "/services",
    category: "Industrial"
  },
  {
    title: "Smart Publishing",
    desc: "Advanced digital conversion services to publish your dream ebook with ease.",
    icon: BookOpen,
    img: "/img/premium_smart_publishing.png",
    link: "/services",
    category: "Digital"
  }
];

function HeroSlideshow({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

export default function Home() {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-12">
      {/* Hero Section - Microsoft Style */}
      <section className="relative min-h-[540px] flex items-center bg-[#F2F2F2] dark:bg-muted/5 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h1 className="text-[36px] md:text-[46px] font-semibold leading-[1.1] text-[#262626] dark:text-foreground mb-6">
              Empowering a Smarter World.
            </h1>
            <p className="text-[15px] text-[#262626] dark:text-muted-foreground mb-10 leading-relaxed">
              PiltiSmart delivering comprehensive end-to-end IoT ecosystems, intuitive management
              interfaces, and sophisticated data visualization platforms designed to optimize device
              connectivity and operational reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="px-8 py-2 bg-[#0078D4] text-white font-semibold rounded-[2px] hover:bg-[#0067B8] transition-all flex items-center gap-2 group"
              >
                Shop now
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-2 bg-transparent text-[#0078D4] font-semibold hover:underline flex items-center gap-1"
              >
                Learn more
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block h-[400px] bg-white rounded-[2px] shadow-sm overflow-hidden relative border border-border"
          >
            <HeroSlideshow images={services.map(s => s.img)} />

            <div className="absolute bottom-10 left-10 p-6 bg-white/95 backdrop-blur shadow-2xl border border-border/50 z-20 max-w-[240px]">
              <motion.div
                key={activeImgIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-bold mb-1 text-[#262626]">{services[activeImgIndex].title}</h4>
                <p className="text-[11px] text-[#616161] mb-3 line-clamp-2">{services[activeImgIndex].desc}</p>
                <Link href="/services" className="text-[12px] text-[#0078D4] font-semibold hover:underline flex items-center gap-1">
                  Explore solution <ArrowRight size={12} />
                </Link>
              </motion.div>
            </div>

            {/* Micro-indicators */}
            <div className="absolute bottom-6 left-10 flex gap-1.5 z-20">
              {services.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-1 transition-all duration-300 rounded-full",
                    idx === activeImgIndex ? "w-6 bg-[#0078D4]" : "w-2 bg-gray-300"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Grid - Microsoft Style */}
      <section className="py-24 bg-white dark:bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col h-full bg-white dark:bg-muted/5 border border-transparent hover:shadow-xl transition-all"
              >
                <div className="aspect-video bg-[#F2F2F2] dark:bg-muted/10 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={`/img/service${i + 1}.jpg`}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/img/smartfullhome.jpg';
                    }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[12px] text-muted-foreground mb-2">{service.category}</span>
                  <h3 className="text-[20px] font-semibold mb-4 text-[#262626] dark:text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-[#616161] dark:text-muted-foreground mb-8 line-clamp-3">
                    {service.desc}
                  </p>
                  <div className="mt-auto">
                    <Link
                      href={service.link}
                      className="text-[#0078D4] font-semibold hover:underline flex items-center gap-1 group/link"
                    >
                      Learn more
                      <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Products Section - Restored with Video */}
      <section className="py-24 bg-[#F2F2F2] dark:bg-muted/5 border-t border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Mobile Video mock */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative shrink-0"
            >
              <div className="w-[200px] h-[434px] bg-black rounded-[30px] border-[8px] border-[#262626] overflow-hidden shadow-2xl relative">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/img/smarty_dribbble.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Subtle shadow glow */}
              <div className="absolute inset-0 bg-accent/5 blur-3xl -z-10 rounded-[30px]" />
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-grow max-w-2xl"
            >
              <h2 className="text-[30px] font-semibold text-[#262626] dark:text-foreground mb-8">Our Smart Products</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-[#0078D4]/10 p-2 rounded-full h-fit">
                    <Cpu size={20} className="text-[#0078D4]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#262626] dark:text-foreground mb-1">SmartySwitch&trade;</h4>
                    <p className="text-[14px] text-[#616161] dark:text-muted-foreground">
                      A Smart WiFi current sensing switch with Anomaly detection. Monitor and control your energy usage with precision.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-[#0078D4]/10 p-2 rounded-full h-fit">
                    <Search size={20} className="text-[#0078D4]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#262626] dark:text-foreground mb-1">SmartyTalkCamera&trade;</h4>
                    <p className="text-[14px] text-[#616161] dark:text-muted-foreground">
                      A Smart AI Camera with voice assistant for better surveillance. Advanced recognition and two-way communication.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 bg-[#0078D4]/10 p-2 rounded-full h-fit">
                    <HomeIcon size={20} className="text-[#0078D4]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#262626] dark:text-foreground mb-1">SmartyCompTV&trade;</h4>
                    <p className="text-[14px] text-[#616161] dark:text-muted-foreground">
                      A Smart TV with computer optimized for video calling. The perfect all-in-one entertainment and productivity hub.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Link
                  href="/services"
                  className="px-8 py-3 bg-[#0078D4] text-white font-semibold rounded-[2px] hover:bg-[#0067B8] transition-all inline-block shadow-sm"
                >
                  Explore all products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Secondary Banner - Wide Style */}
      <section className="bg-white dark:bg-background pb-24">
        <div className="container mx-auto px-6">
          <div className="relative h-[480px] bg-[#262626] text-white flex items-center px-12 overflow-hidden shadow-2xl">
            <div className="max-w-lg relative z-10">
              <h2 className="text-[30px] font-semibold mb-6">Built for Excellence</h2>
              <p className="text-[15px] opacity-80 mb-10 leading-relaxed">
                Our Customers First! We build products we believe in and care about what we do.
                Each person has the opportunity and the obligation to make a difference.
              </p>
              <Link
                href="/about"
                className="px-10 py-3 bg-[#0078D4] hover:bg-[#0067B8] transition-colors rounded-[2px] font-semibold inline-block"
              >
                About our values
              </Link>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#0078D4]/20 to-transparent" />
            <div className="absolute right-[-10%] top-[-10%] opacity-10">
              <Cpu size={600} />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Grid for More Items */}
      <section className="py-24 bg-[#F2F2F2] dark:bg-muted/5">
        <div className="container mx-auto px-6">
          <h2 className="text-[24px] font-semibold mb-12 text-[#262626] dark:text-foreground">Advanced Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(4).map((service, i) => (
              <Link key={service.title} href={service.link} className="flex gap-6 items-start group">
                <div className="p-3 bg-white dark:bg-muted/10 shadow-sm border border-border group-hover:border-[#0078D4] transition-all">
                  <service.icon size={24} className="text-[#0078D4]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#262626] dark:text-foreground mb-1 group-hover:underline">{service.title}</h4>
                  <p className="text-[13px] text-muted-foreground line-clamp-2">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
