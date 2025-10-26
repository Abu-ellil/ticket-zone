import React from 'react';
import { VenueLayout, Seat } from '../types';

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
    if (selectedSeatIds.includes(seat.id)) return 'bg-[#006e5f]';
    return 'bg-gray-300 hover:bg-gray-400';
  };
  
  return (
    <div className="bg-white p-4 rounded-lg overflow-x-auto shadow-md">
        <div className="w-full flex flex-col items-center space-y-6">
            <div className="bg-gray-200 w-1/2 h-8 rounded-b-full flex items-center justify-center text-sm text-gray-600 font-semibold">
                المسرح
            </div>
            
            <div className="w-full flex justify-center">
                <div className="bg-gray-200 rounded-full px-8 py-2 text-center text-gray-600 font-semibold">
                    Silver
                </div>
            </div>
            
            <div className="w-full flex justify-center">
                <div className="bg-gray-200 rounded-full px-8 py-2 text-center text-gray-600 font-semibold">
                    VIP
                </div>
            </div>
            
            <div className="flex justify-center w-full">
                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                    <div className="text-center">
                        <div className="bg-gray-200 rounded-lg p-2 mb-2">Platform I</div>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-200 rounded-lg p-2 mb-2">VIP</div>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-200 rounded-lg p-2 mb-2">Platform II</div>
                    </div>
                </div>
            </div>
            
            <div className="w-full flex justify-center mt-8">
                <div className="flex items-center space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="bg-gray-200 rounded-lg px-4 py-2">
                        المسرح
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                </div>
            </div>
            
            <div className="flex justify-center space-x-4 pt-4 text-xs">
                 <div className="flex items-center"><span className="w-4 h-4 bg-gray-300 rounded-full me-2"></span> متاح</div>
                 <div className="flex items-center"><span className="w-4 h-4 bg-[#006e5f] rounded-full me-2"></span> مختار</div>
                 <div className="flex items-center"><span className="w-4 h-4 bg-gray-400 rounded-full me-2"></span> محجوز</div>
             </div>
        </div>
    </div>
  );
};

export default SeatMap;
