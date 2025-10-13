
import React from 'react';
import { VenueLayout, Seat } from '../types';
import { useTickets } from '../contexts/TicketContext';

interface SeatMapProps {
  layout: VenueLayout;
  selectedSeatIds: string[];
  onSeatSelect: (seat: Seat) => void;
  onSeatDeselect: (seatId: string) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ layout, selectedSeatIds, onSeatSelect, onSeatDeselect }) => {
    
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'taken') return;
    if (selectedSeatIds.includes(seat.id)) {
      onSeatDeselect(seat.id);
    } else {
      onSeatSelect(seat);
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.status === 'taken') return 'bg-gray-400 cursor-not-allowed';
    if (selectedSeatIds.includes(seat.id)) return 'bg-purple-600';
    return 'bg-pink-400 hover:bg-pink-500';
  };
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
        <div className="w-full min-w-[800px] flex flex-col items-center space-y-6">
            <div className="bg-gray-300 w-1/2 h-8 rounded-b-full flex items-center justify-center text-sm text-gray-600 font-semibold">
                المسرح
            </div>
            
            {layout.sections.map(section => (
                <div key={section.id} className="w-full">
                    <h4 className="text-center font-bold mb-2">{section.name}</h4>
                    <div className="flex flex-col items-center space-y-2">
                        {section.rows.map(row => (
                            <div key={row.id} className="flex justify-center space-i-1">
                                {row.seats.map(seat => (
                                    <button
                                        key={seat.id}
                                        onClick={() => handleSeatClick(seat)}
                                        className={`w-5 h-5 rounded-full transition-colors duration-200 ${getSeatColor(seat)}`}
                                        aria-label={`Seat ${seat.label}`}
                                        disabled={seat.status === 'taken'}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
             <div className="flex justify-center space-i-4 pt-4 text-xs">
                <div className="flex items-center"><span className="w-4 h-4 bg-pink-400 rounded-full me-2"></span> متاح</div>
                <div className="flex items-center"><span className="w-4 h-4 bg-purple-600 rounded-full me-2"></span> مختار</div>
                <div className="flex items-center"><span className="w-4 h-4 bg-gray-400 rounded-full me-2"></span> محجوز</div>
            </div>
        </div>
    </div>
  );
};

export default SeatMap;
