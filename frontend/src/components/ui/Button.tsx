import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'yellow' | 'gold' | 'dark' | 'outline' | 'outline-light' | 'glass-outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: (e?: React.MouseEvent<HTMLElement> | React.FormEvent) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  type = 'button',
  icon,
  disabled = false,
  style
}) => {
  // Map 'primary' and 'gold' to 'yellow' / 'gold' for consistent styling
  const variantClass = variant === 'yellow' || variant === 'gold' 
    ? 'btn-yellow' 
    : `btn-${variant}`;
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  const combinedClass = `btn ${variantClass} ${sizeClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClass} onClick={onClick} style={style}>
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} onClick={onClick} target="_blank" rel="noopener noreferrer" style={style}>
        <span>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClass} onClick={onClick} disabled={disabled} style={style}>
      <span>{children}</span>
      {icon}
    </button>
  );
};
