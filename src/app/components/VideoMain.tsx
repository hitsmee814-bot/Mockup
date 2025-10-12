"use client";

import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import logoPrimary from "../assets/images/logoPrimary.png";
const repoPath = process.env.NODE_ENV === "production" ? "/Mockup" : "";

const navItems = [
    { label: "Plan Your Trip", href: "#plan" },
    { label: "Inspiration & Expertise", href: "#inspiration" },
    { label: "Why Us", href: "#why" },
    { label: "Support", href: "#support" },
];

export default function VideoMain() {
    const [scrollRatio, setScrollRatio] = useState(0);

    useEffect(() => {
        const threshold = 200;
        const handleScroll = () => {
            const ratio = Math.min(window.scrollY / threshold, 1);
            setScrollRatio(ratio);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollToHero = () => {
        const hero = document.getElementById("hero");
        if (hero) hero.scrollIntoView({ behavior: "smooth" });
    };

    const bgColor = `rgba(255,255,255,${scrollRatio})`;
    const textColor = `rgba(${Math.round(255 - scrollRatio * 255)}, ${Math.round(255 - scrollRatio * 255)}, ${Math.round(255 - scrollRatio * 255)},1)`;
    const buttonBg = scrollRatio > 0.5 ? "#00AFEF" : "rgba(255,255,255,0.2)";
    const buttonText = scrollRatio > 0.5 ? "#fff" : "#fff";

    return (
        <section className="relative w-full h-screen overflow-hidden">

            <video
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                src={`${repoPath}/video/DemoVideo.mp4`}
                autoPlay
                loop
                muted
                playsInline
            />

            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                <div className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-4">
                    <motion.a href="/" whileHover={{ scale: 1.05 }} className="flex items-center gap-2" style={{ color: textColor }}>
                        <Image src={logoPrimary} alt="Bonhomiee Logo" width={32} height={32} priority />
                        <span className="text-2xl font-bold tracking-tight" style={{ color: textColor }}>
                            Bonho<span style={{ color: textColor }}>miee</span>
                        </span>
                    </motion.a>

                    <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                                className="relative group"
                                style={{ color: textColor }}
                            >
                                {item.label}
                                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                            </motion.a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Menu as="div" className="relative">
                            <MenuButton
                                className="flex items-center gap-1 px-3 py-1 text-sm font-medium rounded"
                                style={{ color: textColor }}
                            >
                                <span>Login</span>
                                <HiOutlineChevronDown size={16} />
                            </MenuButton>

                            <MenuItems className="absolute right-0 mt-3 w-56 rounded-xl shadow-lg overflow-hidden border bg-white">
                                <MenuItem>
                                    {({ active }) => (
                                        <a href="#" className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}>
                                            Traveller Dashboard
                                        </a>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ active }) => (
                                        <a href="#" className={`block px-4 py-2 text-sm ${active ? "bg-gray-100" : ""}`}>
                                            Agent / Provider
                                        </a>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Menu>

                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-4 py-2 rounded-md font-medium shadow-md transition-colors duration-300"
                            style={{ backgroundColor: buttonBg, color: buttonText }}
                        >
                            Book Demo
                        </motion.a>
                    </div>
                </div>
            </motion.header>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <motion.button
                    onClick={handleScrollToHero}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden px-8 py-3 rounded-full font-semibold text-white border border-white
             bg-transparent"
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-blue-100/20 to-white/20
                   animate-gradientShift"></span>

                    <span className="relative z-10">Plan Your Escape</span>
                </motion.button>


            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white cursor-pointer">
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    onClick={handleScrollToHero}
                >
                    <ChevronDown size={24} strokeWidth={2} />
                </motion.div>
            </div>
        </section>
    );
}
