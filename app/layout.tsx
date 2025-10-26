
import './globals.css';
import { TicketProvider } from '@/contexts/TicketContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex-col">
        <TicketProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </TicketProvider>
      </body>
    </html>
  );
}
