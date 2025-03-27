"use client"
import React from 'react';
import { CheckCircle, Gift, Rocket } from 'lucide-react';

const ModalContent: React.FC = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center mb-4">
        <Rocket className="w-16 h-16 text-green-500 animate-bounce" />
      </div>
      
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        Congratulations! 🎉
      </h2>
      
      <div className="bg-green-50 p-4 rounded-xl border border-green-200">
        <p className="text-green-900 mb-4">
          You&apos;ve successfully completed the challenge and unlocked a special reward!
        </p>
        
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Gift className="w-10 h-10 text-green-600 animate-wiggle" />
          <span className="text-xl font-semibold text-green-700">
            Bonus Points: +500
          </span>
        </div>
        
        <ul className="space-y-2 text-left text-green-800">
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Achievement Unlocked
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Reward Added to Your Account
          </li>
        </ul>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button 
          className="
            bg-green-500 text-white 
            px-6 py-2 rounded-lg 
            hover:bg-green-600 
            transition-colors 
            focus:outline-none 
            focus:ring-2 
            focus:ring-green-300
          "
        >
          Continue
        </button>
        <button 
          className="
            bg-gray-100 text-green-800 
            px-6 py-2 rounded-lg 
            hover:bg-gray-200 
            transition-colors 
            focus:outline-none 
            focus:ring-2 
            focus:ring-gray-300
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ModalContent;