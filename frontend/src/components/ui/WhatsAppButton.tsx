import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const savedSettings = localStorage.getItem('canguruber_business_settings');
  const businessInfo = savedSettings ? JSON.parse(savedSettings) : { phone: '0412345678' };

  let cleanPhone = (businessInfo.phone || '0412345678').replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '61' + cleanPhone.slice(1);
  }

  const message = encodeURIComponent('Hi Canguruber Driving School! I want to inquire about booking a driving lesson or test car hire.');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

  return (
    <>
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        title="Chat live with Canguruber on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} fill="#FFFFFF" color="#25D366" />
        <span className="whatsapp-text">Chat on WhatsApp</span>
        <span className="whatsapp-pulse-ring" />
      </a>

      <style>{`
        .whatsapp-float-btn {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #25D366;
          color: #FFFFFF;
          padding: 0.75rem 1.15rem;
          border-radius: var(--radius-full);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.85rem;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .whatsapp-float-btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.55);
          background: #20BA5A;
        }
        @media (max-width: 600px) {
          .whatsapp-float-btn {
            bottom: 20px;
            left: 16px;
            padding: 0.65rem 0.85rem;
          }
          .whatsapp-text {
            display: none;
          }
        }
        .whatsapp-pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-full);
          border: 2px solid #25D366;
          top: 0;
          left: 0;
          animation: waPulse 2s infinite;
          pointer-events: none;
        }
        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>
    </>
  );
};
