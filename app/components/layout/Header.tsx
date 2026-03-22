'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-[#2d1b69]/40 backdrop-blur-md z-50 border-b border-[#a855f7]/20"
      style={{ boxShadow: '0 4px 20px rgba(74, 58, 255, 0.1)' }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="text-2xl font-bold bg-gradient-to-r from-[#4A3AFF] via-[#7B61FF] to-[#00D2FF] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            jee-portofolio
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-gray-300 hover:text-[#00D2FF] transition-colors font-medium">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-[#00D2FF]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 space-y-4"
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} onClick={() => setIsOpen(false)} className="block py-2 text-gray-300 hover:text-[#00D2FF] transition-colors font-medium">
                  {item.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </nav>
    </motion.header>
  );
}
