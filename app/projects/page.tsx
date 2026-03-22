'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Loader from '../components/ui/Loader';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  projectUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
}

const CATEGORY_MAP: Record<string, string> = {
  'All': 'all',
  'Web3': 'web3',
  'Organization': 'organization',
  'Personal': 'personal',
  'Open Source': 'open-source',
};

export default function ProjectsPage() {
  const categories = ['All', 'Web3', 'Organization', 'Personal', 'Open Source'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => { setProjects(data); setLoading(false); });
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === CATEGORY_MAP[selectedCategory]);

  return (
    <main className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-10 left-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent)' }} />
        <motion.div animate={{ scale: [1.3, 1, 1.3], rotate: [180, 0, 180] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12), transparent)' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))' }}>My Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Eksplorasi berbagai project yang telah saya kerjakan, dari Web3 hingga Open Source</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-lg shadow-[#a855f7]/30' : 'bg-[#1a0e2e] text-gray-400 border border-[#a855f7]/20 hover:border-[#a855f7]/50'}`}>
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <div
                    className="bg-[#130a24]/80 backdrop-blur-xl rounded-2xl p-6 border border-[#a855f7]/20 hover:border-[#a855f7]/40 transition-all duration-300 cursor-pointer"
                    style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)' }}
                    onClick={() => {
                      const url = project.projectUrl || project.demoUrl || project.githubUrl;
                      if (url) window.open(url, '_blank');
                    }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-[#1a0e2e] to-[#130a24] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {project.image?.startsWith('/') || project.image?.startsWith('http') ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">{project.image}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#a855f7]/10 text-[#c084fc] rounded-full text-xs border border-[#a855f7]/20">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 flex-wrap" onClick={e => e.stopPropagation()}>
                      {project.projectUrl && (
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex-1 border border-[#a855f7]/40 text-[#c084fc] py-2 rounded-lg text-center text-sm font-medium hover:bg-[#a855f7]/10 transition-colors">Project</a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white py-2 rounded-lg text-center text-sm font-medium hover:opacity-80 transition-opacity">Demo</a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 border border-[#a855f7] text-[#c084fc] py-2 rounded-lg text-center text-sm font-medium hover:bg-[#a855f7]/10 transition-colors">GitHub</a>
                      )}
                      {project.videoUrl && (
                        <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#ec4899]/80 text-white py-2 rounded-lg text-center text-sm font-medium hover:opacity-80 transition-opacity">▶ Video</a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <p className="text-gray-400 text-lg">Belum ada project dalam kategori ini</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
