import React from 'react';
import { Link } from '@heroui/link';
import { Logo } from '@/components/atoms/logo/logo';

export const Footer: React.FC = () => {
  const registrationNumber = 'REG-123456789';

  return (
    <footer className="w-full py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Logo />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <span className="font-medium">Registration No.:</span>
            <span>{registrationNumber}</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <span className="font-medium">Established:</span>
            <span>26.03.2025</span>
          </div>  </div>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <Link
              isExternal
              href="https://t.me/undenfined"
              title="Telegram Account"
              className="text-primary"
            >
              Telegram
            </Link>
            <Link
              isExternal
              href="https://github.com/Kru3en"
              title="GitHub Profile"
              className="text-primary"
            >
              GitHub
            </Link>
          </div>
        </div>
  
    </footer>
  );
};
