
import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <section className="bg-brand-green text-white text-center py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">سياسة الخصوصية</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="prose prose-lg text-right max-w-none text-gray-700">
            <h2 className="text-brand-green-dark">مقدمة</h2>
            <p>
              في تكت زون، نحن ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيف نجمع معلوماتك الشخصية ونستخدمها ونكشف عنها عند استخدامك لخدماتنا. من خلال الوصول إلى خدماتنا أو استخدامها، فإنك توافق على جمع معلوماتك الشخصية واستخدامها والكشف عنها كما هو موضح في سياسة الخصوصية هذه.
            </p>
            
            <ol className="list-decimal space-y-4 ps-8">
              <li>
                <h3 className="font-bold text-lg">المعلومات التي نجمعها:</h3>
                <p>قد نجمع معلومات شخصية، مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وتفاصيل الدفع، عندما تستخدم خدماتنا. نقوم أيضًا بجمع معلومات غير شخصية، مثل عنوان IP الخاص بك ومعلومات الجهاز، لأغراض التحليل والأمان.</p>
              </li>
              <li>
                <h3 className="font-bold text-lg">استخدام المعلومات:</h3>
                <p>نستخدم معلوماتك الشخصية لتسهيل شراء التذاكر وتوفير دعم العملاء، وتحسين خدماتنا، والتواصل معك بشأن حسابك والأحداث القادمة. قد نستخدم معلوماتك أيضًا لأغراض تسويقية، ولكن يمكنك إلغاء الاشتراك في تلقي الاتصالات الترويجية.</p>
              </li>
              <li>
                <h3 className="font-bold text-lg">إفشاء المعلومات:</h3>
                <p>قد نشارك معلوماتك الشخصية مع أطراف ثالثة موثوق بها، مثل معالجي الدفع ومقدمي الخدمات، لتسهيل خدماتنا. قد نكشف أيضًا عن معلوماتك للامتثال للالتزامات القانونية أو لحماية حقوقنا ومصالحنا.</p>
              </li>
              <li>
                <h3 className="font-bold text-lg">أمن البيانات:</h3>
                <p>نتخذ تدابير معقولة لحماية معلوماتك الشخصية من الوصول أو الكشف أو التغيير غير المصرح به. ومع ذلك، لا يتم نقل البيانات عبر الإنترنت بشكل آمن تمامًا.</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
