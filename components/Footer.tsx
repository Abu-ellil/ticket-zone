
'use client';

import React from 'react';
import Link from 'next/link';
import { Logo, StarIcon, SearchIcon, FacebookIcon, InstagramIcon, LinkedInIcon } from './Icons';


const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-green text-white pt-12 pb-6">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center space-i-4 mb-6">
          <div className="bg-white p-3 rounded-md"><StarIcon /></div>
          <div className="bg-white p-3 rounded-md"><SearchIcon /></div>
        </div>
        <div className="flex justify-center mb-6">
            <Logo />
        </div>
        <p className="max-w-xs mx-auto mb-8">
            لا تفوت المناسبات الحلوة, خليك جزء منها واحجز تذكرتك منا
        </p>
        <div className="border-t border-white/20 mb-6"></div>
        <div className="space-y-2 text-sm">
            <div className="flex flex-col sm:flex-row justify-center sm:space-i-6">
                <Link href="/privacy" className="hover:text-brand-gold">سياسة الخصوصية</Link>
                <Link href="/terms" className="hover:text-brand-gold">شروط الاستخدام</Link>
            </div>
            <p>رقم مركز خدمة الزبائن: <a href="tel:9647873344009" className="hover:text-brand-gold">9647873344009</a></p>
            <p>البريد الالكتروني: <a href="mailto:info@digitalzone.app" className="hover:text-brand-gold">info@digitalzone.app</a></p>
        </div>
        <div className="border-t border-white/20 my-6"></div>

        <div className="flex justify-center space-i-6 mb-6">
            <a href="#" className="text-white hover:text-brand-gold"><FacebookIcon /></a>
            <a href="#" className="text-white hover:text-brand-gold"><LinkedInIcon /></a>
            <a href="#" className="text-white hover:text-brand-gold"><InstagramIcon /></a>
        </div>
        <p className="text-xs text-white/70">
          حقوق الملكية © 2024 آفاق المعرفة. جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
 );
};

export default Footer;
