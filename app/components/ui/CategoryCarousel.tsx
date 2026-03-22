'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryCarousel({ categories, onCategoryChange }: CategoryCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(2);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onCategoryChange(categories[index].id);
  };

  const handlePrev = () => {
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : categories.length - 1;
    handleSelect(newIndex);
  };

  const handleNext = () => {
    const newIndex = selectedIndex < categories.length - 1 ? selectedIndex + 1 : 0;
    handleSelect(newIndex);
  };

  return (
    <div className="relative py-12">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center text-white mb-8"
      >
        Choose Category
      </motion.h3>

      <div className="relative flex items-center justify-center gap-4 px-4 md:px-20">
        <button onClick={handlePrev} className="absolute left-0 z-10 p-3 rounded-full bg-[#1A1A3E]/80 backdrop-blur-md hover:bg-[#252550] border border-[#4A3AFF]/30 transition-all text-[#7B61FF]" aria-label="Previous category">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="flex items-center justify-center gap-4 overflow-hidden">
          {categories.map((category, index) => {
            const isSelected = index === selectedIndex;
            const distance = Math.abs(index - selectedIndex);
            const isVisible = distance <= 1;

            if (!isVisible) return null;

            return (
              <motion.div
                key={category.id}
                initial={false}
                animate={{
                  scale: isSelected ? 1 : 0.8,
                  opacity: isSelected ? 1 : 0.5,
                  x: (index - selectedIndex) * (isSelected ? 0 : 20),
                }}
                transition={{ duration: 0.3 }}
                onClick={() => handleSelect(index)}
                className={`cursor-pointer ${!isSelected ? 'hidden sm:block' : ''}`}
                style={{ zIndex: isSelected ? 10 : 1 }}
              >
                <div
                  className={`
                    relative rounded-2xl overflow-hidden
                    ${isSelected
                      ? 'ring-4 ring-[#a855f7] shadow-2xl shadow-[#a855f7]/40'
                      : 'ring-2 ring-white/10'
                    }
                    transition-all duration-300
                  `}
                  style={{
                    width: isSelected ? 'min(240px, 70vw)' : '150px',
                    height: isSelected ? 'min(320px, 50vw)' : '200px',
                  }}
                >
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl opacity-90" />

                  <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                    <motion.div animate={{ scale: isSelected ? 1 : 0.8 }} className="text-6xl mb-4">
                      {category.icon}
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-2">{category.name}</h4>
                    {isSelected && category.description && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-gray-400 mt-2"
                      >
                        {category.description}
                      </motion.p>
                    )}
                  </div>

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'linear-gradient(45deg, transparent, rgba(74, 58, 255, 0.3), transparent)',
                        animation: 'glow 2s ease-in-out infinite',
                      }}
                    />
                  )}
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-4 text-[#00D2FF] font-semibold"
                  >
                    Selected
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <button onClick={handleNext} className="absolute right-0 z-10 p-3 rounded-full bg-[#1A1A3E]/80 backdrop-blur-md hover:bg-[#252550] border border-[#4A3AFF]/30 transition-all text-[#7B61FF]" aria-label="Next category">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-[#4A3AFF] w-8' : 'bg-white/20 hover:bg-white/40'}`}
            aria-label={`Select category ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
