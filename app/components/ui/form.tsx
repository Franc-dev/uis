"use client"
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import { useToast } from './toaster';

// Form Field Types
type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio';

// Validation Types
type ValidationRule = 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';

// Field Configuration
interface FormFieldConfig {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  validation?: {
    rules: ValidationRule[];
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    customMessage?: string;
  };
  options?: string[]; // For select, radio
  defaultValue?: string | boolean;
}

// Form State
interface FormState {
  [key: string]: string | boolean;
}

// Validation State
interface ValidationState {
  [key: string]: {
    isValid: boolean;
    error?: string;
  };
}

// Advanced Form Props
interface AdvancedFormProps {
  fields: FormFieldConfig[];
  onSubmit: (data: FormState) => void;
  title?: string;
  description?: string;
}

// Validation Utility
const validateField = (value: string | boolean, config?: FormFieldConfig): { isValid: boolean; error?: string } => {
  if (!config?.validation) return { isValid: true };

  const { rules, minLength, maxLength, pattern, customMessage } = config.validation;

  for (const rule of rules) {
    switch (rule) {
      case 'required':
        if (!value) return { 
          isValid: false, 
          error: customMessage || 'This field is required' 
        };
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value === 'string' && !emailRegex.test(value)) return { 
          isValid: false, 
          error: customMessage || 'Invalid email address' 
        };
        break;
      case 'minLength':
        if (typeof value === 'string' && minLength && value.length < minLength) return { 
          isValid: false, 
          error: customMessage || `Minimum ${minLength} characters required` 
        };
        break;
      case 'maxLength':
        if (typeof value === 'string' && maxLength && value.length > maxLength) return { 
          isValid: false, 
          error: customMessage || `Maximum ${maxLength} characters allowed` 
        };
        break;
      case 'pattern':
        if (typeof value === 'string' && pattern && !pattern.test(value)) return { 
          isValid: false, 
          error: customMessage || 'Invalid format' 
        };
        break;
    }
  }

  return { isValid: true };
};

