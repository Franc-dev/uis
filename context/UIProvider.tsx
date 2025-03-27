"use client"
import React, { 
  createContext, 
  useState, 
  useContext, 
  ReactNode, 
  useCallback 
} from 'react';
import { Modal } from '@/app/components/ui/Modal'; // Assuming Modal is in the same directory

// Modal Configuration Interface
interface ModalConfig {
  title?: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// UI Context Interface
interface UIContextType {
  openModal: (
    content: ReactNode, 
    config?: ModalConfig
  ) => void;
  closeModal: () => void;
}

// Create UI Context
const UIContext = createContext<UIContextType>({
  openModal: () => {},
  closeModal: () => {}
});

// UI Provider Component
export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({});

  // Open Modal Function
  const openModal = useCallback((
    content: ReactNode, 
    config: ModalConfig = {}
  ) => {
    setModalContent(content);
    setModalConfig(config);
    setIsModalOpen(true);
  }, []);

  // Close Modal Function
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Reset content after animation
    setTimeout(() => {
      setModalContent(null);
      setModalConfig({});
    }, 300);
  }, []);

  return (
    <UIContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalConfig.title}
          variant={modalConfig.variant || 'default'}
          size={modalConfig.size || 'md'}
        >
          {modalContent}
        </Modal>
      )}
    </UIContext.Provider>
  );
};

// Custom Hook to use UI Context
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

// Utility Modal Types with Predefined Configurations
export const ModalTypes = {
  success: (content: ReactNode, title?: string) => ({
    content,
    config: { 
      title: title || 'Success', 
      variant: 'success' as const 
    }
  }),
  error: (content: ReactNode, title?: string) => ({
    content,
    config: { 
      title: title || 'Error', 
      variant: 'error' as const 
    }
  }),
  warning: (content: ReactNode, title?: string) => ({
    content,
    config: { 
      title: title || 'Warning', 
      variant: 'warning' as const 
    }
  }),
  info: (content: ReactNode, title?: string) => ({
    content,
    config: { 
      title: title || 'Information', 
      variant: 'info' as const 
    }
  }),
  confirm: (
    message: string, 
    onConfirm: () => void, 
    onCancel?: () => void
  ) => ({
    content: (
      <div className="space-y-4">
        <p>{message}</p>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    ),
    config: { 
      title: 'Confirm Action', 
      variant: 'default' as const 
    }
  })
};