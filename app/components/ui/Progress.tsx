"use client"
import React from 'react';
import { motion } from 'framer-motion';

// Progress Component Types
interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error' ;
  className?: string;
  label?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value, 
  max = 100, 
  variant = 'default',
  className = '',
  label
}) => {
  // Ensure value is between 0 and max
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;

  // Variant color mappings
  const variantColors = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <div className="text-sm mb-2 flex justify-between">
        <span>{label}</span>
        <span>{`${Math.round(percentage)}%`}</span>
      </div>}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`h-2.5 rounded-full ${variantColors[variant]}`}
        />
      </div>
    </div>
  );
};