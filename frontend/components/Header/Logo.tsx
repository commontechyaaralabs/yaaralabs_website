import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-12 h-12 relative">
        <Image
          src="/yaaralogo-circle.png"
          alt="YAARALABS Logo"
          fill
          className="object-contain"
          priority
          sizes="48px"
        />
      </div>
      <span className="text-white text-xl ml-3 font-semibold">YaaraLabs</span>
    </div>
  );
};

export { Logo };