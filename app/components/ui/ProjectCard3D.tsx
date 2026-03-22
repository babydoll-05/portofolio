'use client';

import { motion } from 'framer-motion';

interface ProjectCard3DProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  projectUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  position?: 'left' | 'center' | 'right';
  index?: number;
}

export default function ProjectCard3D({
  title,
  description,
  image,
  tags,
  projectUrl,
  demoUrl,
  githubUrl,
  videoUrl,
  position = 'center',
  index = 0,
}: ProjectCard3DProps) {

  const getTransformStyle = () => {
    switch (position) {
      case 'left':
        return { rotateY: 25, rotateZ: -5, x: 50, scale: 0.75, zIndex: 1, opacity: 0.6 };
      case 'right':
        return { rotateY: -25, rotateZ: 5, x: -50, scale: 0.75, zIndex: 1, opacity: 0.6 };
      case 'center':
      default:
        return { rotateY: 0, rotateZ: 0, x: 0, scale: 1, zIndex: 10, opacity: 1 };
    }
  };

  const transformStyle = getTransformStyle();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: transformStyle.opacity, y: 0 }}
      viewport={{ once: true }}
      animate={{
        rotateY: transformStyle.rotateY,
        rotateZ: transformStyle.rotateZ,
        x: transformStyle.x,
        scale: transformStyle.scale,
      }}
      whileHover={position === 'center' ? { scale: 1.05, y: -10 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => {
        if (position === 'center') {
          const url = projectUrl || demoUrl || githubUrl;
          if (url) window.open(url, '_blank');
        }
      }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000, zIndex: transformStyle.zIndex, cursor: position === 'center' ? 'pointer' : 'default' }}
      className={`group relative rounded-3xl overflow-hidden ${position === 'center' ? 'w-80 h-96 shadow-2xl' : 'w-72 h-80 shadow-xl'}`}
    >
      <div className="relative w-full h-full backdrop-blur-xl bg-white/5 border border-white/10" style={{ boxShadow: position === 'center' ? '0 0 30px rgba(168,85,247,0.2), inset 0 0 30px rgba(255,255,255,0.02)' : 'none' }}>
        <div className={`relative flex items-center justify-center ${position === 'center' ? 'h-64' : 'h-56'} bg-white/5`}>
          {image.startsWith('/') || image.startsWith('http') ? (
            <img src={image} alt={title} className="w-full h-full object-cover absolute inset-0" />
          ) : (
            <div className="text-8xl filter drop-shadow-2xl">{image}</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B1A]/80 via-transparent to-transparent" />

          {position === 'center' && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {projectUrl && (
                <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-center text-xs font-medium transition-all backdrop-blur-sm border border-white/20">
                  Project
                </a>
              )}
              {demoUrl && (
                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-2 bg-[#a855f7]/90 hover:bg-[#a855f7] text-white rounded-full text-center text-xs font-medium transition-all backdrop-blur-sm">
                  Demo
                </a>
              )}
              {videoUrl && (
                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-3 py-2 bg-[#ec4899]/90 hover:bg-[#ec4899] text-white rounded-full text-center text-xs font-medium transition-all backdrop-blur-sm">
                  ▶ Video
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className={`font-bold text-white mb-2 ${position === 'center' ? 'text-xl' : 'text-lg'}`}>{title}</h3>
          {position === 'center' && (
            <>
              <p className="text-gray-400 mb-4 text-sm line-clamp-2">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-[#c084fc] rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(168, 85, 247, 0.2), transparent)',
          }}
        />

        {position === 'center' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-[#4A3AFF] to-[#00D2FF] rounded-full flex items-center justify-center shadow-lg border-4 border-[#0B0B1A]"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </motion.div>
  );
}
