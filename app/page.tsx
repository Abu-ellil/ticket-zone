import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { Event } from '@/types';

export default async function Home() {
  let events: Event[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await res.json();
    events = data.data;
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  return (
    <div className="min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">الأحداث القادمة</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
