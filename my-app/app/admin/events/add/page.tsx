'use client';

import { useState, useEffect } from 'react';
import { EventDetailsSchema, TicketDetails, Event } from '@/types';
import Image from 'next/image';

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
      { type: 'VIP', price: 0, currency: 'SAR', discount: '' },
      { type: 'Royal', price: 0, currency: 'SAR', discount: '' },
      { type: 'Platinum', price: 0, currency: 'SAR', discount: '' },
      { type: 'Gold', price: 0, currency: 'SAR', discount: '' },
      { type: 'Silver', price: 0, currency: 'SAR', discount: '' },
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
  const [isLoading, setIsLoading] = useState(false);
 const [events, setEvents] = useState<Event[]>([]);
 const [eventsLoading, setEventsLoading] = useState(false);
 const [editingEventId, setEditingEventId] = useState<string | null>(null);
 const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.startsWith('tickets[')) {
      const match = name.match(/tickets\[(\d+)\]\.(.*)/);
      if (match) {
        const index = parseInt(match[1], 10);
        const field = match[2];
        setFormData((prev) => {
          const newTickets = [...prev.tickets];
          newTickets[index] = {
            ...newTickets[index],
            [field]: field === 'price' ? (isNaN(parseFloat(value)) ? 0 : parseFloat(value)) : value,
          };
          return { ...prev, tickets: newTickets };
        });
        return;
      }
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      setFormData((prev) => {
        const parentValue = prev[parent as keyof EventDetailsSchema];
        
        if (typeof parentValue === 'object' && parentValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: type === 'checkbox' ? (checked as boolean) : value,
            },
          };
        }
        
        return prev;
      });
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
    setIsLoading(true); // Set loading state to true

    try {
      const formDataToSend = new FormData();
      
      // Add text fields (only those that match the Event schema)
      formDataToSend.append('eventName', formData.eventName);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('eventStartTime', formData.time.eventStartTime);
      formDataToSend.append('doorsOpenTime', formData.time.doorsOpenTime);
      formDataToSend.append('venue', formData.location.venue);
      formDataToSend.append('currency', formData.currency);
      formDataToSend.append('customerServiceNumber', formData.contactInfo?.customerServiceNumber || '');
      formDataToSend.append('email', formData.contactInfo?.email || '');
      
      // Add tickets data as JSON string
      formDataToSend.append('tickets', JSON.stringify(formData.tickets));
      
      // Add image if selected
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const res = await fetch('/api/admin/events/add', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Event added successfully!');
        // Optionally clear form or redirect
        setFormData({
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
            { type: 'VIP', price: 0, currency: 'SAR', discount: '' },
            { type: 'Royal', price: 0, currency: 'SAR', discount: '' },
            { type: 'Platinum', price: 0, currency: 'SAR', discount: '' },
            { type: 'Gold', price: 0, currency: 'SAR', discount: '' },
            { type: 'Silver', price: 0, currency: 'SAR', discount: '' },
          ],
          currency: 'SAR',
          contactInfo: {
            customerServiceNumber: '',
            email: '',
          },
          imageUrl: '',
        });
        setSelectedImage(null);
      } else {
        setMessage(data.message || 'Failed to add event');
      }
    } catch (error: unknown) {
      console.error('Error adding event:', error);
      setMessage(`An error occurred: ${(error as Error).message}`);
    } finally {
      setIsLoading(false); // Set loading state to false when request completes
    }
  };

  // Fetch events to display in the list
  const fetchEvents = async () => {
    setEventsLoading(true);
    try {
      const res = await fetch(`${window.location.origin}/api/events`);
      console.log(".........",events)
      if (res.ok) {
        const data = await res.json();
        setEvents(data.data || data); // Access the 'data' property from API response or fallback to the whole response
      } else {
        console.error('Failed to fetch events:', res.statusText);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setEventsLoading(false);
    }
  };

  // Function to update an event
  const handleUpdateEvent = async (eventId: string) => {
    const eventToUpdate = events.find(event => event._id === eventId);
    if (!eventToUpdate) return;

    try {
      const formDataToSend = new FormData();
      
      // Add text fields (only those that match the Event schema)
      formDataToSend.append('eventName', eventToUpdate.title);
      formDataToSend.append('date', eventToUpdate.date);
      formDataToSend.append('eventStartTime', eventToUpdate.time.eventStartTime);
      formDataToSend.append('doorsOpenTime', eventToUpdate.time.doorsOpenTime);
      formDataToSend.append('venue', eventToUpdate.venue);
      formDataToSend.append('currency', eventToUpdate.currency);
      formDataToSend.append('customerServiceNumber', eventToUpdate.contactInfo?.customerServiceNumber || '');
      formDataToSend.append('email', eventToUpdate.contactInfo?.email || '');
      
      // Add tickets data as JSON string
      formDataToSend.append('tickets', JSON.stringify(eventToUpdate.tickets));
      
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Event updated successfully!');
        fetchEvents(); // Refresh the events list
        setEditingEventId(null); // Close the edit form
      } else {
        setMessage(data.message || 'Failed to update event');
      }
    } catch (error: unknown) {
      console.error('Error updating event:', error);
      setMessage(`An error occurred: ${(error as Error).message}`);
    }
  };

  // Load events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);


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
                    type="number"
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
              value={formData.contactInfo?.customerServiceNumber || ''}
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
              value={formData.contactInfo?.email || ''}
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
                <Image src={URL.createObjectURL(selectedImage)} alt="Selected" width={200} height={200} className="mt-2 max-h-40 object-cover" />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Event...
              </span>
            ) : (
              'Add Event'
            )}
          </button>
          {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
        </form>
        
        {/* Events List Section */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">تعديل الحفلات</h2>
          
          {eventsLoading ? (
            <div className="flex justify-center items-center py-8">
              <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="space-y-4">
              {events.length === 0 ? (
                <p className="text-center text-gray-500">No events found</p>
              ) : (
                events?.map((event) => (
                  <div key={event._id} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-gray-600">{event.date} | {event.venue}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingEventId(editingEventId === event._id ? null : event._id)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          {editingEventId === event._id ? 'الغاء' : 'تعديل'}
                        </button>
                      </div>
                    </div>
                    {/* Edit form - only shown when this event is being edited */}
                    {editingEventId === event._id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium mb-2">Edit Event Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">تعديل الاسم</label>
                            <input
                              type="text"
                              value={event.title}
                              onChange={(e) => {
                                setEvents(prev =>
                                  prev.map(ev =>
                                    ev._id === event._id ? {...ev, title: e.target.value} : ev
                                  )
                                );
                              }}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">التاريخ</label>
                            <input
                              type="text"
                              value={event.date}
                              onChange={(e) => {
                                setEvents(prev =>
                                  prev.map(ev =>
                                    ev._id === event._id ? {...ev, date: e.target.value} : ev
                                  )
                                );
                              }}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">المكان</label>
                            <input
                              type="text"
                              value={event.venue}
                              onChange={(e) => {
                                setEvents(prev =>
                                  prev.map(ev =>
                                    ev._id === event._id ? {...ev, venue: e.target.value} : ev
                                  )
                                );
                              }}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-50 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">وقت بدء الحدث</label>
                            <input
                              type="time"
                              value={event.time.eventStartTime}
                              onChange={(e) => {
                                setEvents(prev =>
                                  prev.map(ev =>
                                    ev._id === event._id ? {...ev, time: {...ev.time, eventStartTime: e.target.value}} : ev
                                  )
                                );
                              }}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">وقت فتح الأبواب</label>
                            <input
                              type="time"
                              value={event.time.doorsOpenTime}
                              onChange={(e) => {
                                setEvents(prev =>
                                  prev.map(ev =>
                                    ev._id === event._id ? {...ev, time: {...ev.time, doorsOpenTime: e.target.value}} : ev
                                  )
                                );
                              }}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => handleUpdateEvent(event._id)}
                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            حفظ التغييرات
                          </button>
                          <button
                            onClick={() => fetchEvents()} // Reset to original data
                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-70 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            الغاء
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
