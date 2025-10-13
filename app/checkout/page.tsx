'use client';

import { useTickets } from '../../contexts/TicketContext';

export default function CheckoutPage() {
  const { tickets, totalPrice, clearTickets } = useTickets();

  const handleCheckout = () => {
    alert('تمت عملية الشراء بنجاح!');
    clearTickets();
    // In a real app, you would redirect to a confirmation page
    window.location.href = '/';
  };

 return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-brand-green-dark mb-8">الدفع</h1>
      
      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">لا توجد تذاكر في السلة</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">تفاصيل التذكرة</h2>
          
          <div className="space-y-4 mb-6">
            {tickets.map((ticket, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">مقعد {ticket.seatId}</p>
                  <p className="text-sm text-gray-600">القسم: {ticket.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{ticket.price} ر.س</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>الإجمالي:</span>
              <span>{totalPrice} ر.س</span>
            </div>
          </div>
          
          <button
            onClick={handleCheckout}
            className="mt-8 w-full bg-brand-green text-white py-3 rounded-lg font-bold hover:bg-brand-green-dark transition"
          >
            إتمام الشراء
          </button>
        </div>
      )}
    </div>
  );
}