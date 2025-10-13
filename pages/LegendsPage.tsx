
import React from 'react';
import { MOCK_LEGENDS } from '../constants';

const LegendsPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <section className="bg-brand-green text-white text-center py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">تذكرتك صارت سهلة!</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-green-dark mb-2">المباريات القادمة</h2>
            <p className="text-gray-500">لا توجد مباريات متوفرة</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-brand-green-dark mb-10">أساطير الكرة العراقية</h2>
          <div className="space-y-16">
            {MOCK_LEGENDS.map((legend, index) => (
              <div key={index}>
                <h3 className="text-3xl font-bold text-center mb-8">{legend.name}</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mb-8">
                  {legend.stats.map(stat => (
                    <div key={stat.label} className="p-4 rounded-lg">
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-3xl font-bold text-brand-green">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed text-center">{legend.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegendsPage;
