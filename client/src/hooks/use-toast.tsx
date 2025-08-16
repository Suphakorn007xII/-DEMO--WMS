// hooks/use-toast.ts
import { toast } from 'sonner';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

type ToastStatus = 'success' | 'error' | 'info' | 'warning';

type ToastOptions = {
  type: ToastStatus;
  message: string;
  description?: string;
};

type APIResponse = {
  status: ToastStatus;
  message: string;
};

export const useToast = () => {
  const iconMap: Record<ToastStatus, React.ReactNode> = {
    success: <CheckCircle className="text-green-500" />,
    error: <XCircle className="text-red-500" />,
    info: <Info className="text-blue-500" />,
    warning: <AlertTriangle className="text-yellow-500" />,
  };

  const classMap: Record<ToastStatus, string> = {
    success: 'bg-green-50 text-green-800 border border-green-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
  };

  const setToastAlert = (options: ToastOptions) => {
    toast(options.message, {
      description: options.description,
      icon: iconMap[options.type],
      className: classMap[options.type],
    });
  };

  const setToastFromAPI = (res: APIResponse) => {
    setToastAlert({ type: res.status, message: res.message });
  };

  return {
    setToastAlert,
    setToastFromAPI, // ✅ สำหรับ API response โดยเฉพาะ
  };
};
