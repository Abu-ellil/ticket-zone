'use client';

import { MOCK_EVENTS } from '../../constants';
import EventCard from '../../components/EventCard';

export default function EventsPage() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-brand-green-dark mb-10">جميع الأحداث</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_EVENTS.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}