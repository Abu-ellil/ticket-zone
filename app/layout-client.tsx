'use client';

import { TicketProvider } from '../contexts/TicketContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <TicketProvider>
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </TicketProvider>
  );
}
