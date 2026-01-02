"use client";
import { motion } from "framer-motion";
import React from "react";

interface SectionDecorationsProps {
  variant?: "hero" | "themes" | "timeline" | "faq" | "prizes" | "submissions";
  className?: string;
}

export const SectionDecorations = ({ variant = "hero", className = "" }: SectionDecorationsProps) => {
  const getDecorations = () => {
    switch (variant) {
      case "hero":
        return (
          <>
            {/* Floating particles for hero section */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`hero-particle-${i}`}
                className="absolute w-1 h-1 bg-[#C540AB] rounded-full opacity-40"
                style={{
                  left: `${10 + i * 10}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-15, 15, -15],
                  x: [-5, 5, -5],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}
            
            {/* Geometric accent - top left */}
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 opacity-10"
              animate={{
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-full h-full border border-[#F570DB] rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-10 h-10 border border-[#C540AB] transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
            </motion.div>

            {/* Gradient orb - bottom right */}
            <motion.div
              className="absolute bottom-20 right-20 w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(197, 64, 171, 0.08) 0%, transparent 70%)"
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        );

      case "themes":
        return (
          <>
            {/* Large circle with dark gradient - top left */}
            <motion.div
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(88, 28, 135, 0.2) 50%, rgba(0, 0, 0, 0.8) 100%)"
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Medium rectangle with gradient - center right */}
            <motion.div
              className="absolute top-1/3 -right-16 w-64 h-40 rounded-lg"
              style={{
                background: "linear-gradient(135deg, rgba(197, 64, 171, 0.25) 0%, rgba(88, 28, 135, 0.3) 50%, rgba(0, 0, 0, 0.9) 100%)"
              }}
              animate={{
                rotate: [0, 5, -5, 0],
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Small circles scattered */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`themes-circle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${60 + i * 20}px`,
                  left: `${20 + i * 15}%`,
                  top: `${60 + (i % 2) * 20}%`,
                  background: `radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.15) 50%, rgba(0, 0, 0, 0.7) 100%)`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}

            {/* Square with dark gradient - bottom left */}
            <motion.div
              className="absolute bottom-20 left-10 w-32 h-32 rounded-lg"
              style={{
                background: "linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, rgba(124, 58, 237, 0.15) 50%, rgba(0, 0, 0, 0.8) 100%)"
              }}
              animate={{
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </>
        );

      case "timeline":
        return (
          <>
            {/* Large semi-circle with dark gradient - top right */}
            <motion.div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(29, 78, 216, 0.2) 40%, rgba(0, 0, 0, 0.9) 100%)",
                clipPath: "polygon(50% 50%, 100% 0%, 100% 100%)"
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Rectangle with gradient - center left */}
            <motion.div
              className="absolute top-1/2 -left-20 w-48 h-72 rounded-2xl"
              style={{
                background: "linear-gradient(180deg, rgba(168, 85, 247, 0.2) 0%, rgba(124, 58, 237, 0.25) 30%, rgba(0, 0, 0, 0.8) 100%)"
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Circle chain - right side */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`timeline-circle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${80 - i * 10}px`,
                  height: `${80 - i * 10}px`,
                  right: `${5 + i * 12}%`,
                  top: `${15 + i * 15}%`,
                  background: `radial-gradient(circle, rgba(236, 72, 153, 0.${25 - i * 3}) 0%, rgba(190, 24, 93, 0.${20 - i * 2}) 50%, rgba(0, 0, 0, 0.8) 100%)`
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8
                }}
              />
            ))}

            {/* Square with dark gradient - bottom center */}
            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-40 h-40 rounded-xl"
              style={{
                background: "linear-gradient(45deg, rgba(147, 51, 234, 0.2) 0%, rgba(79, 70, 229, 0.25) 50%, rgba(0, 0, 0, 0.9) 100%)"
              }}
              animate={{
                rotate: [0, 45, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        );

      case "faq":
        return (
          <>
            {/* Large circle with dark gradient - top left */}
            <motion.div
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(190, 24, 93, 0.25) 40%, rgba(0, 0, 0, 0.9) 100%)"
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Rectangle stack - right side */}
            <motion.div
              className="absolute top-20 -right-12 space-y-4"
              animate={{
                x: [-15, 15, -15],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`faq-rect-${i}`}
                  className="rounded-lg"
                  style={{
                    width: `${120 + i * 20}px`,
                    height: `${60 + i * 10}px`,
                    background: `linear-gradient(135deg, rgba(147, 51, 234, 0.${20 + i * 5}) 0%, rgba(79, 70, 229, 0.${15 + i * 3}) 50%, rgba(0, 0, 0, 0.8) 100%)`
                  }}
                  animate={{
                    rotate: [0, 3, -3, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
            </motion.div>

            {/* Circle constellation - center */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`faq-constellation-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${40 + (i % 3) * 15}px`,
                  height: `${40 + (i % 3) * 15}px`,
                  left: `${30 + (i % 3) * 20}%`,
                  top: `${30 + Math.floor(i / 3) * 25}%`,
                  background: `radial-gradient(circle, rgba(59, 130, 246, 0.${15 + i * 2}) 0%, rgba(29, 78, 216, 0.${10 + i}) 50%, rgba(0, 0, 0, 0.7) 100%)`
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}

            {/* Diamond shape - bottom right */}
            <motion.div
              className="absolute bottom-20 right-20 w-32 h-32"
              style={{
                background: "linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, rgba(124, 58, 237, 0.3) 50%, rgba(0, 0, 0, 0.8) 100%)",
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </>
        );

      case "prizes":
        return (
          <>
            {/* Large golden circle with gradient - top center */}
            <motion.div
              className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, rgba(255, 193, 7, 0.05) 40%, rgba(0, 0, 0, 0.9) 100%)"
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Trophy-inspired triangular shapes - left side */}
            <div className="absolute top-1/4 -left-16 space-y-8">
              {[...Array(2)].map((_, i) => (
                <div
                  key={`prizes-triangle-${i}`}
                  className="w-16 h-16"
                  style={{
                    background: `linear-gradient(135deg, rgba(200, 61, 173, 0.${10 + i * 3}) 0%, rgba(244, 129, 201, 0.${8 + i * 2}) 50%, rgba(0, 0, 0, 0.8) 100%)`,
                    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                  }}
                />
              ))}
            </div>

            {/* Floating coins/medals - right side */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`prizes-coin-${i}`}
                className="absolute rounded-full border"
                style={{
                  width: `${40 + i * 6}px`,
                  height: `${40 + i * 6}px`,
                  right: `${15 + i * 10}%`,
                  top: `${25 + i * 15}%`,
                  background: `radial-gradient(circle, rgba(255, 215, 0, 0.${8 - i}) 0%, rgba(255, 193, 7, 0.${6 - i}) 50%, rgba(0, 0, 0, 0.7) 100%)`,
                  borderColor: `rgba(255, 215, 0, 0.${15 + i * 3})`
                }}
              />
            ))}

            {/* Large rectangle with prize gradient - bottom left */}
            <div
              className="absolute bottom-16 left-10 w-40 h-24 rounded-xl"
              style={{
                background: "linear-gradient(45deg, rgba(200, 61, 173, 0.12) 0%, rgba(222, 95, 185, 0.1) 30%, rgba(244, 129, 201, 0.08) 60%, rgba(0, 0, 0, 0.8) 100%)"
              }}
            />

            {/* Star-like shapes scattered */}
            {[...Array(2)].map((_, i) => (
              <div
                key={`prizes-star-${i}`}
                className="absolute"
                style={{
                  width: `${20 + i * 8}px`,
                  height: `${20 + i * 8}px`,
                  left: `${30 + i * 20}%`,
                  top: `${65 + i * 10}%`,
                  background: `radial-gradient(circle, rgba(255, 215, 0, 0.${12 - i * 2}) 0%, rgba(255, 193, 7, 0.${8 - i}) 50%, rgba(0, 0, 0, 0.7) 100%)`,
                  clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                }}
              />
            ))}

            {/* Diamond accent - bottom right */}
            <div
              className="absolute bottom-20 right-16 w-20 h-20"
              style={{
                background: "linear-gradient(45deg, rgba(244, 129, 201, 0.15) 0%, rgba(222, 95, 185, 0.12) 50%, rgba(0, 0, 0, 0.8) 100%)",
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
              }}
            />
          </>
        );

      case "submissions":
        return (
          <>
            {/* Large circle with gradient - top left */}
            <motion.div
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(200, 61, 173, 0.15) 0%, rgba(222, 95, 185, 0.1) 40%, rgba(0, 0, 0, 0.9) 100%)"
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Code-inspired rectangles - right side */}
            <motion.div
              className="absolute top-1/4 -right-16 space-y-6"
              animate={{
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`submissions-rect-${i}`}
                  className="rounded-lg"
                  style={{
                    width: `${120 + i * 20}px`,
                    height: `${60 + i * 10}px`,
                    background: `linear-gradient(135deg, rgba(59, 130, 246, 0.${15 + i * 3}) 0%, rgba(29, 78, 216, 0.${10 + i * 2}) 50%, rgba(0, 0, 0, 0.8) 100%)`
                  }}
                  animate={{
                    rotate: [0, 2, -2, 0],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
            </motion.div>

            {/* Floating code symbols */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`submissions-symbol-${i}`}
                className="absolute text-[#C83DAD] text-2xl font-mono opacity-20"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              >
                {['{', '}', '[', ']', '('][i % 5]}
              </motion.div>
            ))}

            {/* Diamond shapes - bottom center */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 space-x-4 flex"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {[...Array(2)].map((_, i) => (
                <div
                  key={`submissions-diamond-${i}`}
                  className="w-16 h-16"
                  style={{
                    background: `linear-gradient(45deg, rgba(244, 129, 201, 0.${12 + i * 3}) 0%, rgba(222, 95, 185, 0.${8 + i * 2}) 50%, rgba(0, 0, 0, 0.8) 100%)`,
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                  }}
                />
              ))}
            </motion.div>

            {/* Small circles scattered */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`submissions-circle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${40 + i * 8}px`,
                  height: `${40 + i * 8}px`,
                  left: `${15 + i * 20}%`,
                  top: `${60 + (i % 2) * 15}%`,
                  background: `radial-gradient(circle, rgba(168, 85, 247, 0.${10 + i * 2}) 0%, rgba(124, 58, 237, 0.${8 + i}) 50%, rgba(0, 0, 0, 0.7) 100%)`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4
                }}
              />
            ))}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {getDecorations()}
    </div>
  );
};

export default SectionDecorations; 