"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Compass, 
  ArrowUpRight, 
  Layers 
} from 'lucide-react';

// Card Themes
type CardTheme = 'dark' | 'light' | 'neon' | 'minimal';

// Card Interaction Modes
type InteractionMode = 'hover' | 'click' | 'static';

// Advanced Card Props
interface AdvancedCardProps {
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode;
  theme?: CardTheme;
  interactionMode?: InteractionMode;
  backgroundImage?: string;
  gradient?: [string, string];
  tags?: string[];
  onClick?: () => void;
  href?: string;
}

// Theme Configurations
const THEME_CONFIGS = {
  dark: {
    bg: 'bg-zinc-900',
    text: 'text-white',
    accent: 'text-cyan-400',
    border: 'border-zinc-700',
    hover: 'hover:bg-zinc-800'
  },
  light: {
    bg: 'bg-white',
    text: 'text-zinc-900',
    accent: 'text-blue-600',
    border: 'border-zinc-200',
    hover: 'hover:bg-zinc-50'
  },
  neon: {
    bg: 'bg-gradient-to-br from-indigo-900 to-purple-900',
    text: 'text-white',
    accent: 'text-cyan-300',
    border: 'border-purple-700',
    hover: 'hover:from-indigo-800 hover:to-purple-800'
  },
  minimal: {
    bg: 'bg-transparent',
    text: 'text-zinc-800',
    accent: 'text-blue-500',
    border: 'border-zinc-200',
    hover: 'hover:bg-zinc-100'
  }
};

// Advanced Interactive Card
export const AdvancedInteractiveCard: React.FC<AdvancedCardProps> = ({
  title,
  subtitle,
  description,
  icon = <Layers className="w-10 h-10" />,
  theme = 'dark',
  interactionMode = 'hover',
  backgroundImage,
  gradient,
  tags = [],
  onClick,
  href
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const themeConfig = THEME_CONFIGS[theme];

  // Handle card interaction
  const handleInteraction = () => {
    if (interactionMode === 'click') {
      setIsExpanded(!isExpanded);
    }
    
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick();
    }
  };

  // Determine if card is interactive
  const isInteractive = onClick || href || interactionMode === 'click';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }}
      whileHover={isInteractive ? { 
        scale: 1.03,
        transition: { duration: 0.2 }
      } : {}}
      className={`
        relative 
        overflow-hidden 
        rounded-2xl 
        shadow-xl 
        border 
        transition-all 
        duration-300 
        group
        ${themeConfig.bg}
        ${themeConfig.text}
        ${themeConfig.border}
        ${isInteractive ? 'cursor-pointer ' + themeConfig.hover : ''}
        p-6
        space-y-4
        ${backgroundImage ? 'bg-cover bg-center' : ''}
        ${gradient ? 'bg-gradient-to-br' : ''}
      `}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: backgroundImage ? 'cover' : undefined,
        ...(gradient && {
          '--tw-gradient-from': gradient[0],
          '--tw-gradient-to': gradient[1]
        })
      }}
      onClick={isInteractive ? handleInteraction : undefined}
    >
      {/* Animated Background Overlay */}
      {theme === 'neon' && (
        <motion.div 
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 0.3 }}
        />
      )}

      {/* Card Header */}
      <div className="flex justify-between items-start">
        <div className={`${themeConfig.accent}`}>
          {icon}
        </div>
        
        {isInteractive && (
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className={`w-6 h-6 ${themeConfig.accent} opacity-70 group-hover:opacity-100`} />
          </motion.div>
        )}
      </div>

      {/* Card Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
        
        <AnimatePresence>
          {(!isExpanded || interactionMode !== 'click') && (
            <motion.p
              initial={{ opacity: 1, height: 'auto' }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: { duration: 0.2 }
              }}
              className="text-sm opacity-80 line-clamp-3"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>

        {isExpanded && interactionMode === 'click' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { duration: 0.3 }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { duration: 0.2 }
            }}
            className="space-y-2"
          >
            <p className="text-sm">{description}</p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`
                      px-2 py-1 
                      rounded-full 
                      text-xs 
                      ${themeConfig.accent} 
                      bg-current bg-opacity-10
                    `}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Card Grid for Responsive Layout
export const CardGrid: React.FC<{
  children: React.ReactNode, 
  columns?: 2 | 3 | 4,
  gap?: 'sm' | 'md' | 'lg'
}> = ({ 
  children, 
  columns = 3,
  gap = 'md'
}) => {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  return (
    <div className={`
      grid 
      ${columnClasses[columns]}
      ${gapClasses[gap]}
      w-full
    `}>
      {children}
    </div>
  );
};

// Showcase Component
export const CardShowcase: React.FC = () => {
  return (
    <div className="p-8 bg-zinc-50">
      <CardGrid columns={2} gap="lg">
        <AdvancedInteractiveCard 
          title="Digital Innovation" 
          subtitle="Transforming Ideas"
          description="Leverage cutting-edge technologies to create breakthrough solutions that push the boundaries of what's possible in digital experiences."
          icon={<Sparkles className="w-10 h-10" />}
          theme="neon"
          interactionMode="click"
          tags={['AI', 'UX', 'Strategy']}
        />
        <AdvancedInteractiveCard 
          title="Creative Solutions" 
          subtitle="Innovative Thinking"
          description="Design revolutionary approaches that solve complex problems through creative problem-solving and interdisciplinary collaboration."
          icon={<Zap className="w-10 h-10" />}
          theme="dark"
          href="/creative-solutions"
          tags={['Design', 'Innovation', 'Strategy']}
        />
        <AdvancedInteractiveCard 
          title="Global Exploration" 
          subtitle="Boundless Horizons"
          description="Discover new perspectives and opportunities by breaking traditional boundaries and embracing a global, interconnected approach."
          icon={<Compass className="w-10 h-10" />}
          theme="minimal"
          interactionMode="hover"
          gradient={['#6366f1', '#8b5cf6']}
          tags={['Research', 'Insights', 'Global']}
        />
         <AdvancedInteractiveCard 
          title="Creative AI" 
          subtitle="Innovative Thinking"
          description="Design revolutionary approaches that solve complex problems through creative problem-solving and interdisciplinary collaboration."
          icon={<Zap className="w-10 h-10" />}
          theme="minimal"
          interactionMode="click"
          tags={['Design', 'Innovation', 'Strategy']}
        />
      </CardGrid>
    </div>
  );
};

export default AdvancedInteractiveCard;