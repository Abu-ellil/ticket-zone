import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { Event } from '@/types';
import dbConnect from '@/lib/dbConnect';
import EventModel from '@/models/Event';

export default async function Home() {
  let events: Event[] = [];
  try {
    await dbConnect();
    const eventsData = await EventModel.find({});
    events = JSON.parse(JSON.stringify(eventsData)); // Convert Mongoose documents to plain objects
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  return (
    <div className="min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">الأحداث القادمة</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
