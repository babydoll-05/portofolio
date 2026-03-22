import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5, boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)' } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white/5 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}
