
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { MenuIcon, Logo, SearchIcon } from './Icons';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="bg-[#005950] sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setIsNavOpen(true)} className="text-white">
            <MenuIcon />
          </button>
          <Link href="/" className="text-white">
            <Logo />
          </Link>
          <button className="text-white">
            <SearchIcon />
          </button>
        </div>
      </header>
      <MobileNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
};

export default Header;
