import React from 'react';
import { CreditCard, Zap, Check } from 'lucide-react';

interface BNPLPaymentBadgeProps {
  totalPrice?: number;
}

export const BNPLPaymentBadge: React.FC<BNPLPaymentBadgeProps> = ({ totalPrice = 85 }) => {
  const installment = (totalPrice / 4).toFixed(2);

  return (
    <div className="bnpl-payment-badge">
      <div className="bnpl-top-row">
        <Zap size={14} className="zap-icon" />
        <span>Pay in 4 interest-free payments of <strong>${installment} AUD</strong></span>
      </div>
      <div className="bnpl-providers-row">
        <span className="provider-tag afterpay">afterpay <span>⚡</span></span>
        <span className="provider-tag klarna">Klarna.</span>
        <span className="provider-tag zip">zip</span>
      </div>

      <style>{`
        .bnpl-payment-badge {
          background: rgba(210, 176, 76, 0.08);
          border: 1px dashed var(--accent-gold);
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          margin-top: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .bnpl-top-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.775rem;
          color: #07131D;
        }
        .zap-icon {
          color: #B38E2A;
        }
        .bnpl-providers-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .provider-tag {
          font-size: 0.675rem;
          font-weight: 900;
          padding: 0.1rem 0.45rem;
          border-radius: 4px;
          text-transform: lowercase;
        }
        .provider-tag.afterpay { background: #B2FCE4; color: #000000; }
        .provider-tag.klarna { background: #FFB3C7; color: #000000; }
        .provider-tag.zip { background: #AA8FFF; color: #FFFFFF; }
      `}</style>
    </div>
  );
};