// Advanced Form Component
export const AdvancedForm: React.FC<AdvancedFormProps> = ({
  fields,
  onSubmit,
  title = 'Dynamic Form',
  description = 'Please fill out the form below'
}) => {
  const [formState, setFormState] = useState<FormState>({});
  const [validationState, setValidationState] = useState<ValidationState>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Update form state
  const handleChange = (id: string, value: string | boolean) => {
    setFormState(prev => ({ ...prev, [id]: value }));
    
    // Validate field
    const fieldConfig = fields.find(f => f.id === id);
    const validation = validateField(value, fieldConfig);
    setValidationState(prev => ({ 
      ...prev, 
      [id]: validation 
    }));
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newValidationState: ValidationState = {};
    fields.forEach(field => {
      const value = formState[field.id];
      const validation = validateField(value, field);
      newValidationState[field.id] = validation;
    });

    setValidationState(newValidationState);

    // Check if all fields are valid
    const isFormValid = Object.values(newValidationState).every(v => v.isValid);
    
    if (isFormValid) {
      onSubmit(formState);
    }
  };

  // Render input based on type
  const renderInput = (field: FormFieldConfig) => {
    const value = formState[field.id] ?? field.defaultValue ?? '';
    const validation = validationState[field.id] ?? { isValid: true };

    switch (field.type) {
      case 'text':
        return (
          <div className="relative">
            <input
              type="text"
              id={field.id}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className={`
                w-full 
                px-3 py-2 
                border 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                ${!validation.isValid 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
                }
              `}
            />
            {validation.isValid === false && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
            )}
          </div>
        );
      case 'email':
        return (
          <div className="relative">
            <input
              type="email"
              id={field.id}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className={`
                w-full 
                px-3 py-2 
                border 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                ${!validation.isValid 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
                }
              `}
            />
            {validation.isValid === false && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
            )}
          </div>
        );
      case 'password':
        return (
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id={field.id}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className={`
                w-full 
                px-3 py-2 
                border 
                rounded-md 
                focus:outline-none 
                focus:ring-2 
                ${!validation.isValid 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
                }
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {validation.isValid === false && (
              <AlertCircle className="absolute right-12 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
            )}
          </div>
        );
      case 'textarea':
        return (
          <div className="relative">
            <textarea
              id={field.id}
              placeholder={field.placeholder}
              value={value as string}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className={`
                w-full 
                px-3 py-2 
                border 
                rounded-md 
                resize-none 
                h-24 
                focus:outline-none 
                focus:ring-2 
                ${!validation.isValid 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
                }
              `}
            />
            {validation.isValid === false && (
              <AlertCircle className="absolute right-3 top-3 text-red-500 w-5 h-5" />
            )}
          </div>
        );
      case 'select':
        return (
          <select
            id={field.id}
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={`
              w-full 
              px-3 py-2 
              border 
              rounded-md 
              focus:outline-none 
              focus:ring-2 
              ${!validation.isValid 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              }
            `}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  // Multi-step form navigation
  const totalSteps = Math.ceil(fields.length / 2);

  const handleNextStep = () => {
    // Validate current step fields
    const currentStepFields = fields.slice(currentStep * 2, (currentStep + 1) * 2);
    const stepValidation: ValidationState = {};
    
    currentStepFields.forEach(field => {
      const value = formState[field.id];
      const validation = validateField(value, field);
      stepValidation[field.id] = validation;
    });

    setValidationState(prev => ({ ...prev, ...stepValidation }));

    // Check if current step fields are valid
    const isStepValid = currentStepFields.every(field => 
      validateField(formState[field.id], field).isValid
    );

    if (isStepValid && currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Render form fields for current step
  const renderCurrentStepFields = () => {
    const startIndex = currentStep * 2;
    const endIndex = startIndex + 2;
    const currentStepFields = fields.slice(startIndex, endIndex);

    return (
      <div className="grid gap-4">
        {currentStepFields.map(field => (
          <div key={field.id} className="space-y-1">
            <label 
              htmlFor={field.id} 
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            {renderInput(field)}
            {validationState[field.id]?.isValid === false && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 mt-1"
              >
                {validationState[field.id].error}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className=" max-h-full min-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 p-3 max-h-full min-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStepFields()}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="
                flex items-center 
                space-x-2 
                px-4 py-2 
                text-blue-600 
                hover:bg-blue-50 
                rounded-md
              "
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
          )}

          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="
                flex items-center 
                space-x-2 
                px-4 py-2 
                ml-auto 
                text-white 
                bg-blue-600 
                hover:bg-blue-700 
                rounded-md
              "
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              className="
                flex items-center 
                space-x-2 
                px-6 py-2 
                ml-auto 
                text-white 
                bg-blue-600 
                hover:bg-blue-700 
                rounded-md
              "
            >
              <Check className="w-5 h-5 mr-2" />
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Example Usage Component
export const FormDemo: React.FC = () => {
    const {addToast} = useToast();
  const formFields: FormFieldConfig[] = [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      validation: {
        rules: ['required', 'minLength'],
        minLength: 2
      }
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      validation: {
        rules: ['required', 'email']
      }
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Create a strong password',
      validation: {
        rules: ['required', 'minLength'],
        minLength: 8,
        customMessage: 'Password must be at least 8 characters'
      }
    },
    {
      id: 'role',
      type: 'select',
      label: 'Job Role',
      options: ['Developer', 'Designer', 'Manager', 'Other'],
      validation: {
        rules: ['required']
      }
    },
    {
      id: 'bio',
      type: 'textarea',
      label: 'Bio',
      placeholder: 'Tell us about yourself',
      validation: {
        rules: ['required', 'minLength'],
        minLength: 10
      }
    }
  ];

  const handleSubmit = (data: FormState) => {
    console.log('Form Submitted:', data);
    addToast('Form Submitted Successfully', 'success', 10000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AdvancedForm 
        fields={formFields}
        onSubmit={handleSubmit}
        title="User Registration"
        description="Create your account with just a few steps"
      />
    </div>
  );
};

export default AdvancedForm;