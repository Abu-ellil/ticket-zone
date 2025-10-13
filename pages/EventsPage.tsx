
import React from 'react';
import { MOCK_EVENTS } from '../constants';
import EventCard from '../components/EventCard';

const EventsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-brand-green text-white text-center py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">الأحداث القادمة</h1>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {MOCK_EVENTS.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
