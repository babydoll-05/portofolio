'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CategoryCarousel from '../ui/CategoryCarousel';
import ProjectCard3D from '../ui/ProjectCard3D';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

export default function Projects3D() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projects, setProjects] = useState<{id:string;title:string;description:string;image:string;tags:string[];category:string;projectUrl?:string;demoUrl?:string;githubUrl?:string;videoUrl?:string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(data => { setProjects(data); setLoading(false); });
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🌟', description: 'View all my projects' },
    { id: 'web3', name: 'Web3', icon: '🔗', description: 'Blockchain & crypto projects' },
    { id: 'organization', name: 'Organization', icon: '🏢', description: 'Work for organizations' },
    { id: 'personal', name: 'Personal', icon: '💡', description: 'Side projects & experiments' },
    { id: 'open-source', name: 'Open Source', icon: '🌍', description: 'Contributions to OSS' },
  ];


  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const getVisibleProjects = () => {
    const len = filteredProjects.length;
    if (len === 0) return [];
    const prevIndex = (currentIndex - 1 + len) % len;
    const nextIndex = (currentIndex + 1) % len;
    return [
      { ...filteredProjects[prevIndex], position: 'left' as const },
      { ...filteredProjects[currentIndex], position: 'center' as const },
      { ...filteredProjects[nextIndex], position: 'right' as const },
    ];
  };

  const visibleProjects = getVisibleProjects();

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(74, 58, 255, 0.15), transparent)' }}
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(0, 210, 255, 0.12), transparent)' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-[#4A3AFF] via-[#7B61FF] to-[#00D2FF] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore my creative work across different categories
          </p>
        </motion.div>

        <CategoryCarousel categories={categories} onCategoryChange={setSelectedCategory} />

        {/* 3D Cards */}
        <div className="mt-20 relative">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          ) : filteredProjects.length > 0 ? (
            <>
              <div className="relative h-[500px] flex items-center justify-center perspective-1000">
                {visibleProjects.map((project, index) => (
                  <div
                    key={`${project.id}-${index}`}
                    className={`absolute ${project.position !== 'center' ? 'hidden md:block' : ''}`}
                    style={{
                      left: project.position === 'left' ? '5%' : project.position === 'center' ? '50%' : '85%',
                      transform: project.position === 'center' ? 'translateX(-50%)' : project.position === 'left' ? 'translateX(0)' : 'translateX(-100%)',
                    }}
                  >
                    <ProjectCard3D
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      tags={project.tags}
                      projectUrl={project.projectUrl}
                      demoUrl={project.demoUrl}
                      githubUrl={project.githubUrl}
                      videoUrl={project.videoUrl}
                      position={project.position}
                      index={index}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-8 mt-12">
                <button onClick={handlePrev} className="w-14 h-14 rounded-full bg-[#1A1A3E] hover:bg-[#252550] border border-[#4A3AFF]/30 transition-all flex items-center justify-center text-[#7B61FF] shadow-lg" aria-label="Previous project">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <a href="/projects"><Button size="lg">View All</Button></a>
                <button onClick={handleNext} className="w-14 h-14 rounded-full bg-[#1A1A3E] hover:bg-[#252550] border border-[#4A3AFF]/30 transition-all flex items-center justify-center text-[#7B61FF] shadow-lg" aria-label="Next project">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-[#4A3AFF] w-8' : 'bg-gray-600 w-2 hover:bg-gray-500'}`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No projects found in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
