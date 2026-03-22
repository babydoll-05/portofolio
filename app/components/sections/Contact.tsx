'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: '📧', title: 'Email', value: 'jessicaneysa@gmail.com', link: 'mailto:jessicaneysa@gmail.com' },
    { icon: '💼', title: 'LinkedIn', value: 'jessica-neysa', link: 'https://www.linkedin.com/in/jessica-neysa-b179243b6' },
    { icon: '🐙', title: 'GitHub', value: '@babydoll-05', link: 'https://github.com/babydoll-05' },
    { icon: '🐦', title: 'X (Twitter)', value: '@jee_neyz', link: 'https://x.com/jee_neyz' },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="contact">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(74, 58, 255, 0.1), transparent)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="bg-gradient-to-r from-[#4A3AFF] via-[#7B61FF] to-[#00D2FF] bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1A3E] border border-[#4A3AFF]/30 focus:border-[#4A3AFF] focus:ring-2 focus:ring-[#4A3AFF]/20 outline-none transition-all text-white placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1A3E] border border-[#4A3AFF]/30 focus:border-[#4A3AFF] focus:ring-2 focus:ring-[#4A3AFF]/20 outline-none transition-all text-white placeholder-gray-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-[#1A1A3E] border border-[#4A3AFF]/30 focus:border-[#4A3AFF] focus:ring-2 focus:ring-[#4A3AFF]/20 outline-none transition-all resize-none text-white placeholder-gray-500"
                    placeholder="Your message..."
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : status === 'success' ? 'Sent!' : 'Send Message'}
                </Button>
                {status === 'success' && (
                  <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-[#00D2FF] text-center font-medium">
                    Message sent successfully!
                  </motion.p>
                )}
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Card>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title} href={info.link} target="_blank" rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#1A1A3E] transition-colors group"
                  >
                    <div className="text-4xl">{info.icon}</div>
                    <div>
                      <p className="font-semibold text-white group-hover:text-[#00D2FF] transition-colors">{info.title}</p>
                      <p className="text-gray-400">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-gray-400 mb-6">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/babydoll-05" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#1a0e2e] rounded-lg hover:bg-[#a855f7] hover:text-white text-gray-400 transition-all border border-[#a855f7]/20">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/jessica-neysa-b179243b6" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#1a0e2e] rounded-lg hover:bg-[#a855f7] hover:text-white text-gray-400 transition-all border border-[#a855f7]/20">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="mailto:jessicaneysa@gmail.com" className="p-3 bg-[#1a0e2e] rounded-lg hover:bg-[#a855f7] hover:text-white text-gray-400 transition-all border border-[#a855f7]/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
                <a href="https://x.com/jee_neyz" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#1a0e2e] rounded-lg hover:bg-[#a855f7] hover:text-white text-gray-400 transition-all border border-[#a855f7]/20">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
