'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { MenuIcon } from './Icons';

interface HeaderProps {
  hideHero?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideHero }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="bg-[#006e5f] sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" aria-label="الرئيسية" className="text-white">
            <img src="/logo-new-ed0d5f53.svg" alt="تكت زون Logo" className="h-8" />
          </Link>
          <button onClick={() => setIsNavOpen(true)} className="text-white rounded-md border border-white/30 px-2 py-1">
            <MenuIcon />
          </button>
          
        </div>
      </header>

      {/* Hero title under the top bar */}
      {!hideHero && (
        <section className="bg-[#006e5f]">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold text-center">تذكرتك صارت سهلة!</h1>
          </div>
        </section>
      )}

      <MobileNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
};

export default Header;
