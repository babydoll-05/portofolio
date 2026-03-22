'use client';

import { motion } from 'framer-motion';
import Contact from '../components/sections/Contact';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent)' }} />
        <motion.div animate={{ scale: [1.3, 1, 1.3], rotate: [180, 0, 180] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12), transparent)' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))' }}>Get In Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Punya project menarik atau ingin collaborate? Jangan ragu untuk menghubungi saya!</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <Contact />
        </motion.div>
      </div>
    </main>
  );
}
