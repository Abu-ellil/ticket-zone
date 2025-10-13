export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-brand-green-dark mb-8">من نحن</h1>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            مرحبًا بكم في تذكرتك، الوجهة الرائدة لحجز التذاكر بسهولة وسرعة.
          </p>
          
          <p className="mb-4">
            نحن نسعى جاهدين لتوفير أفضل تجربة لحجز التذاكر لجميع الأحداث والفعاليات في المنطقة.
            سواء كنت تبحث عن حفلات موسيقية، عروض مسرحية، مباريات رياضية أو ورش عمل، فإن منصتنا
            تقدم لك وصولاً سهلاً إلى الأحداث المفضلة لديك.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-green-dark mt-6 mb-4">رؤيتنا</h2>
          <p className="mb-4">
            أن نكون المنصة الأولى لحجز التذاكر في المنطقة، مع التركيز على تجربة المستخدم
            والسهولة في الاستخدام.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-green-dark mt-6 mb-4">مهمتنا</h2>
          <p>
            تقديم منصة آمنة وموثوقة لحجز التذاكر، مع دعم العملاء المتميز وتجربة مستخدم سلسة.
          </p>
        </div>
      </div>
    </div>
  );
}