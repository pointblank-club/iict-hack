"use client";

import React, { useState } from "react";
import Image from "next/image";
import defaults from "@/public/images/default.svg";
import variant from "@/public/images/variant.svg";
// Animation variants removed for better performance on slow systems

export function Hero() {
  // State to manage the hover effect for the logo
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    // Set background to black and default text to white
    <div className="flex items-center justify-center -mt-16 min-h-screen text-white px-4 sm:px-6 lg:px-8">
      <div className="container h-full relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center items-center">
            {/* Logo container with state-based hover events */}
            <div
              className="relative w-[60rem] -mb-10"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              {/* Default Logo Image */}
              <Image
                src={defaults}
                alt="SegFault"
                className="w-full h-auto transition-opacity duration-500 ease-in-out"
                style={{ opacity: isLogoHovered ? 0 : 1 }}
              />
              {/* Variant Logo Image (positioned absolutely on top) */}
              <Image
                src={variant}
                alt="SegFault Variant"
                className="w-full h-auto absolute top-0 left-0 transition-opacity duration-500 ease-in-out"
                style={{ opacity: isLogoHovered ? 1 : 0 }}
              />
            </div>
          </div>

          {/* Slogan with updated accent color */}
          <div className="mt-10 sm:mt-8 md:mt-10">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#C83DAD] mb-6 sm:mb-8 md:mb-10 font-corsiva italic px-4 leading-tight">
              Where Impossible is Just an Error Code.
            </h1>
            {/* IICT note (placed above the register button) */}
            <p className="mx-auto max-w-3xl text-white/90 text-sm sm:text-base md:text-lg leading-relaxed px-4">
              The <span className="font-semibold">SegFault Hackathon</span> is
              co-located and organized as a part of the
              <span className="font-semibold">
                {" "}
                Innovations In Compiler Technology (IICT)
              </span>{" "}
              Workshop. Check out the{" "}
              <a
                href="https://compilertech.org/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#F481C9] underline underline-offset-4 hover:text-[#DE5FB9]"
              >
                IICT Website here
              </a>
              .
            </p>
          </div>

          {/* Register/Login/Dashboard Button */}
          <div className="mt-6 sm:mt-8 md:mt-10 px-4">
            <button
              className="px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg rounded-full transition-all duration-300 bg-white/10 backdrop-blur-md shadow-lg shadow-gray-400/20 cursor-not-allowed w-full sm:w-auto max-w-xs sm:max-w-none mx-auto opacity-60 border border-white/20"
              disabled
            >
              Registrations are now closed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
