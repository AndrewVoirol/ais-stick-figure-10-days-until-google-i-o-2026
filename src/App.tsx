/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useMemo } from "react";

// Synchronized animation times for 12-second loop with 12 keyframes
// 0.00: Start
// 0.10: Eyes look around
// 0.20: Eyes look left
// 0.30: Stick figure runs in
// 0.40: Stick figure jump-kicks left eye
// 0.45: Left eye flies away, Staff flies in from right
// 0.55: Staff hits Stick Figure, Staff forms '/' in 'I/O'
// 0.65: Stick Figure offscreen
// 0.75: 'I/O' morphs into '10' ('1' from staff, '0' from right eye) - Starburst!
// 0.85: Particles fall and fade
// 0.95: Reset starts
// 1.00: Loop complete
const T = [0, 0.1, 0.2, 0.3, 0.4, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 1];
const duration = 12;

const geminiStarPath = "M0 -15 Q0 0 15 0 Q0 0 0 15 Q0 0 -15 0 Q0 0 0 -15 Z";

export default function App() {
  const particles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 180 + 60;
      const explodeX = 400 + Math.cos(angle) * speed;
      const explodeY = 200 + Math.sin(angle) * speed;
      const fallY = explodeY + 300 + Math.random() * 150;
      return {
        id: i,
        explodeX,
        explodeY,
        fallY,
        startScale: Math.random() * 0.8 + 0.3,
        rotateTarget: Math.random() * 720 - 360,
      };
    });
  }, []);

  return (
    <div className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-4xl aspect-[2/1] relative" style={{ minHeight: "200px" }}>
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full drop-shadow-xl"
          style={{ overflow: "visible" }}
          role="img"
          aria-label="Animated countdown: a stick figure kicks an eye, gets bonked by a staff, and the scene morphs into the number 10 with a starburst explosion — celebrating 10 days until Google I/O 2026."
        >
          <title>10 Days Until Google I/O 2026 — Stick Figure Animation</title>
          <desc>
            A looping 12-second SVG animation featuring a stick figure, two
            floating eyes, and a staff. The stick figure runs in and kicks one
            eye offscreen, then a staff flies in and bonks the figure away. The
            remaining eye morphs into a zero while the staff becomes a one,
            forming the number ten, punctuated by a burst of Gemini-gradient
            star particles.
          </desc>

          <defs>
            <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c7bba" />
              <stop offset="50%" stopColor="#b551ee" />
              <stop offset="100%" stopColor="#f28b82" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BACKGROUND TEXT */}
          <text
            x="400"
            y="340"
            textAnchor="middle"
            fontSize="26"
            className="fill-gray-400 font-medium tracking-widest"
          >
            10 DAYS UNTIL GOOGLE I/O 2026
          </text>

          {/* RIGHT EYE ('O') -> Becomes '0' */}
          <motion.g
            animate={{
              x: [0, -10, -20, -10, 20, 0, 0, 0, 0, 0, 0, 0],
              opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
              rotate: [0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0],
            }}
            transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "450px", originY: "200px" }}
          >
            <motion.ellipse
              cx="450"
              cy="200"
              fill="white"
              stroke="#202124"
              initial={{ strokeWidth: 6, rx: 20, ry: 30 }}
              animate={{
                strokeWidth: [6, 6, 6, 6, 6, 6, 6, 6, 25, 25, 6, 6],
                rx: [20, 20, 20, 20, 20, 20, 20, 20, 30, 30, 20, 20],
                ry: [30, 30, 30, 30, 30, 30, 30, 30, 60, 60, 30, 30],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Pupil */}
            <motion.circle
              cy="200"
              r="8"
              fill="#202124"
              initial={{ cx: 440 }}
              animate={{
                opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
                cx: [440, 435, 430, 430, 450, 440, 430, 440, 440, 440, 440, 440],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Sparkle */}
            <motion.path
              d={geminiStarPath}
              x="440"
              y="200"
              fill="url(#gemini-grad)"
              animate={{
                opacity: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                scale: [0, 0.8, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                x: [440, 435, 430, 430, 450, 440, 430, 440, 440, 440, 440, 440],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* LEFT EYE */}
          <motion.g
            animate={{
              x: [0, -10, -20, -20, 100, 500, 500, 500, 500, 500, 0, 0],
              y: [0, 0, 0, 0, -100, -300, -300, -300, -300, -300, 0, 0],
              opacity: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
              rotate: [0, 0, 0, 0, 180, 720, 720, 720, 720, 720, 0, 0],
            }}
            transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "350px", originY: "200px" }}
          >
            <ellipse
              cx="350"
              cy="200"
              rx="20"
              ry="30"
              fill="white"
              stroke="#202124"
              strokeWidth="6"
            />
            {/* Pupil */}
            <motion.circle
              cy="200"
              r="8"
              fill="#202124"
              initial={{ cx: 340 }}
              animate={{
                cx: [340, 335, 330, 330, 350, 340, 340, 340, 340, 340, 340, 340],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Sparkle */}
            <motion.path
              d={geminiStarPath}
              x="340"
              y="200"
              fill="url(#gemini-grad)"
              animate={{
                opacity: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                scale: [0, 0.8, 0.8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* STICK FIGURE (gets knocked away!) */}
          <motion.g
            animate={{
              x: [-200, -200, -200, 100, 300, 350, 350, -200, -200, -200, -200, -200],
              y: [0, 0, 0, 0, -40, 0, 0, -100, -100, -100, 0, 0],
              rotate: [0, 0, 0, 0, 10, 0, 0, -360, -360, -360, 0, 0],
              opacity: [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            }}
            transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            stroke="#202124"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Head */}
            <motion.circle
              cx="0"
              cy="100"
              r="15"
              strokeWidth="8"
              fill="white"
            />

            {/* Body */}
            <motion.line
              x1="0"
              y1="115"
              x2="0"
              y2="180"
              strokeWidth="8"
            />

            {/* Left Leg */}
            <motion.line
              x1="0"
              y1="180"
              strokeWidth="8"
              initial={{ x2: -10, y2: 220 }}
              animate={{
                x2: [-10, -10, -20, 20, 60, -10, -10, -30, -30, -30, -10, -10],
                y2: [220, 220, 210, 200, 160, 220, 220, 190, 190, 190, 220, 220],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Right Leg */}
            <motion.line
              x1="0"
              y1="180"
              strokeWidth="8"
              initial={{ x2: 10, y2: 220 }}
              animate={{
                x2: [10, 10, 20, -20, 10, 10, 10, 30, 30, 30, 10, 10],
                y2: [220, 220, 210, 200, 220, 220, 220, 190, 190, 190, 220, 220],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Left Arm */}
            <motion.line
              x1="0"
              y1="140"
              strokeWidth="8"
              initial={{ x2: -15, y2: 180 }}
              animate={{
                x2: [-15, -15, -25, 20, -30, -15, -15, -30, -30, -30, -15, -15],
                y2: [180, 180, 170, 150, 120, 180, 180, 120, 120, 120, 180, 180],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Right Arm */}
            <motion.line
              x1="0"
              y1="140"
              strokeWidth="8"
              initial={{ x2: 15, y2: 180 }}
              animate={{
                x2: [15, 15, 25, -20, 30, 15, 15, 30, 30, 30, 15, 15],
                y2: [180, 180, 170, 150, 120, 180, 180, 120, 120, 120, 180, 180],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* STAFF ('/' -> '1') */}
          <motion.g
            animate={{
              x: [800, 800, 800, 800, 800, 800, 360, 360, 360, 360, 800, 800],
              y: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
              rotate: [-45, -45, -45, -45, -45, -45, -20, -20, 0, 0, -45, -45],
              opacity: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
            }}
            transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            stroke="#202124"
            strokeLinecap="round"
          >
            <motion.line
              initial={{ x1: 0, y1: -80, x2: 0, y2: 80, strokeWidth: 8 }}
              animate={{
                x1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                y1: [-80, -80, -80, -80, -80, -80, -80, -80, -60, -60, -80, -80],
                x2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                y2: [80, 80, 80, 80, 80, 80, 80, 80, 60, 60, 80, 80],
                strokeWidth: [8, 8, 8, 8, 8, 8, 8, 8, 25, 25, 8, 8],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Top Serif Flag for '1' */}
            <motion.line
              x1="-20"
              y1="-45"
              x2="0"
              y2="-60"
              strokeWidth="25"
              animate={{
                opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* BURST PARTICLES */}
          {particles.map((p) => (
            <motion.path
              key={p.id}
              d={geminiStarPath}
              fill="url(#gemini-grad)"
              filter="url(#glow)"
              animate={{
                x: [400, 400, 400, 400, 400, 400, 400, 400, p.explodeX, p.explodeX, 400, 400],
                y: [200, 200, 200, 200, 200, 200, 200, 200, p.explodeY, p.fallY, 200, 200],
                opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
                rotate: [0, 0, 0, 0, 0, 0, 0, 0, p.rotateTarget / 2, p.rotateTarget, 0, 0],
                scale: [0, 0, 0, 0, 0, 0, 0, 0, p.startScale, 0.1, 0, 0],
              }}
              transition={{ duration, times: T, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
