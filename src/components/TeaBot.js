import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/teabot.css';

/**
 * TeaBot Component - ENHANCED & INTERACTIVE
 * Animated robot character that serves as a funny, interactive assistant
 * Fixed position on screen with hilarious animations and dialogue bubble
 */

const TeaBot = () => {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [isClickMode, setIsClickMode] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [isCrazySpin, setIsCrazySpin] = useState(false);
  const [eyesWide, setEyesWide] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

  // Extended funny dialogue messages
  const dialogues = [
    '☕ Welcome to Abhang Chaha!',
    '🍵 Try our special blends!',
    '✨ Freshly brewed for you!',
    '😊 What can I serve you?',
    '🌟 Great choice!',
    '🤖 Beep boop! ☕',
    '😂 Tea is life, I\m a robot... so I don\'t drink!',
    '🎉 You just made my day 1 click better!',
    '🤔 Why are humans obsessed with tea? *beep boop*',
    '☕ Pro tip: Tea tastes better when you smile!',
    '🎪 I\'m a tea-serving legend! Bow before me!',
    '🏆 Best tea robot in the galaxy! 🚀',
  ];

  const clickDialogues = [
    '😂 Ha! That tickled my circuits!',
    '🤖 Hehehehe! You\'re funny!',
    '🎉 WHEEEEE! Again! Again!',
    '😝 That\'s the spot!',
    '🤣 My laugh capacitor is overflowing!',
    '🎪 You\'re making me dizzy in the best way!',
    '🌟 This is the best day EVER!',
    '🎺 *trumpet sounds in robot*',
  ];

  // Auto-show dialogue bubble every 8-10 seconds
  useEffect(() => {
    const dialogueInterval = setInterval(() => {
      if (!isClickMode && !isDancing && !isCrazySpin) {
        setShowBubble(true);
        setBubbleIndex((prev) => (prev + 1) % dialogues.length);

        // Hide bubble after 4 seconds
        setTimeout(() => {
          setShowBubble(false);
        }, 4000);
      }
    }, 8000 + Math.random() * 4000); // Random 8-12 seconds

    // Show initial bubble after 3 seconds
    const initialTimeout = setTimeout(() => {
      setShowBubble(true);
    }, 3000);

    return () => {
      clearInterval(dialogueInterval);
      clearTimeout(initialTimeout);
    };
  }, [isClickMode, isDancing, isCrazySpin]);

  // Handle robot clicks for interactive fun
  const handleRobotClick = () => {
    setClickCount((prev) => prev + 1);

    // Show funny response
    setShowBubble(true);
    setBubbleIndex(Math.floor(Math.random() * clickDialogues.length) + dialogues.length - clickDialogues.length);
    setIsClickMode(true);

    // Trigger random animation based on click count
    const randomAnimation = Math.random();

    if (randomAnimation < 0.33) {
      setIsDancing(true);
      setTimeout(() => setIsDancing(false), 2000);
    } else if (randomAnimation < 0.66) {
      setIsCrazySpin(true);
      setTimeout(() => setIsCrazySpin(false), 1500);
    } else {
      setEyesWide(true);
      setTimeout(() => setEyesWide(false), 800);
    }

    // Reset click mode
    setTimeout(() => {
      setIsClickMode(false);
      setShowBubble(false);
    }, 3000);

    // Clear previous timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
  };

  // Robot floating animation
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // CRAZY SPIN animation for interactive fun
  const crazySpinVariants = {
    spin: {
      rotate: [0, 360, 720, 1080],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  // DANCING animation - side to side movement
  const danceVariants = {
    dance: {
      x: [-10, 10, -10, 10, 0],
      y: [0, -5, 0, -5, 0],
      rotate: [-5, 5, -5, 5, 0],
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  };

  // Robot entrance animation
  const entranceVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'backOut',
      },
    },
  };

  // Bubble entrance animation with bounce
  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.3, x: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Wave animation for hand/arm
  const waveVariants = {
    wave: {
      rotate: [0, 20, 0, 20, 0],
      transition: {
        duration: 0.6,
        delay: 1,
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
  };

  // Cup lift animation
  const cupVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatDelay: 4,
        ease: 'easeInOut',
      },
    },
  };

  // WILD eyes animation
  const eyesVariants = {
    normal: {
      scaleY: 1,
      scaleX: 1,
    },
    wide: {
      scaleY: 1.5,
      scaleX: 1.3,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Attention blink animation
  const blinkVariants = {
    blink: {
      scaleY: [1, 0.1, 1],
      transition: {
        duration: 0.3,
        repeat: 2,
        repeatType: 'mirror',
        delay: 6,
      },
    },
  };

  return (
    <motion.div
      className="teabot-container"
      variants={entranceVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Speech Bubble */}
      {showBubble && (
        <motion.div
          className="teabot-bubble"
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p className="bubble-text">
            {isClickMode
              ? clickDialogues[
                  Math.floor(Math.random() * clickDialogues.length)
                ]
              : dialogues[bubbleIndex]}
          </p>
          <div className="bubble-pointer"></div>
        </motion.div>
      )}

      {/* Robot Body */}
      <motion.div
        className="teabot-body"
        variants={
          isCrazySpin ? crazySpinVariants : isDancing ? danceVariants : floatingVariants
        }
        animate={
          isCrazySpin ? 'spin' : isDancing ? 'dance' : 'animate'
        }
        onClick={handleRobotClick}
        whileHover={{ scale: 1.08 }}
        style={{ cursor: 'pointer' }}
      >
        {/* Head */}
        <motion.div
          className="robot-head"
          variants={blinkVariants}
          animate={eyesWide ? 'wide' : 'normal'}
          initial="normal"
        >
          {/* Eyes */}
          <motion.div
            className="robot-eyes"
            variants={eyesVariants}
            animate={eyesWide ? 'wide' : 'normal'}
          >
            <motion.div className="robot-eye" animate={eyesWide ? { scale: 1.3 } : {}}>
              <div className="eye-pupil"></div>
            </motion.div>
            <motion.div className="robot-eye" animate={eyesWide ? { scale: 1.3 } : {}}>
              <div className="eye-pupil"></div>
            </motion.div>
          </motion.div>

          {/* Smile */}
          <motion.div
            className="robot-mouth"
            animate={
              isDancing ? { scaleX: 1.3 } : isCrazySpin ? { rotate: 180 } : {}
            }
          ></motion.div>
        </motion.div>

        {/* Body */}
        <div className="robot-torso">
          {/* Left Arm (holding teapot) */}
          <motion.div
            className="robot-arm left-arm"
            variants={waveVariants}
            animate={isDancing ? { rotate: [-10, 10, -10] } : 'wave'}
          >
            <div className="arm-segment"></div>
            <div className="arm-hand"></div>
          </motion.div>

          {/* Teapot in hand */}
          <motion.div
            className="teapot"
            variants={cupVariants}
            animate={isDancing ? { rotate: [-20, 20] } : 'animate'}
          >
            <div className="teapot-body"></div>
            <div className="teapot-spout"></div>
            <div className="teapot-handle"></div>
            <div className="teapot-lid"></div>
            {/* Steam effect */}
            <div className="steam steam-1"></div>
            <div className="steam steam-2"></div>
            <div className="steam steam-3"></div>
          </motion.div>

          {/* Right Arm */}
          <motion.div
            className="robot-arm right-arm"
            animate={isDancing ? { rotate: [-10, 10, -10] } : {}}
          >
            <div className="arm-segment"></div>
            <div className="arm-hand"></div>
          </motion.div>

          {/* Chest Panel */}
          <motion.div
            className="robot-chest"
            animate={isCrazySpin ? { scale: 1.1 } : {}}
          >
            <motion.div
              className="chest-light"
              animate={
                isClickMode
                  ? { boxShadow: ['0 0 8px rgba(255, 215, 0, 0.8)', '0 0 25px rgba(255, 215, 0, 1)', '0 0 8px rgba(255, 215, 0, 0.8)'] }
                  : {}
              }
            ></motion.div>
            <motion.div
              className="chest-button"
              animate={isClickMode ? { scale: [1, 0.8, 1] } : {}}
            ></motion.div>
          </motion.div>
        </div>

        {/* Legs */}
        <motion.div
          className="robot-legs"
          animate={
            isDancing ? { x: [-5, 5, -5, 5, 0] } : {}
          }
        >
          <div className="robot-leg"></div>
          <div className="robot-leg"></div>
        </motion.div>
      </motion.div>

      {/* Interactive hover zone - LARGER for easier clicking */}
      <motion.div
        className="teabot-hover-zone"
        whileHover={{ scale: 1.15 }}
        onClick={handleRobotClick}
        onHoverStart={() => !isClickMode && setShowBubble(true)}
        onHoverEnd={() => !isClickMode && setShowBubble(false)}
      />

      {/* Click Counter Badge */}
      {clickCount > 5 && (
        <motion.div
          className="click-counter"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0 }}
        >
          {clickCount}
          <span className="counter-emoji">⭐</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TeaBot;
