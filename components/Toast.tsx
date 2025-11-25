
import React, { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    bg: 'bg-green-50',
    text: 'text-green-800',
  },
  error: {
    icon: <XCircle className="w-6 h-6 text-red-500" />,
    bg: 'bg-red-50',
    text: 'text-red-800',
  },
  info: {
    icon: <Info className="w-6 h-6 text-blue-500" />,
    bg: 'bg-blue-50',
    text: 'text-blue-800',
  },
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };
  
  const config = toastConfig[type];

  return (
    <div
      className={`max-w-sm w-full ${config.bg} shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transition-all duration-300 ease-in-out ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{config.icon}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className={`text-sm font-medium ${config.text}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button onClick={handleClose} className={`inline-flex rounded-md ${config.bg} text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}>
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
