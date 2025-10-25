
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
    if (selectedSeatIds.includes(seat.id)) return 'bg-[#005950]';
    return 'bg-white border border-gray-300 hover:bg-gray-100';
  };
  
  return (
    <div className="bg-white p-4 rounded-lg overflow-x-auto">
        <div className="w-full flex flex-col items-center space-y-6">
            <div className="bg-gray-300 w-1/2 h-8 rounded-b-full flex items-center justify-center text-sm text-gray-600 font-semibold">
                المسرح
            </div>
            
            <div className="w-full max-w-md">
                {/* Silver Section */}
                <div className="mb-8">
                    <h4 className="text-center font-bold mb-2 text-gray-500">Silver</h4>
                    <div className="bg-gray-200 h-16 rounded-t-full flex items-center justify-center">
                    </div>
                </div>
                
                {/* VIP Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <div className="w-1/3 h-px bg-gray-300"></div>
                        <h4 className="text-center font-bold text-gray-500">VIP</h4>
                        <div className="w-1/3 h-px bg-gray-300"></div>
                    </div>
                    <div className="bg-gray-100 h-12 rounded-lg flex items-center justify-center">
                    </div>
                </div>
                
                {/* Platform Sections */}
                <div className="flex justify-between mb-8">
                    <div className="w-[45%]">
                        <h4 className="text-center font-bold mb-2 text-gray-500">Platform I</h4>
                        <div className="bg-gray-200 h-16 rounded-lg"></div>
                    </div>
                    <div className="w-[45%]">
                        <h4 className="text-center font-bold mb-2 text-gray-500">Platform II</h4>
                        <div className="bg-gray-200 h-16 rounded-lg"></div>
                    </div>
                </div>
                
                {/* Stage */}
                <div className="flex justify-center items-center mb-4">
                    <div className="w-1/3 h-px bg-gray-300"></div>
                    <div className="mx-4 bg-gray-200 px-6 py-2 rounded-lg text-sm text-gray-600 font-semibold">
                        المسرح
                    </div>
                    <div className="w-1/3 h-px bg-gray-300"></div>
                </div>
            </div>
            
            <div className="flex justify-center space-x-4 pt-4 text-xs">
                <div className="flex items-center"><span className="w-4 h-4 bg-white border border-gray-300 rounded-full ml-2"></span> متاح</div>
                <div className="flex items-center"><span className="w-4 h-4 bg-[#005950] rounded-full ml-2"></span> مختار</div>
                <div className="flex items-center"><span className="w-4 h-4 bg-gray-400 rounded-full ml-2"></span> محجوز</div>
            </div>
        </div>
    </div>
  );
};

export default SeatMap;
