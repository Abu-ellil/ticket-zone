import { MOCK_EVENTS } from '../constants';
import EventCard from '../components/EventCard';

export default function HomePage() {
  return (
    <div>
      <section className="bg-brand-green text-white text-center py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">تذكرتك صارت سهلة!</h1>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-green-dark mb-10">الورش القادمة</h2>
          <div className="text-center text-gray-500">
            <p>لا توجد ورش متوفرة, ترقبوا قريباً</p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brand-green-dark mb-10">أبرز الأحداث</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_EVENTS.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}