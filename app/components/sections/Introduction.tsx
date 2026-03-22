'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Button from '../ui/Button';

export default function Introduction() {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortIntro = "Halo! Saya Natalie Neysa Jessica Soesanto. Saya adalah seorang developer yang passionate dalam menciptakan pengalaman web yang indah dan fungsional.";

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent)',
            boxShadow: '0 0 100px rgba(168, 85, 247, 0.2)'
          }}
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [180, 0, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12), transparent)',
            boxShadow: '0 0 100px rgba(236, 72, 153, 0.15)'
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          {/* Card Container - Glass Morphism */}
          <div className="bg-[#130a24]/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#a855f7]/30 relative overflow-hidden"
            style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.15), inset 0 0 40px rgba(168, 85, 247, 0.03)' }}
          >
            {/* Decorative Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="w-24 h-24 bg-gradient-to-br from-[#a855f7] to-[#ec4899] rounded-full mx-auto mb-6 flex items-center justify-center text-5xl relative"
              style={{ boxShadow: '0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2)' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-[#c084fc]/40"
                style={{ boxShadow: '0 0 20px rgba(192, 132, 252, 0.3)' }}
              />
              👋
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8"
            >
              <span className="bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))'
                }}
              >
                Natalie Neysa Jessica Soesanto
              </span>
            </motion.h1>

            {/* Introduction Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-200 text-lg leading-relaxed text-center"
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <p>{shortIntro}</p>

                    {/* About Me - Full Story */}
                    <div className="text-left space-y-4 mt-8">
                      <h3 className="text-2xl font-bold text-[#c084fc]">Tentang Saya</h3>
                      <p className="text-gray-300">
                        Perjalanan saya dalam dunia programming dimulai dari rasa ingin tahu yang besar tentang bagaimana teknologi bekerja. Kini, saya fokus mengembangkan aplikasi web modern menggunakan teknologi terkini seperti React, Next.js, dan TypeScript.
                      </p>
                      <p className="text-gray-300">
                        Saya percaya bahwa teknologi harus accessible dan memberikan impact positif. Oleh karena itu, saya selalu berusaha membuat produk yang tidak hanya terlihat bagus, tetapi juga mudah digunakan dan memberikan solusi nyata untuk masalah yang ada.
                      </p>
                      <p className="text-gray-300">
                        Di luar coding, saya senang belajar hal baru, berkontribusi ke open source, dan berbagi pengetahuan melalui blog dan komunitas developer. Saya juga tertarik dengan Web3, UI/UX design, dan semua hal yang berkaitan dengan innovation di dunia tech.
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                      {[
                        { icon: '🎨', title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                        { icon: '⚙️', title: 'Backend', skills: ['Node.js', 'Express', 'API Design', 'Database'] },
                        { icon: '🛠️', title: 'Tools', skills: ['Git', 'VS Code', 'Figma', 'Responsive Design'] },
                      ].map((category) => (
                        <div key={category.title} className="bg-[#1a0e2e]/50 backdrop-blur-sm rounded-xl p-4 text-left border border-[#a855f7]/20">
                          <div className="text-3xl mb-2">{category.icon}</div>
                          <h4 className="font-bold text-[#c084fc] mb-3">{category.title}</h4>
                          <ul className="space-y-1 text-sm text-gray-300">
                            {category.skills.map((skill) => (
                              <li key={skill} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]"></span>
                                {skill}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <p className="text-center italic mt-6 text-gray-300">
                      Saat ini saya sedang mencari kesempatan magang atau kerja di mana saya bisa terus belajar, berkembang, dan berkontribusi dengan skills yang saya miliki. Mari kita ciptakan sesuatu yang amazing bersama!
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="short"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {shortIntro}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Show More Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="outline"
                size="lg"
              >
                {isExpanded ? (
                  <>
                    Sembunyikan
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Selengkapnya
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
