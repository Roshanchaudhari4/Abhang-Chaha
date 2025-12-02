/**
 * Reusable Framer Motion Animation Variants
 * Professional, smooth, and lightweight animations
 * Respects existing design and color scheme
 */

// ============================================
// SECTION ANIMATIONS (Scroll-based reveals)
// ============================================

export const sectionRevealVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: "easeOut",
    },
  }),
};

export const sectionFadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// ============================================
// TEXT & HEADING ANIMATIONS
// ============================================

export const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const textRevealVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.05,
      ease: "easeOut",
    },
  }),
};

// ============================================
// BUTTON ANIMATIONS
// ============================================

export const buttonHoverVariants = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const buttonRippleVariants = {
  whileHover: {
    boxShadow: "0 0 20px rgba(139, 69, 19, 0.4)",
    scale: 1.05,
  },
  whileTap: {
    scale: 0.98,
  },
};

export const buttonGlowVariants = {
  whileHover: {
    boxShadow: [
      "0 0 0px rgba(139, 69, 19, 0.4)",
      "0 0 10px rgba(139, 69, 19, 0.4)",
    ],
    scale: 1.05,
  },
  whileTap: { scale: 0.98 },
};

// ============================================
// CARD ANIMATIONS (Hover lift effect)
// ============================================

export const cardHoverVariants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  hover: {
    y: -8,
    boxShadow: "0 12px 30px rgba(139, 69, 19, 0.2)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const cardFadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: "easeOut",
    },
  }),
};

// ============================================
// IMAGE ANIMATIONS
// ============================================

export const imageHoverZoomVariants = {
  rest: { scale: 1, transition: { duration: 0.3 } },
  hover: {
    scale: 1.08,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const imageFocusRingVariants = {
  rest: {
    boxShadow: "0 0 0px rgba(139, 69, 19, 0)",
    transition: { duration: 0.3 },
  },
  hover: {
    boxShadow: "0 0 20px rgba(139, 69, 19, 0.3)",
    transition: { duration: 0.3 },
  },
};

export const imageOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// ============================================
// FORM ANIMATIONS
// ============================================

export const inputFocusVariants = {
  rest: {
    borderColor: "#E8D4B8",
    boxShadow: "0 0 0px rgba(139, 69, 19, 0)",
    transition: { duration: 0.2 },
  },
  focus: {
    borderColor: "#8B4513",
    boxShadow: "0 0 0px 2px rgba(139, 69, 19, 0.1)",
    transition: { duration: 0.2 },
  },
};

export const formContainerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// ============================================
// SUCCESS & ERROR ANIMATIONS
// ============================================

export const successMessageVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

export const errorShakeVariants = {
  shake: {
    x: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export const errorHighlightVariants = {
  rest: {
    borderColor: "#E8D4B8",
    backgroundColor: "transparent",
    transition: { duration: 0.2 },
  },
  error: {
    borderColor: "#E63946",
    backgroundColor: "rgba(230, 57, 70, 0.05)",
    transition: { duration: 0.2 },
  },
};

// ============================================
// MICRO-INTERACTIONS
// ============================================

export const hoverBounceVariants = {
  whileHover: {
    y: -3,
    transition: { duration: 0.2 },
  },
};

export const hoverGlowVariants = {
  rest: {
    boxShadow: "0 0 0px rgba(139, 69, 19, 0)",
  },
  hover: {
    boxShadow: "0 0 15px rgba(139, 69, 19, 0.2)",
  },
};

export const pulseVariants = {
  animate: {
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// NAVBAR ANIMATIONS
// ============================================

export const navItemVariants = {
  rest: {
    color: "currentColor",
    transition: { duration: 0.2 },
  },
  hover: {
    color: "#FFD700",
    transition: { duration: 0.2 },
  },
};

export const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export const hamburgerVariants = {
  closed: { rotate: 0 },
  open: { rotate: 180 },
};

// ============================================
// STAGGER CONTAINER (For lists & grids)
// ============================================

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: "easeOut",
    },
  },
};

// ============================================
// ICON ANIMATIONS
// ============================================

export const iconRotateVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const iconBounceVariants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// MODAL & OVERLAY ANIMATIONS
// ============================================

export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

// ============================================
// SCROLL TRIGGER ANIMATIONS
// ============================================

export const viewportSettings = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -100px 0px",
};

// ============================================
// UTILITY: Staggered Text Animation
// ============================================

export const staggeredTextVariants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: custom * 0.1,
    },
  }),
};

export const characterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};
