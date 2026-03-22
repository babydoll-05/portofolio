'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import CategoryCarousel from '../ui/CategoryCarousel';
import ProjectCard from '../ui/ProjectCard';
import Button from '../ui/Button';
import Link from 'next/link';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      id: 'all',
      name: 'All Projects',
      icon: '🌟',
      description: 'View all my projects',
    },
    {
      id: 'web3',
      name: 'Web3',
      icon: '🔗',
      description: 'Blockchain & crypto projects',
    },
    {
      id: 'organization',
      name: 'Organization',
      icon: '🏢',
      description: 'Work for organizations',
    },
    {
      id: 'personal',
      name: 'Personal',
      icon: '💡',
      description: 'Side projects & experiments',
    },
    {
      id: 'open-source',
      name: 'Open Source',
      icon: '🌍',
      description: 'Contributions to OSS',
    },
  ];

  // Sample projects data
  const projects = [
    {
      id: 1,
      title: 'DeFi Dashboard',
      description: 'A comprehensive dashboard for tracking DeFi investments and portfolio performance across multiple chains.',
      image: '💰',
      tags: ['React', 'Web3', 'Ethers.js'],
      category: 'web3',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 2,
      title: 'NFT Marketplace',
      description: 'Decentralized marketplace for buying, selling, and trading NFTs with low gas fees.',
      image: '🎨',
      tags: ['Next.js', 'Solidity', 'IPFS'],
      category: 'web3',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 3,
      title: 'Company Website',
      description: 'Modern corporate website with CMS integration and multi-language support.',
      image: '🏢',
      tags: ['Next.js', 'Tailwind', 'CMS'],
      category: 'organization',
      demoUrl: 'https://example.com',
    },
    {
      id: 4,
      title: 'Task Manager',
      description: 'Productivity app for managing tasks, projects, and team collaboration.',
      image: '✅',
      tags: ['React', 'Node.js', 'MongoDB'],
      category: 'personal',
      githubUrl: 'https://github.com',
    },
    {
      id: 5,
      title: 'Weather App',
      description: 'Beautiful weather forecast app with location-based predictions and interactive maps.',
      image: '🌤️',
      tags: ['React', 'API', 'Chart.js'],
      category: 'personal',
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 6,
      title: 'UI Component Library',
      description: 'Open source React component library with accessibility and customization in mind.',
      image: '🎭',
      tags: ['React', 'TypeScript', 'Storybook'],
      category: 'open-source',
      githubUrl: 'https://github.com',
    },
  ];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
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
            My <span className="bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore my work across different categories, from Web3 applications to personal projects.
          </p>
        </motion.div>

        {/* Category Carousel */}
        <CategoryCarousel
          categories={categories}
          onCategoryChange={setSelectedCategory}
        />

        {/* Projects Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          {filteredProjects.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    tags={project.tags}
                    demoUrl={project.demoUrl}
                    githubUrl={project.githubUrl}
                    index={index}
                  />
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center">
                <Link href="/projects">
                  <Button size="lg">
                    View All Projects
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No projects found in this category yet.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
