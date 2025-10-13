export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-brand-green-dark mb-8">الشروط والأحكام</h1>
      
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="prose max-w-none">
          <p className="mb-4">
            يُرجى قراءة الشروط والأحكام التالية بعناية قبل استخدام تذكرتك.
            باستخدام هذا الموقع، فإنك توافق على الالتزام بهذه الشروط.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-green-dark mt-6 mb-4">الاستخدام المقبول</h2>
          <p className="mb-4">
            يُمنع استخدام الموقع لأي أغراض غير قانونية أو مخالفة للأنظمة.
            يجب أن تستخدم الموقع بطريقة لا تؤثر سلبًا على أدائه أو توفره.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-green-dark mt-6 mb-4">حقوق الملكية</h2>
          <p className="mb-4">
            جميع المحتويات على هذا الموقع، بما في ذلك النصوص والgraphics والشعارات،
            هي ملكية حصرية ل تذكرتك أو مزودي المحتوى المرخصين.
          </p>
          
          <h2 className="text-2xl font-bold text-brand-green-dark mt-6 mb-4">التغييرات في الخدمة</h2>
          <p>
            نحتفظ بالحق في تعديل أو إيقاف الخدمة في أي وقت. نحن لسنا مسؤولين تجاهك
            أو أي طرف ثالث عن أي تعديل أو تعليق أو إيقاف للخدمة.
          </p>
        </div>
      </div>
    </div>
  );
}