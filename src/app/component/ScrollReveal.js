'use client'

import { motion } from 'framer-motion'

// Apple's actual easing — smooth accelerate then decelerate
const ease = [0.25, 0.1, 0.25, 1]

// Premium easing for more dramatic reveals  
const easePremium = [0.22, 1, 0.36, 1]

const directionMap = {
  up:    { y: 32, x: 0 },
  down:  { y: -32, x: 0 },
  left:  { y: 0, x: 40 },
  right: { y: 0, x: -40 },
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.65,       // ✅ was 0.1 — now actually visible
  direction = 'up',      // ✅ new: up | down | left | right
  blur = true,           // ✅ new: lens-focus blur
  scale = true,          // ✅ new: subtle depth scale
  once = true,           // ✅ new: replay on scroll if false
  amount = 0.15,         // ✅ new: how much of element must be visible
  className,
  style,
}) {
  const { x, y } = directionMap[direction] || directionMap.up

  return (
    <motion.div
      className={className}
      style={style}
      initial={{
        opacity: 0,
        x,
        y,
        scale: scale ? 0.97 : 1,
        filter: blur ? 'blur(8px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: blur ? 'blur(0px)' : 'none',
      }}
      viewport={{
        once,
        amount,          // ✅ was margin:"-100px" — amount is more reliable
      }}
      transition={{
        duration,
        delay,
        ease: easePremium,  // ✅ valid bezier — actual premium feel
      }}
    >
      {children}
    </motion.div>
  )
}