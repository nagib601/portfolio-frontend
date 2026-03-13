import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Logo = () => {
  const { isDark } = useTheme();

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.5, type: "spring", duration: 2, bounce: 0 },
        opacity: { delay: i * 0.5, duration: 0.01 }
      }
    })
  };

  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 200 200"
      initial="hidden"
      animate="visible"
      style={{ background: 'transparent' }}
      className={isDark ? "drop-shadow-[0_0_15px_var(--accent-shadow)]" : ""}
    >
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#E2E8F0" : "#64748B"} />
          <stop offset="100%" stopColor={isDark ? "#94A3B8" : "#334155"} />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="crossbarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isDark ? "#ffffff" : "#1e293b"} />
          <stop offset="100%" stopColor={isDark ? "#ffffff" : "#1e293b"} />
        </linearGradient>
      </defs>

      {/* Left Curve (C) */}
      <motion.path
        d="M60 60C45 75 45 125 60 140"
        stroke="url(#silverGrad)"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
        variants={draw}
        custom={0}
      />

      {/* AN */}
      <motion.path
        d="M90 140V60L135 140V60"
        stroke="url(#accentGrad)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={draw}
        custom={1}
      />

      {/* A Crossbar — white dark mode, dark light mode, animates last */}
      <motion.path
        d="M87 110H120"
        stroke={isDark ? "#E2E8F0" : "#1e293b"}
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
        variants={draw}
        custom={2}
      />

    </motion.svg>
  );
};

export default Logo;