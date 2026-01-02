"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "@/public/images/shortlogo.png";
import Link from "next/link";

const navLinks = [
  { title: "Home", href: "#" },
  { title: "Themes", href: "#themes" },
  { title: "Timeline", href: "#timeline" },
  { title: "Sponsors", href: "#sponsors" },
  { title: "FAQ", href: "#faq" },
];

export default function AnimatedNavbar() {
  // --- Step 1: Call ALL hooks unconditionally at the top ---
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // Reflect token changes across tabs
  // Function to track register button clicks
  // const trackClick = async (buttonType: string) => {
  //   try {
  //     await fetch('/api/clickTracking', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         buttonType,
  //         userAgent: navigator.userAgent,
  //         referrer: document.referrer,
  //       }),
  //     });
  //   } catch (error) {
  //     console.error('Failed to track click:', error);
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- Step 2: Place the conditional return *after* all hooks ---
  // This ensures hook order is the same on every render.
  if (pathname === "/register") {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navVariants = {
    top: {
      backgroundColor: "rgba(255, 255, 255, 1)", // Solid white background
      top: 0,
      width: "100%",
      borderRadius: "0px",
      marginTop: "0px",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    },
    scrolled: {
      backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent white
      backdropFilter: "blur(10px)",
      top: 0,
      width: "95%",
      borderRadius: "9999px", // Full capsule
      marginTop: "16px",
      border: "1px solid rgba(229, 231, 235, 0.5)", // Light gray border
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
  };

  return (
    <>
      <motion.nav
        className="fixed left-1/2 -translate-x-1/2 z-50 flex justify-between items-center px-6 py-4"
        variants={navVariants}
        initial="top"
        animate={scrolled ? "scrolled" : "top"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {/* Constraining image size with Tailwind classes for better control */}
          <Image src={logo} alt="Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="font-semibold text-[#C83DAD] hover:text-[#A12A89] transition-colors duration-300"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Right Side: Auth/Account */}
        <div className="hidden md:block">
          {/* {isLoggedIn ? (
            <AccountMenu
              teamName={teamName}
              onGoToDashboard={() => router.push('/dashboard')}
              onLogout={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('team_name');
                setIsLoggedIn(false);
                setTeamName("");
                window.dispatchEvent(new Event('auth-updated'));
                router.push('/');
              }}
            />
          ) : (
            <motion.button
              className="px-6 py-2 text-white font-bold text-base rounded-full transition-all duration-300 bg-[#C83DAD] shadow-lg shadow-[#C83DAD]/20 hover:bg-[#A12A89] hover:shadow-[#A12A89]/20 cursor-pointer"
              onClick={() => router.push('/login')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          )} */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMenu}
            className="text-[#C83DAD] p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden">
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-white text-3xl font-semibold hover:text-[#C83DAD] transition-colors"
                >
                  {link.title}
                </a>
              ))}
              {/* {isLoggedIn ? (
                <div className="mt-8">
                  <AccountMenu
                    teamName={teamName || 'Team'}
                    onGoToDashboard={() => { setIsMenuOpen(false); router.push('/dashboard'); }}
                    onLogout={() => {
                      setIsMenuOpen(false);
                      localStorage.removeItem('token');
                      localStorage.removeItem('team_name');
                      setIsLoggedIn(false);
                      setTeamName("");
                      window.dispatchEvent(new Event('auth-updated'));
                      router.push('/');
                    }}
                  />
                </div>
              ) : (
                <motion.button
                  className="px-8 py-4 text-white font-bold text-xl rounded-full transition-all duration-300 mt-8 bg-[#C83DAD] shadow-lg shadow-[#C83DAD]/20 hover:bg-[#A12A89] hover:shadow-[#A12A89]/20 cursor-pointer"
                  onClick={() => { setIsMenuOpen(false); router.push('/login'); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              )} */}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      {/* {showLogoutConfirm && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg md:hidden">
          <ConfirmLogout
            open={showLogoutConfirm}
            onCancel={() => setShowLogoutConfirm(false)}
            onConfirm={() => {
              localStorage.removeItem('token');
              setShowLogoutConfirm(false);
              window.dispatchEvent(new Event('auth-updated'));
              router.push('/');
            }}
          />
        </div>
      )} */}
    </>
  );
}
