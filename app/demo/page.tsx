'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { Event } from '@/types';

const DemoPage: React.FC = () => {
  const mockEvent: Event = {
    id: 1,
    title: 'حفل موسيقي كبير',
    artist: 'فريق الموسيقى الوطني',
    date: '2024-12-15',
    time: '8:00 PM',
    location: 'بغداد',
    venue: 'مسرح بغداد الوطني',
    imageUrl: 'https://placehold.co/400x300',
    priceFrom: 25000,
    tags: ['Featured', 'VIP']
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Ticket Zone Components Demo</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCard event={mockEvent} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DemoPage;
