'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Link from 'next/link';
/* eslint-disable @next/next/no-img-element */

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated Background Flowing Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large flowing gradient blob - top right */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.2), transparent 70%)',
          }}
        />
        {/* Flowing pink/magenta accent */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.5), rgba(168, 85, 247, 0.3), transparent 70%)',
          }}
        />
        {/* Cyan flowing accent - bottom */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse, rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.2), transparent 70%)',
          }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 font-light">
                Full-stack Developer & Creative Coder
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9]"
            >
              <span className="block">JESSICA</span>
              <span className="block bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#22d3ee] bg-clip-text text-transparent"
                style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.4))' }}
              >
                NEYZ
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-md font-light"
            >
              A passionate developer who loves creating beautiful and functional web experiences, pushing the boundaries of modern web technology.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <Button size="lg">
                  <span className="flex items-center gap-2">
                    About Me
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg">Connect With Me</Button>
              </Link>
            </motion.div>

            {/* Glassmorphism Skill Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { label: 'React', color: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/30' },
                { label: 'Next.js', color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30' },
                { label: 'TypeScript', color: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30' },
                { label: 'Tailwind CSS', color: 'from-teal-500/20 to-cyan-500/20', border: 'border-teal-500/30' },
                { label: 'Node.js', color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30' },
              ].map((skill, index) => (
                <motion.span
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-4 py-2 bg-gradient-to-r ${skill.color} backdrop-blur-xl rounded-full text-sm font-medium text-gray-300 border ${skill.border} cursor-default`}
                >
                  {skill.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image - Right Side (NicolAI-style artistic display) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Glow effect behind image */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-[2rem] blur-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.4), rgba(34, 211, 238, 0.3))',
                  transform: 'scale(1.1)',
                }}
              />

              {/* Flowing decorative elements */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.5), transparent, rgba(34, 211, 238, 0.5), transparent)',
                }}
              />
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-20"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(236, 72, 153, 0.5), transparent, rgba(168, 85, 247, 0.5), transparent)',
                }}
              />

              {/* Main Image Container */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
                style={{
                  boxShadow: '0 0 60px rgba(168, 85, 247, 0.2), 0 0 120px rgba(34, 211, 238, 0.1), 0 25px 50px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Image with gradient overlay */}
                <div className="relative aspect-[3/4] w-full">
                  <img
                    src="/hero-avatar.webp"
                    alt="Natalie - Developer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Bottom gradient fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-transparent to-transparent opacity-80" />
                  {/* Side glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ec4899]/10 via-transparent to-[#22d3ee]/10" />
                </div>

                {/* Glassmorphism overlay card on image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm text-gray-300 font-light">Available for opportunities</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Feature Cards - NicolAI style glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              title: 'Creative Frontend',
              desc: 'Building immersive UI with React, Next.js, and modern CSS.',
              gradient: 'from-pink-500/10 to-purple-500/10',
              border: 'border-pink-500/20',
              iconColor: 'text-pink-400',
            },
            {
              title: 'Robust Backend',
              desc: 'Scalable server solutions with Node.js and database design.',
              gradient: 'from-purple-500/10 to-blue-500/10',
              border: 'border-purple-500/20',
              iconColor: 'text-purple-400',
            },
            {
              title: 'Modern Stack',
              desc: 'TypeScript-first approach with cutting-edge tooling.',
              gradient: 'from-cyan-500/10 to-teal-500/10',
              border: 'border-cyan-500/20',
              iconColor: 'text-cyan-400',
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.15 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-gradient-to-br ${card.gradient} backdrop-blur-xl rounded-2xl p-6 border ${card.border} cursor-default group`}
            >
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 ${card.iconColor} group-hover:scale-110 transition-transform`}>
                {index === 0 && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                )}
              </div>
              <h3 className="text-white font-semibold mb-1">{card.title}</h3>
              <p className="text-gray-400 text-sm font-light">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-purple-400/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
