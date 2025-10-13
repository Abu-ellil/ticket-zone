import './globals.css';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import { TicketProvider } from '../contexts/TicketContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Ticket Zone',
  description: 'Buy tickets for events easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <TicketProvider>
          <div className="flex flex-col min-h-screen bg-white text-gray-800">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </TicketProvider>
      </body>
    </html>
  );
}