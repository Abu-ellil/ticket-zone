import { MOCK_LEGENDS } from '../../constants';

export default function LegendsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-brand-green-dark mb-8">الأساطير</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_LEGENDS.map((legend, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={legend.imageUrl} 
              alt={legend.name} 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-brand-green-dark mb-4">{legend.name}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {legend.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-700">{legend.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}