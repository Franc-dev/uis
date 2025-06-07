import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string | React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  icon,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const defaultIcons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  const variantStyles = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setIsVisible(false);
  };

  const selectedIcon = icon || defaultIcons[variant];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.3 }}
          className={`border-l-4 p-4 rounded-md shadow-md flex ${variantStyles[variant]} ${className}`}
          role="alert"
        >
          <div className="flex-shrink-0 mr-3">{selectedIcon}</div>
          <div className="flex-grow">
            {title && <h5 className="font-bold mb-1">{title}</h5>}
            <div>{message}</div>
          </div>
          {onClose && (
            <button
              onClick={handleClose}
              className="ml-auto pl-3 -mr-1 -my-1"
              aria-label="Close alert"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
