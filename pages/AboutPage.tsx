
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <section className="bg-brand-green text-white text-center py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">من نحن</h1>
          <p className="mt-2 text-lg">نحن نربط الناس بتجارب فعاليات ملهمة</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <img src="https://picsum.photos/seed/ticket/300/200" alt="Ticket Zone ticket" className="mx-auto rounded-lg shadow-lg"/>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-green-dark mb-4">من نحن</h2>
            <p className="text-gray-700 leading-relaxed">
              كجزء من المسؤولية المجتمعية، ترعى مجموعة كي بدعم الرياضة في العراق، وتؤمن بأهمية دعم الأنشطة الرياضية وتنمية المواهب في هذا القطاع المهم والحيوي. نحن مؤمنين بأن هذه الخطوات ستعود بالنفع على الرياضة العراقية في المحافل الدولية. لقد أطلقنا تكت زون، وهو مشروع يهدف إلى ربط الجماهير بالفعاليات الرياضية في العراق وجعلهم أكثر تفاعلاً مع الأحداث الرياضية المحلية، بالإضافة إلى إضفاء طابع رسمي وقانوني على عملية بيع وشراء التذاكر.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              عملت ديجيتال زون (إحدى شركات مجموعة كي) على تطوير هذه المنصة لتكون حلقة وصل بين منظمي الفعاليات والجماهير العاشقة للرياضة، وتسهيل عملية شراء التذاكر. وبعد نجاح هذا المشروع، نطمح إلى توسيع نطاق عملنا ليشمل مجالات أخرى.
            </p>
          </div>
          
          <div className="text-center my-16">
            <h2 className="text-3xl font-bold text-brand-green-dark mb-8">شركاؤنا</h2>
            <div className="space-y-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                        <img src="https://picsum.photos/seed/ifa/150/150" alt="Iraqi Football Association" className="rounded-full shadow-md"/>
                    </div>
                    <div className="text-right">
                        <h3 className="text-2xl font-bold mb-2">الاتحاد العراقي لكرة القدم</h3>
                        <p className="text-gray-600">الاتحاد العراقي لكرة القدم هو الهيئة المسؤولة عن كرة القدم في العراق، وهو عضو في الاتحاد الآسيوي لكرة القدم. تأسس عام 1948 وانضم إلى الفيفا عام 1950.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                        <img src="https://picsum.photos/seed/moys/150/150" alt="Ministry of Youth and Sports" className="rounded-full shadow-md"/>
                    </div>
                    <div className="text-right">
                        <h3 className="text-2xl font-bold mb-2">وزارة الشباب و الرياضة</h3>
                        <p className="text-gray-600">وزارة الشباب والرياضة هي الوزارة المسؤولة عن رعاية الشباب والرياضة في العراق، وتهدف إلى تمكين الشباب وتطوير مهاراتهم وقدراتهم للمساهمة في بناء مستقبل أفضل للبلاد.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
