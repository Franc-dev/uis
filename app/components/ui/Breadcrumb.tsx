"use client"
import React, { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

// Breadcrumb Types
interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items, 
  separator = <ChevronRight className="w-4 h-4 mx-1 text-gray-500" />,
  className = ''
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center ${className}`}>
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && separator}
              {item.href ? (
                <a 
                  href={item.href} 
                  className={`
                    flex items-center 
                    ${isLast 
                      ? 'text-gray-500' 
                      : 'text-blue-600 hover:text-blue-800 transition-colors'
                    }
                  `}
                >
                  {Icon && <Icon className="w-4 h-4 mr-1" />}
                  {item.label}
                </a>
              ) : (
                <span className={`
                  flex items-center 
                  ${isLast ? 'text-gray-500' : 'text-blue-600'}
                `}>
                  {Icon && <Icon className="w-4 h-4 mr-1" />}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};