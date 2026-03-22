'use client';

import { motion } from 'framer-motion';
import Card from '../ui/Card';

export default function About() {
  const education = [
    { level: 'TK', name: 'TK Tarakanita Bumijo', icon: '🌱' },
    { level: 'SD', name: 'SD Tarakanita Bumijo', icon: '📚' },
    { level: 'SMP', name: 'SMP Stella Duce 1', icon: '📖' },
    { level: 'SMA', name: 'SMA Stella Duce 1', icon: '🎒' },
    { level: 'Kuliah', name: 'Universitas Kristen Duta Wacana', icon: '🎓' },
  ];

  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
      icon: '🎨',
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'API Design', 'Database'],
      icon: '⚙️',
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'VS Code', 'Figma', 'Responsive Design'],
      icon: '🛠️',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="about">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#a855f7] rounded-full blur-3xl opacity-[0.07]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ec4899] rounded-full blur-3xl opacity-[0.05]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Kenalan sama aku yuk!
          </p>
        </motion.div>

        {/* Profile + Education row */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">

          {/* Profil */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#a855f7]"
                  style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}>
                  <img src="/me.jpg" alt="Jessica Neysa" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Natalie Neysa Jessica Soesanto</h3>
                  <p className="text-[#c084fc] text-sm font-medium">Mahasiswa Informatika</p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-xl">🎓</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Universitas</p>
                    <p className="text-white font-medium">Universitas Kristen Duta Wacana</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Jurusan</p>
                    <p className="text-white font-medium">Informatika</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Lokasi</p>
                    <p className="text-white font-medium">Indonesia</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-xl">✨</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Minat</p>
                    <p className="text-white font-medium">Web Development, UI/UX, Open Source</p>
                  </div>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Pendidikan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📚</span> Riwayat Pendidikan
              </h3>
              <div className="relative">
                {/* timeline line */}
                <div className="absolute left-[22px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#a855f7] to-[#ec4899] opacity-40" />
                <ul className="space-y-4">
                  {education.map((edu, index) => (
                    <motion.li
                      key={edu.level}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 pl-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1a0e2e] border border-[#a855f7]/40 flex items-center justify-center text-lg shrink-0 z-10">
                        {edu.icon}
                      </div>
                      <div>
                        <span className="text-xs text-[#c084fc] font-semibold uppercase tracking-wider">{edu.level}</span>
                        <p className="text-white font-medium">{edu.name}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Organisasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🏢</span> Organisasi
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'BPMU', role: 'Kepala Komisi V Media & Informasi', icon: '📢' },
                { name: 'BPMF', role: 'Anggota Desain Grafis', icon: '🎨' },
                { name: 'Sixti', role: 'Anggota PDD', icon: '📸' },
                { name: 'UKM E-Sport UKDW', role: 'Bendahara', icon: '🎮' },
                { name: 'UKM Badminton', role: 'Anggota Sosmed', icon: '🏸' },
              ].map((org, index) => (
                <motion.div
                  key={org.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-[#a855f7]/50 transition-all"
                >
                  <div className="text-2xl mb-2">{org.icon}</div>
                  <p className="text-white font-semibold text-sm">{org.name}</p>
                  <p className="text-[#c084fc] text-xs mt-1">{org.role}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Skills & Technologies</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skillSet, index) => (
              <motion.div
                key={skillSet.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <div className="text-4xl mb-4">{skillSet.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-4">{skillSet.category}</h4>
                  <ul className="space-y-2">
                    {skillSet.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-[#a855f7]"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
