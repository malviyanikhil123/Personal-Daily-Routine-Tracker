import React from 'react';
import type { Toast } from '../types';
import ToastComponent from './Toast';

interface ToastContainerProps {
  toasts: Toast[];
  onRemoveToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts, 
  onRemoveToast 
}) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastComponent
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;