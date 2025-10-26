'use client';

import React from 'react';
import Link from 'next/link';
import { Event } from '../types';
import { LocationIcon, CalendarIcon } from './Icons';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isSoldOut = event.tags?.includes('Sold Out');

  return (
    <Link href={`/event/${event._id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-4">
      <div className="relative">
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
        {event.tags && (
          <div className="absolute top-2 right-2 flex space-x-2">
            {event.tags.map(tag => (
              <span key={tag} className={`px-2 py-1 text-xs font-bold text-white rounded-md ${isSoldOut ? 'bg-red-500' : 'bg-black/50'}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-md font-bold text-lg transform rotate-45">نفذت التذاكر</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#006e5f]">{event.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{event.artist}</p>
        <div className="mt-4 text-sm space-y-2">
          <div className="flex items-start">
            <CalendarIcon className="w-4 h-4 text-gray-400 mt-1 me-2 flex-shrink-0" />
            <span>{event.date} - {event.time}</span>
          </div>
          <div className="flex items-start">
            <LocationIcon className="w-4 h-4 text-gray-400 mt-1 me-2 flex-shrink-0" />
            <span>{event.location} - {event.venue}</span>
          </div>
        </div>
        {event.tickets && event.tickets.length > 0 ? (
          <div className="mt-4 text-left">
            <span className="text-sm text-gray-500">تبدأ من</span>
            <p className="text-lg font-bold text-[#006e5f]">
              د.ع {Math.min(...event.tickets.map(ticket => ticket.price)).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="mt-4 text-left">
            <p className="text-lg font-bold text-gray-500">لا توجد تذاكر متاحة</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default EventCard;
