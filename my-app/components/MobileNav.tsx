'use client';

import React from 'react';
import Link from 'next/link';
import { CloseIcon, Logo, FacebookIcon, InstagramIcon, LinkedInIcon, YoutubeIcon } from './Icons';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <Link href={href} onClick={onClick} className="block py-3 text-2xl text-white hover:text-brand-gold transition-colors duration-300">
    {children}
  </Link>
);

// Side menu navigation
const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Side menu */}
      <div
        className={`fixed inset-0 bg-[#006e5f] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 h-full flex-col">
          <div className="flex items-center justify-between h-16">
            <button onClick={onClose} className="text-white">
              <CloseIcon />
            </button>
            <div className="text-white text-xl font-bold">تكت زون</div>
            <div className="w-8"></div>
          </div>
          
          <div className="flex-grow flex flex-col justify-center items-center text-center -mt-16">
               <Link href="#" onClick={onClose} className="bg-white text-[#006e5f] font-bold py-3 px-12 rounded-full text-lg mb-8 hover:bg-gray-100 transition-colors">
               تسجيل الدخول
               </Link>
               <nav className="space-y-4">
                   <NavLink href="/about" onClick={onClose}>عن تكت زون</NavLink>
                   <NavLink href="/events" onClick={onClose}>حفلات</NavLink>
                   <NavLink href="/legends" onClick={onClose}>مباريات</NavLink>
                   <NavLink href="/terms" onClick={onClose}>شروط الاستخدام</NavLink>
                   <NavLink href="/privacy" onClick={onClose}>سياسة الخصوصية</NavLink>
               </nav>
          </div>
        </div>
      </div>
       
      {/* Bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#006e5f] flex justify-around items-center py-2 z-40">
        <Link href="/" className="flex flex-col items-center text-white text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          الرئيسية
        </Link>
        <Link href="/search" className="flex flex-col items-center text-white text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          البحث
        </Link>
        <Link href="/tickets" className="flex flex-col items-center text-white text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          تذاكري
        </Link>
      </div>
      
      {/* <div className="py-8">
        <div className="flex justify-center space-i-6">
          <a href="#" className="text-white hover:text-brand-gold"><FacebookIcon /></a>
          <a href="#" className="text-white hover:text-brand-gold"><LinkedInIcon /></a>
          <a href="#" className="text-white hover:text-brand-gold"><YoutubeIcon /></a>
          <a href="#" className="text-white hover:text-brand-gold"><InstagramIcon /></a>
        </div>
      </div> */}
    </>
  );
};

export default MobileNav;
