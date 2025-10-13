
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTickets } from '../contexts/TicketContext';
import { MOCK_EVENTS } from '../constants'; // Assuming event info is needed

const CheckoutPage: React.FC = () => {
  const { tickets, totalPrice, clearTickets } = useTickets();
  const navigate = useNavigate();

  // For demonstration, we'll use a static event. In a real app, this would be context-driven.
  const event = MOCK_EVENTS[0];

  React.useEffect(() => {
    if (tickets.length === 0) {
      navigate('/');
    }
  }, [tickets, navigate]);
  
  const handlePurchase = (e: React.FormEvent) => {
      e.preventDefault();
      alert('شكرا لك! تم تأكيد حجزك. سيتم إرسال التذاكر إلى هاتفك.');
      clearTickets();
      navigate('/');
  }

  return (
    <div className="bg-gray-50">
      <section className="bg-brand-green text-white text-center py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">الخطوة الأخيرة, قم بالدفع</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handlePurchase} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="font-bold text-xl mb-6">لتشاهد مخطط المكان</h2>
          
          <div className="space-y-6">
            {tickets.map((ticket, index) => (
              <div key={ticket.seatId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-brand-green">تذكرة {index + 1}</span>
                    <span className="text-sm font-semibold bg-green-100 text-green-800 px-3 py-1 rounded-full">{ticket.label}</span>
                </div>
                <div>
                  <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input type="text" id={`name-${index}`} name={`name-${index}`} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green" />
                </div>
                <div className="mt-4">
                  <label htmlFor={`phone-${index}`} className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-s-md border border-e-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+964</span>
                    <input type="tel" id={`phone-${index}`} name={`phone-${index}`} required placeholder="7XXXXXXXXX" className="w-full border-gray-300 rounded-e-md shadow-sm focus:ring-brand-green focus:border-brand-green" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-i-4">
                    <img src={event.imageUrl} alt={event.title} className="w-16 h-16 rounded-md object-cover"/>
                    <div>
                        <h3 className="font-bold">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.date} - {event.venue}</p>
                    </div>
                </div>
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>تفاصيل السعر</span>
                    <span>{tickets.length} x {tickets.length > 0 ? tickets[0].price.toLocaleString() : 0} د.ع</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <span>الكلي</span>
                    <span>{totalPrice.toLocaleString()} د.ع</span>
                </div>
            </div>
          </div>
          
          <button type="submit" className="mt-8 w-full bg-brand-green text-white py-3 rounded-lg font-bold hover:bg-brand-green-dark transition-colors duration-300">
            شراء تذكرة
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">من خلال النقر هنا, أصرح بأنني قد قرأت وفهمت الشروط والأحكام</p>
          
          <div className="mt-8 bg-amber-50 border-r-4 border-amber-400 p-4 rounded-md">
            <h4 className="font-bold">سوف تحتاج إلى هاتف محمول</h4>
            <p className="text-sm mt-1">ستحتاج إلى هاتف ذكي لمسح رمز التذكرة عند البوابة. <a href="#" className="text-brand-green font-semibold">اعرف المزيد</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
