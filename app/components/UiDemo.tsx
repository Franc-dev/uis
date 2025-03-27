"use client"
import React, { useState } from 'react';
import { Progress } from '@/app/components/ui/Progress';
import { Breadcrumb } from '@/app/components/ui/Breadcrumb';
import { Modal } from './ui/Modal';
import { Home, AlertTriangle, Info } from 'lucide-react';
import ModalContent from './examples/ModalContent';

export const UIComponentDemo: React.FC = () => {
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);


  const handleCloseWarningModal = () => {
    setIsWarningModalOpen(false);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false); 
  }

  return (
    <div className="space-y-8 flex-col flex p-4 gap-y-6">
      {/* Progress Demo */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Progress Variants</h3>
        <Progress value={75} variant='default' label="Project Progress" />
        <Progress value={45} variant="success" className="mt-2" />
        <Progress value={30} variant="warning" className="mt-2" />
        <Progress value={15} variant="error" className="mt-2" />
      </div>

      {/* Breadcrumb Demo */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Breadcrumbs</h3>
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/', icon: Home },
            { label: 'Products', href: '/products' },
            { label: 'Electronics', href: '/products/electronics' },
            { label: 'Smartphones' }
          ]} 
        />
      </div>

      {/* Modal Demos */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Modal Variants</h3>
        <div className="flex space-x-4">
          <button 
            onClick={() => setIsRewardModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Open Reward Modal
          </button>
          <button 
            onClick={() => setIsWarningModalOpen(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Open Warning Modal
          </button>
          <button 
            onClick={() => setIsInfoModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Open Info Modal
          </button>
          <button
            onClick={() => setIsErrorModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Open Error Modal
          </button>
        </div>

        {/* Reward Modal */}
        <Modal 
          isOpen={isRewardModalOpen} 
          onClose={()=>setIsRewardModalOpen(false)}
          title="Achievement Unlocked"
          variant="success"
          size="md"
        >
          <ModalContent />
        </Modal>

        {/* Warning Modal */}
        <Modal 
          isOpen={isWarningModalOpen} 
          onClose={handleCloseWarningModal}
          title="System Alert"
          variant="warning"
          size="md"
        >
          <div className="space-y-4 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-yellow-500 animate-pulse" />
            </div>
            <h2 className="text-xl font-bold text-yellow-800 mb-4">
              Proceed with Caution
            </h2>
            <p className="text-yellow-900 mb-4">
              You are about to perform an action that cannot be undone. Are you sure you want to continue?
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleCloseWarningModal}
                className="
                  bg-yellow-500 text-white 
                  px-6 py-2 rounded-lg 
                  hover:bg-yellow-600 
                  transition-colors
                "
              >
                Confirm
              </button>
              <button 
                onClick={handleCloseWarningModal}
                className="
                  bg-gray-100 text-yellow-800 
                  px-6 py-2 rounded-lg 
                  hover:bg-gray-200 
                  transition-colors
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* Info Modal */}
        <Modal 
          isOpen={isInfoModalOpen} 
          onClose={handleCloseInfoModal}
          title="System Information"
          variant="info"
          size="md"
        >
          <div className="space-y-4 text-center">
            <div className="flex justify-center mb-4">
              <Info className="w-16 h-16 text-blue-500 animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Important Update
            </h2>
            <p className="text-blue-900 mb-4">
              A new version of the application is available. Would you like to update now?
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleCloseInfoModal}
                className="
                  bg-blue-500 text-white 
                  px-6 py-2 rounded-lg 
                  hover:bg-blue-600 
                  transition-colors
                "
              >
                Update
              </button>
              <button 
                onClick={handleCloseInfoModal}
                className="
                  bg-gray-100 text-blue-800 
                  px-6 py-2 rounded-lg 
                  hover:bg-gray-200 
                  transition-colors
                "
              >
                Later
              </button>
            </div>
          </div>
        </Modal>
        <Modal 
          isOpen={isErrorModalOpen} 
          onClose={handleCloseErrorModal}
          title="System Error"
          variant="error"
          size="md"
        >
          <div className="space-y-4 text-center">
            <div className="flex justify-center mb-4">
              <Info className="w-16 h-16 text-red-500 animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-red-800 mb-4">
              Important Update
            </h2>
            <p className="text-red-900 mb-4">
              A new version of the application is available. Would you like to update now?
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={handleCloseErrorModal}
                className="
                  bg-red-500 text-white 
                  px-6 py-2 rounded-lg 
                  hover:bg-red-600 
                  transition-colors
                "
              >
                Update
              </button>
              <button 
                onClick={handleCloseErrorModal}
                className="
                  bg-red-100 text-red-800 
                  px-6 py-2 rounded-lg 
                  hover:bg-red-200 
                  transition-colors
                "
              >
                Later
              </button>
            </div>
          </div>
        </Modal>

        {/* error */}

      </div>
    </div>
  );
};