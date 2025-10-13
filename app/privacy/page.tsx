export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-brand-green-dark mb-8">سياسة الخصوصية</h1>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="prose max-w-none">
          <p className="mb-4">
            في تذكرتك، نحن ملتزمون بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيف نجمع
            ونستخدم ونحمي المعلومات الشخصية التي نتلقاها من مستخدمينا.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-green-dark mt-6 mb-4">المعلومات التي نجمعها</h2>
          <p className="mb-4">
            نحن نجمع المعلومات التي تقدمها لنا بشكل مباشر، مثل المعلومات التي تدخلها
            عند إنشاء حسابك أو إتمام عملية شراء.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-green-dark mt-6 mb-4">كيف نستخدم معلوماتك</h2>
          <p className="mb-4">
            نستخدم المعلومات لتقديم وتحسين خدماتنا، ومعالجة عمليات الشراء،
            وتخصيص تجربة المستخدم، وتقديم الدعم اللازم.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-green-dark mt-6 mb-4">مشاركة المعلومات</h2>
          <p>
            لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. نحن نشارك معلوماتك فقط
            كما هو مطلوب بموجب القانون أو لحماية حقوقنا وحقوق الآخرين.
          </p>
        </div>
      </div>
    </div>
  );
}