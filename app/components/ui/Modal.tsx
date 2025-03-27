"use client"
import React, { ReactNode, useEffect } from 'react';
import { 
  Check, 
  X, 
  AlertTriangle, 
  Info 
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Enhanced Modal Types
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen, 
  onClose, 
  children, 
  title, 
  size = 'md',
  variant = 'default',
  closeOnEscape = true,
  closeOnOutsideClick = true
}) => {
  // Enhanced Variant Configuration
  const variantConfig = {
    default: { 
      icon: null, 
      bg: 'bg-white', 
      text: 'text-gray-900',
      border: 'border-gray-200',
      backdrop: 'bg-black/20',
      glow: 'hover:shadow-lg transition-shadow duration-300'
    },
    success: { 
      icon: Check, 
      bg: 'bg-green-50', 
      text: 'text-green-900',
      border: 'border-green-200',
      backdrop: 'bg-green-500/20',
      glow: 'hover:shadow-green-md transition-all duration-300 hover:scale-[1.02]'
    },
    warning: { 
      icon: AlertTriangle, 
      bg: 'bg-yellow-50', 
      text: 'text-yellow-900',
      border: 'border-yellow-200',
      backdrop: 'bg-yellow-500/20',
      glow: 'hover:shadow-yellow-md transition-all duration-300 hover:scale-[1.02]'
    },
    error: { 
      icon: X, 
      bg: 'bg-red-50', 
      text: 'text-red-900',
      border: 'border-red-200',
      backdrop: 'bg-red-500/20',
      glow: 'hover:shadow-red-md transition-all duration-300 hover:scale-[1.02]'
    },
    info: { 
      icon: Info, 
      bg: 'bg-blue-50', 
      text: 'text-blue-900',
      border: 'border-blue-200',
      backdrop: 'bg-blue-500/20',
      glow: 'hover:shadow-blue-md transition-all duration-300 hover:scale-[1.02]'
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const VariantIcon = variantConfig[variant].icon;

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent rendering if not open
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`
          fixed inset-0 z-50 flex items-center justify-center 
          ${variantConfig[variant].backdrop} p-4
        `}
        onClick={closeOnOutsideClick ? onClose : undefined}
      >
        <motion.div 
          initial={{ 
            scale: 0.8, 
            opacity: 0, 
            y: 50 
          }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0 
          }}
          exit={{ 
            scale: 0.8, 
            opacity: 0, 
            y: 50 
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 250, 
            damping: 25 
          }}
          className={`
            relative w-full ${sizeClasses[size]} 
            ${variantConfig[variant].bg} 
            ${variantConfig[variant].text}
            ${variantConfig[variant].border}
            ${variantConfig[variant].glow}
            rounded-2xl shadow-xl border 
            p-6 overflow-hidden
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Gradient Overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{
              background: `linear-gradient(
                135deg, 
                ${variant === 'success' ? 'rgba(34, 197, 94, 0.2)' : 
                 variant === 'warning' ? 'rgba(234, 179, 8, 0.2)' : 
                 variant === 'error' ? 'rgba(239, 68, 68, 0.2)' : 
                 variant === 'info' ? 'rgba(59, 130, 246, 0.2)' : 
                 'rgba(0,0,0,0.1)'}
              )`
            }}
          />

          {/* Close Button */}
          {/* <motion.button
            whileHover={{ 
              rotate: 90, 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className={`
              absolute top-4 right-4 
              hover:bg-gray-100 rounded-full p-2
              transition-all duration-200 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 
              ${variant === 'default' ? 'focus:ring-gray-300' : 
                variant === 'success' ? 'focus:ring-green-300' :
                variant === 'warning' ? 'focus:ring-yellow-300' :
                variant === 'error' ? 'focus:ring-red-300' :
                'focus:ring-blue-300'}
            `}
            aria-label="Close modal"
          >
            <X
            onClick={onClose}
             className="w-5 h-5 opacity-70 hover:opacity-100" />
          </motion.button> */}

          {/* Title Section */}
          {title && (
            <div className="flex items-center mb-4 relative z-10">
              {VariantIcon && (
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <VariantIcon className="w-7 h-7 mr-3 opacity-80" />
                </motion.div>
              )}
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};