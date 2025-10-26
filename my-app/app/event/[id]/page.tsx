import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Event, VenueLayout, Seat } from '@/types';
import { notFound } from 'next/navigation';
import { LocationIcon, CalendarIcon } from '@/components/Icons';
import dbConnect from '@/lib/dbConnect';
import EventModel from '@/models/Event';
import SeatMap from '@/components/SeatMap';

async function getEvent(id: string): Promise<Event | null> {
  try {
    await dbConnect();
    const event = await EventModel.findById(id);
    return event ? JSON.parse(JSON.stringify(event)) : null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  // Dummy layout data for SeatMap - replace with actual data from event if available
  const dummyVenueLayout: VenueLayout = {
    sections: [
      {
        id: 'silver-section',
        name: 'Silver',
        color: '#C0C0C0',
        rows: [
          { id: 'silver-row-1', seats: Array.from({ length: 20 }, (_, i) => ({ id: `silver-1-${i}`, label: `${i + 1}`, status: 'available', price: 50, category: 'Silver' })) },
          { id: 'silver-row-2', seats: Array.from({ length: 25 }, (_, i) => ({ id: `silver-2-${i}`, label: `${i + 1}`, status: 'available', price: 50, category: 'Silver' })) },
        ],
      },
      {
        id: 'vip-section',
        name: 'VIP',
        color: '#FFD700',
        rows: [
          { id: 'vip-row-1', seats: Array.from({ length: 15 }, (_, i) => ({ id: `vip-1-${i}`, label: `${i + 1}`, status: 'available', price: 100, category: 'VIP' })) },
          { id: 'vip-row-2', seats: Array.from({ length: 18 }, (_, i) => ({ id: `vip-2-${i}`, label: `${i + 1}`, status: 'available', price: 100, category: 'VIP' })) },
        ],
      },
      {
        id: 'platinum-l-section',
        name: 'Platinum L',
        color: '#E5E4E2',
        rows: [
          { id: 'platinum-l-row-1', seats: Array.from({ length: 12 }, (_, i) => ({ id: `platinum-l-1-${i}`, label: `${i + 1}`, status: 'available', price: 75, category: 'Platinum L' })) },
        ],
      },
      {
        id: 'platinum-r-section',
        name: 'Platinum R',
        color: '#E5E4E2',
        rows: [
          { id: 'platinum-r-row-1', seats: Array.from({ length: 12 }, (_, i) => ({ id: `platinum-r-1-${i}`, label: `${i + 1}`, status: 'available', price: 75, category: 'Platinum R' })) },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header hideHero={true} />
      <main className="flex-grow">
        <div className="bg-[#006e5f] text-white py-8 flex">
          <div className="container mx-auto px-4 flex flex-row items-center">
            <div className="lg:w-2/3 text-right lg:pr-8 mb-4 lg:mb-0">
              <p className="text-xl font-bold mb-2">الجمعة, 31 تشرين الأول</p>
              <p className="text-lg mb-4">۰۸:۳۰ مساءاً</p>
              <div className="flex items-center justify-end mb-2">
                <p className="text-base">بغداد - مجمع نخيل بغداد الترفيهي - المسرح</p>
                <LocationIcon className="w-5 h-5 text-white mr-2" />
              </div>
              <div className="flex items-center justify-end">
                <p className="text-base">بغداد - مجمع نخيل بغداد الترفيهي - المسرح</p>
                <LocationIcon className="w-5 h-5 text-white mr-2" />
              </div>
            </div>
            <div className="lg:w-1/3 flex justify-center lg:justify-start">
              <img src={event.imageUrl} alt={event.title} className="rounded-lg shadow-lg w-32 max-w-xs" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Important Notes */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-right">
              <h2 className="text-xl font-bold text-red-600 mb-4">تعليمات مهمة</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 pr-5">
                <li>ممنوع دخول أي شخص بدون تذكرة</li>
                <li>تفتح الأبواب الساعة 6:30 مساءً ويبدأ الحفل الساعة 8:30 مساءً</li>
                <li>ممنوع دخول الأطفال تحت 6 سنوات</li>
              </ul>
            </div>

            {/* Seat Map Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">اختر مقعدك</h2>
              <SeatMap layout={dummyVenueLayout} selectedSeatIds={[]} onSeatSelect={() => {}} onSeatDeselect={() => {}} />
            </div>
          </div>

          {/* Sidebar / Your Tickets */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">التذاكر الخاصة بك</h2>
              {/* This section will be dynamic based on selected tickets */}
              <div className="text-center py-8 border border-gray-200 rounded-lg">
                <p className="text-gray-500">لم يتم اختيار تذكرة</p>
                <p className="text-gray-400 text-sm mt-1">اختر المكان الذي تفضله على خريطة المكان</p>
              </div>
              <button className="w-full mt-6 bg-[#006e5f] hover:bg-[#005a4d] text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                احجز تذكرتك الآن
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}