'use client';

import { useState } from 'react';
import { EventDetailsSchema, TicketDetails } from '@/types';

export default function AddEventPage() {
  const [formData, setFormData] = useState<EventDetailsSchema>({
    eventName: '',
    date: '',
    time: {
      eventStartTime: '',
      doorsOpenTime: '',
    },
    location: {
      venue: '',
    },
    tickets: [
      { type: 'VIP', price: 0, discount: '' },
      { type: 'Royal', price: 0, discount: '' },
      { type: 'Platinum', price: 0, discount: '' },
      { type: 'Gold', price: 0, discount: '' },
      { type: 'Silver', price: 0, discount: '' },
    ],
    currency: 'SAR', // Default currency for the entire event
    contactInfo: {
      customerServiceNumber: '',
      email: '',
    },
    imageUrl: '', // Initialize imageUrl
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement | HTMLSelectElement;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      }));
    } else if (name.startsWith('tickets[')) {
      const match = name.match(/tickets\[(\d+)\]\.(.*)/);
      if (match) {
        const index = parseInt(match[1], 10);
        const field = match[2];
        console.log('handleChange - name:', name, 'value:', value, 'index:', index, 'field:', field);
        setFormData((prev) => {
          const newTickets = [...prev.tickets];
          const oldValue = newTickets[index][field];
          newTickets[index] = {
            ...newTickets[index],
            [field]: field === 'price' ? (isNaN(parseFloat(value)) ? 0 : parseFloat(value)) : value,
          };
          console.log('handleChange - old value:', oldValue, 'new value:', newTickets[index][field]);
          console.log('handleChange - updated tickets array:', newTickets);
          return { ...prev, tickets: newTickets };
        });
      }
    } else if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/admin/events/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        // Optionally clear form or redirect
      } else {
        setMessage(data.message || 'Failed to add event');
      }
    } catch (error: any) {
      console.error('Error adding event:', error);
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">إضافة حدث جديد</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">اسم الحدث</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 text-gray-700"
              placeholder="اسم الحدث"
              required
            />
          </div>
          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">تاريخ الحدث</label>
            <input
              type="date"
              id="eventDate"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 text-gray-700"
              placeholder="تاريخ الحدث"
              required
            />
          </div>
          <div>
            <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">وقت الحدث</label>
            <input
              type="time"
              id="eventTime"
              name="time.eventStartTime"
              value={formData.time.eventStartTime}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 text-gray-700"
              placeholder="وقت بدء الحدث"
              required
            />
          </div>
          <div>
            <label htmlFor="doorsOpenTime" className="block text-sm font-medium text-gray-700">وقت فتح الأبواب</label>
            <input
              type="time"
              id="doorsOpenTime"
              name="time.doorsOpenTime"
              value={formData.time.doorsOpenTime}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 text-gray-700"
              placeholder="وقت فتح الأبواب"
              required
            />
          </div>
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700">المكان</label>
            <input
              type="text"
              id="venue"
              name="location.venue"
              value={formData.location.venue}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 text-gray-700"
              placeholder="المكان"
              required
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">العملة</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
              required
            >
              <option value="SAR">ريال سعودي (SAR)</option>
              <option value="AED">درهم إماراتي (AED)</option>
              <option value="KWD">دينار كويتي (KWD)</option>
              <option value="BHD">دينار بحريني (BHD)</option>
              <option value="QAR">ريال قطري (QAR)</option>
              <option value="OMR">ريال عماني (OMR)</option>
            </select>
          </div>

          {/* Static Ticket Fields */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">أنواع التذاكر</h2>
            {formData.tickets.map((ticket, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-md flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[150px]">
                  <label htmlFor={`ticketType-${index}`} className="block text-sm font-medium text-gray-700">نوع التذكرة</label>
                  <input
                    type="text"
                    id={`ticketType-${index}`}
                    name={`tickets[${index}].type`}
                    value={ticket.type}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                    readOnly // Make ticket type read-only as it's pre-defined
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label htmlFor={`ticketPrice-${index}`} className="block text-sm font-medium text-gray-700">سعر التذكرة</label>
                  <input
                    type="number" step="0.01"
                    id={`ticketPrice-${index}`}
                    name={`tickets[${index}].price`}
                    value={String(ticket.price)}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 text-gray-700"
                    placeholder="سعر التذكرة"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="customerServiceNumber" className="block text-sm font-medium text-gray-700">رقم خدمة العملاء</label>
            <input
              type="text"
              id="customerServiceNumber"
              name="contactInfo.customerServiceNumber"
              value={formData.contactInfo.customerServiceNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 text-gray-700"
              placeholder="رقم خدمة العملاء"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-500 text-gray-700"
              placeholder="البريد الإلكتروني"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Event Image
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {selectedImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Selected file: {selectedImage.name}</p>
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="mt-2 max-h-40 object-cover" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Event
          </button>
          {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
        </form>
      </div>
    </div>
  );
}