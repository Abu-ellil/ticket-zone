'use client';

import { useParams } from 'next/navigation';
import { MOCK_EVENTS } from '../../../../constants';
import { useState } from 'react';
import SeatMap from '../../../components/SeatMap';
import { useTickets } from '../../../../contexts/TicketContext';
import { MOCK_VENUE_LAYOUT } from '../../../../constants';

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const event = MOCK_EVENTS.find(e => e.id === parseInt(eventId));
  const { addTicket, removeTicket, tickets } = useTickets();
  
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  if (!event) {
    return <div className="container mx-auto px-4 py-8">Event not found</div>;
  }

  const handleSeatSelect = (seat: { id: string; price: number }) => {
    if (selectedSeatIds.includes(seat.id)) {
      // Remove seat
      setSelectedSeatIds(selectedSeatIds.filter(id => id !== seat.id));
      removeTicket(seat.id);
    } else {
      // Add seat
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
      addTicket({ seatId: seat.id, eventId: event.id.toString(), price: seat.price, category: 'Seat' });
    }
  };

  const handleSeatDeselect = (seatId: string) => {
    setSelectedSeatIds(selectedSeatIds.filter(id => id !== seatId));
    removeTicket(seatId);
  };

  // Calculate total price
  const selectedSeats = MOCK_VENUE_LAYOUT.sections.flatMap(section =>
    section.rows.flatMap(row => row.seats)
  ).filter(seat => selectedSeatIds.includes(seat.id));
  
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <h1 className="text-3xl font-bold text-brand-green-dark mb-4">{event.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">المكان</h3>
                <p className="text-gray-600">{event.location}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">التاريخ والوقت</h3>
                <p className="text-gray-600">{event.date} - {event.time}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">السعر</h3>
                <p className="text-gray-600">{event.priceFrom ? `${event.priceFrom} ر.س` : 'غير محدد'}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700">الفنان</h3>
                <p className="text-gray-600">{event.artist}</p>
              </div>
            </div>
              
              <div>
                <h2 className="text-xl font-bold text-brand-green-dark mb-4">خريطة المقاعد</h2>
                <SeatMap
                  layout={MOCK_VENUE_LAYOUT}
                  selectedSeatIds={selectedSeatIds}
                  onSeatSelect={handleSeatSelect}
                  onSeatDeselect={handleSeatDeselect}
                />
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">المقاعد المحددة:</h3>
                  {selectedSeatIds.length > 0 ? (
                    <ul>
                      {selectedSeats.map(seat => (
                        <li key={seat.id} className="flex justify-between">
                          <span>مقعد {seat.label} - {seat.category}</span>
                          <button
                            onClick={() => handleSeatDeselect(seat.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            إزالة
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>لا توجد مقاعد محددة</p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="flex justify-between font-bold text-lg">
                      <span>الإجمالي:</span>
                      <span>{totalPrice} ر.س</span>
                    </div>
                  </div>
                  
                  <button
                    className="mt-4 w-full bg-brand-green text-white py-3 rounded-lg font-bold hover:bg-brand-green-dark transition"
                    onClick={() => {
                      // Navigate to checkout page
                      window.location.href = '/checkout';
                    }}
                  >
                    المتابعة للدفع
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }