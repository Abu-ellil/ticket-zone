
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_EVENTS, MOCK_VENUE_LAYOUT } from '../constants';
import { Seat } from '../types';
import { useTickets } from '../contexts/TicketContext';
import SeatMap from '../components/SeatMap';
import { CalendarIcon, LocationIcon, TrashIcon } from '../components/Icons';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tickets, addTicket, removeTicket, totalPrice, clearTickets } = useTickets();

  const event = useMemo(() => MOCK_EVENTS.find(e => e.id.toString() === id), [id]);

  React.useEffect(() => {
    // Clear tickets when navigating to a new event page
    clearTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSeatSelect = (seat: Seat) => {
    addTicket({ seatId: seat.id, label: `${seat.category} - ${seat.id}`, price: seat.price, category: seat.category });
  };

  const handleSeatDeselect = (seatId: string) => {
    removeTicket(seatId);
  };
  
  const handleCheckout = () => {
      if (tickets.length > 0) {
          navigate('/checkout');
      }
  }

  if (!event) {
    return <div className="text-center py-20">Event not found.</div>;
  }

  const selectedSeatIds = tickets.map(t => t.seatId);

  return (
    <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-i-4 mb-8">
                <img src={event.imageUrl} alt={event.title} className="w-20 h-20 rounded-md object-cover"/>
                <div>
                    <h1 className="text-xl font-bold">{event.title}</h1>
                    <div className="text-sm text-gray-500 mt-1 flex items-center"><CalendarIcon className="w-4 h-4 me-1"/>{event.date}, {event.time}</div>
                    <div className="text-sm text-gray-500 mt-1 flex items-center"><LocationIcon className="w-4 h-4 me-1"/>{event.location}</div>
                </div>
            </div>

            <SeatMap 
                layout={MOCK_VENUE_LAYOUT} 
                selectedSeatIds={selectedSeatIds}
                onSeatSelect={handleSeatSelect}
                onSeatDeselect={handleSeatDeselect}
            />

            <div className="bg-white p-4 rounded-lg shadow-sm mt-8">
                <h2 className="font-bold text-lg mb-4">التذاكر الخاصة بك</h2>
                <div className="space-y-3">
                    {tickets.length > 0 ? tickets.map(ticket => (
                        <div key={ticket.seatId} className="flex justify-between items-center text-sm border-b pb-2">
                            <div>
                                <p className="font-semibold">{ticket.label}</p>
                                <p className="text-gray-500">{ticket.category}</p>
                            </div>
                            <div className="flex items-center space-i-4">
                                <p className="font-semibold">{ticket.price.toLocaleString()} د.ع</p>
                                <button onClick={() => removeTicket(ticket.seatId)} className="text-red-500 hover:text-red-700">
                                    <TrashIcon/>
                                </button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-500 text-center py-4">الرجاء اختيار مقعد من الخارطة</p>
                    )}
                </div>

                <div className="mt-6 flex justify-between items-center text-xl font-bold border-t pt-4">
                    <span>الكلي</span>
                    <span>{totalPrice.toLocaleString()} د.ع</span>
                </div>
                
                <button
                    onClick={handleCheckout}
                    disabled={tickets.length === 0}
                    className="mt-6 w-full bg-brand-green text-white py-3 rounded-lg font-bold hover:bg-brand-green-dark transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    الدفع
                </button>
            </div>
        </div>
    </div>
  );
};

export default EventDetailPage;
