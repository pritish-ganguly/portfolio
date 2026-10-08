import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ContactForm } from './ContactForm';

const ModalContext = createContext(null);

export const useContactModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useContactModal must be used within ModalProvider");
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState(null);
  const modalRef = useRef(null);

  const openModal = (e) => {
    if (e && e.currentTarget) {
      setTriggerElement(e.currentTarget);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    if (triggerElement) {
      triggerElement.focus();
    }
  };

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Move focus into the modal
      setTimeout(() => {
        if (modalRef.current) {
          const firstInput = modalRef.current.querySelector('input:not([type="hidden"]):not([style*="display: none"]), button, select, textarea');
          if (firstInput) firstInput.focus();
        }
      }, 100);
      
      const handleEsc = (e) => {
        if (e.key === 'Escape') closeModal();
      };
      window.addEventListener('keydown', handleEsc);
      
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      
      {isOpen && (
        <div 
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            animation: 'fadeIn 0.3s ease-out'
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            ref={modalRef}
            className="modal-content"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative',
              animation: 'slideUp 0.3s ease-out'
            }}
          >
            <button 
              onClick={closeModal}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'var(--surface-main)',
                border: '1px solid var(--border-color)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>
            
            <h2 id="modal-title" className="heading-3" style={{ marginBottom: '0.5rem', paddingRight: '2rem' }}>
              START A PROJECT
            </h2>
            <p className="body-text" style={{ marginBottom: '2rem', fontSize: '0.9375rem' }}>
              Let's build something that works for your business.
            </p>
            
            <ContactForm />
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }
        @media (max-width: 480px) {
          .modal-backdrop {
            padding: 0 !important;
            align-items: flex-end !important;
          }
          .modal-content {
            padding: 2rem 1.5rem 3rem 1.5rem !important;
            border-radius: 24px 24px 0 0 !important;
            max-height: 95dvh !important;
            max-width: 100% !important;
            border: none !important;
            border-top: 1px solid var(--border-color) !important;
          }
        }
      `}</style>
    </ModalContext.Provider>
  );
};
