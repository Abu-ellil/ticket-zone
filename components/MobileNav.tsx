
import React from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon, Logo, FacebookIcon, InstagramIcon, LinkedInIcon, YoutubeIcon } from './Icons';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link to={to} onClick={onClose} className="block py-3 text-2xl text-white hover:text-brand-gold transition-colors duration-300">
      {children}
    </Link>
  );

  return (
    <div
      className={`fixed inset-0 bg-brand-green z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex flex-col">
        <div className="flex items-center justify-between h-16">
          <button onClick={onClose} className="text-white">
            <CloseIcon />
          </button>
          <Logo />
          <div className="w-8"></div>
        </div>
        
        <div className="flex-grow flex flex-col justify-center items-center text-center -mt-16">
            <Link to="#" onClick={onClose} className="bg-brand-gold text-brand-green font-bold py-3 px-12 rounded-full text-lg mb-8 hover:bg-yellow-300 transition-colors">
            تسجيل الدخول
            </Link>
            <nav className="space-y-4">
                <NavLink to="/about">عن تكت زون</NavLink>
                <NavLink to="/events">حفلات</NavLink>
                <NavLink to="/legends">مباريات</NavLink>
                <NavLink to="/terms">شروط الاستخدام</NavLink>
                <NavLink to="/privacy">سياسة الخصوصية</NavLink>
            </nav>
        </div>
        
        <div className="py-8">
          <div className="flex justify-center space-i-6">
            <a href="#" className="text-white hover:text-brand-gold"><FacebookIcon /></a>
            <a href="#" className="text-white hover:text-brand-gold"><LinkedInIcon /></a>
            <a href="#" className="text-white hover:text-brand-gold"><YoutubeIcon /></a>
            <a href="#" className="text-white hover:text-brand-gold"><InstagramIcon /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
