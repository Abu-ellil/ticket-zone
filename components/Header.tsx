
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { MenuIcon, Logo } from './Icons';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="bg-brand-green sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setIsNavOpen(true)} className="text-white">
            <MenuIcon />
          </button>
          <Link href="/" className="text-white">
            <Logo />
          </Link>
          <div className="w-8"></div>
        </div>
      </header>
      <MobileNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
};

export default Header;
