import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils.ts';
import { Button } from './Button.tsx';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
  id = 'app-modal',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        id={`${id}-backdrop`}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        id={`${id}-container`}
        className={cn(
          'relative w-full overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-xl transition-all duration-200 z-10',
          maxWidthClasses[maxWidth]
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
          <div className="space-y-1">
            <h2
              id={`${id}-title`}
              className="text-lg font-bold tracking-tight text-neutral-900"
            >
              {title}
            </h2>
            {description && (
              <p className="text-xs text-neutral-500 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <Button
            id={`${id}-close-btn`}
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
            className="h-8 w-8 text-neutral-400 hover:text-neutral-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Body Content */}
        <div className="py-4 text-neutral-700 text-sm">{children}</div>

        {/* Footer Actions */}
        {footer && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
