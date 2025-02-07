'use client';

import { motion } from 'framer-motion';

export default function NotificationDot() {
  return (
    <motion.div
      className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
} 