import './globals.css';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import LayoutClient from './layout-client';

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
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
