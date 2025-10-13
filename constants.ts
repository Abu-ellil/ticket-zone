
import { Event, VenueLayout, Legend } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'حفل الفنان محمد فؤاد',
    artist: 'محمد فؤاد',
    date: 'الخميس, 16 تشرين الأول',
    time: '٠٨:٠٠ مساءاً',
    location: 'بغداد - مجمع النخيل الترفيهي',
    venue: 'المسرح',
    imageUrl: 'https://picsum.photos/seed/event1/400/300',
    tags: ['1D:10H'],
  },
  {
    id: 2,
    title: 'حفل الفنان محمد عبد الجبار - الليلة الثانية',
    artist: 'محمد عبد الجبار',
    date: 'الخميس, 30 تشرين الأول',
    time: '١٠:٣٠ مساءاً',
    location: 'بغداد - مجمع النخيل الترفيهي',
    venue: 'المسرح',
    imageUrl: 'https://picsum.photos/seed/event2/400/300',
    tags: ['Sold Out'],
  },
  {
    id: 3,
    title: 'حفلة الفرقة الوطنية للبات الموسيقي',
    artist: 'الفرقة الوطنية',
    date: 'الجمعة, 30 تشرين الأول',
    time: '٠٩:٠٠ مساءاً',
    location: 'بغداد - مسرح بغداد',
    venue: 'المسرح',
    imageUrl: 'https://picsum.photos/seed/event3/400/300',
  },
  {
    id: 4,
    title: 'Yanni In Concert',
    artist: 'Yanni',
    date: 'السبت, 11 تشرين الأول',
    time: '٠٨:٠٠ مساءاً',
    location: 'بغداد',
    venue: 'المسرح',
    imageUrl: 'https://picsum.photos/seed/event4/400/300',
    priceFrom: 120000,
  },
  {
    id: 5,
    title: 'ورشة Collage Cake',
    artist: 'ورشة',
    date: 'الجمعة, 26 تشرين الأول',
    time: '٠٤:٠٠ مساءاً',
    location: 'بغداد - شارع البانزين خانة',
    venue: 'ريان كيك',
    imageUrl: 'https://picsum.photos/seed/event5/400/300',
    priceFrom: 20000,
  },
];

export const MOCK_VENUE_LAYOUT: VenueLayout = {
  sections: [
    {
      id: 'platinum',
      name: 'Platinum',
      color: '#e5e7eb',
      rows: Array.from({ length: 5 }).map((_, r) => ({
        id: `P-R${r + 1}`,
        seats: Array.from({ length: 15 }).map((_, s) => ({
          id: `P-R${r + 1}-S${s + 1}`,
          label: `${s + 1}`,
          status: Math.random() > 0.8 ? 'taken' : 'available',
          price: 250000,
          category: 'Platinum',
        })),
      })),
    },
    {
      id: 'vip',
      name: 'VIP',
      color: '#fecaca',
      rows: Array.from({ length: 4 }).map((_, r) => ({
        id: `V-R${r + 1}`,
        seats: Array.from({ length: 20 }).map((_, s) => ({
          id: `V-R${r + 1}-S${s + 1}`,
          label: `${s + 1}`,
          status: Math.random() > 0.7 ? 'taken' : 'available',
          price: 160000,
          category: 'VIP',
        })),
      })),
    },
    {
      id: 'silver',
      name: 'Silver',
      color: '#bfdbfe',
      rows: Array.from({ length: 6 }).map((_, r) => ({
        id: `S-R${r + 1}`,
        seats: Array.from({ length: 25 }).map((_, s) => ({
          id: `S-R${r + 1}-S${s + 1}`,
          label: `${s + 1}`,
          status: Math.random() > 0.6 ? 'taken' : 'available',
          price: 100000,
          category: 'Silver',
        })),
      })),
    },
  ],
};


export const MOCK_LEGENDS: Legend[] = [
    {
        name: "احمد راضي",
        imageUrl: "https://picsum.photos/seed/radhi/200/200",
        stats: [
            { label: "عدد الأهداف", value: 23 },
            { label: "عدد المباريات", value: 31 },
            { label: "الموقع", value: "مهاجم" },
            { label: "الطول", value: 186 },
            { label: "الميلاد", value: 1964 },
        ],
        bio: "هو من أبرز لاعبي العصر الذهبي للكرة العراقية. اشتهر بتسجيله الهدف الوحيد للعراق أمام بلجيكا في نهائيات كأس العالم 1986. توج اللاعب في نفس عام 1988... بعد تقاعده أصبح راضي مدرباً وترأس نادي الزوراء لكرة القدم. حاز على عدد من الألقاب والأوسمة في مسيرة رياضية حافلة بالإنجازات.",
    },
    {
        name: "عدنان درجال",
        imageUrl: "https://picsum.photos/seed/dirjal/200/200",
        stats: [
            { label: "الموقع", value: "مدافع" },
            { label: "الطول", value: 190 },
            { label: "الميلاد", value: 1960 },
        ],
        bio: "لاعب كرة قدم ومدرب عراقي, ورئيس الاتحاد العراقي لكرة القدم, ووزير الشباب والرياضة ووزير الثقافة السابق, وعضو الإتحاد الأسيوي. عميد غير معترف به دولياً أيضاً. يلقبه صاحب الأرقام الوكان كلاعب والجنرال كمدرب. وهو صاحب الأرقام القياسية في عدد المشاركات... حيث أنه أكثر من شارك في الألعاب الأولمبية وجميع المباريات العشرة التي خاضها منتخب العراق في الدورات الخمس التي تأهل لها, وهو كذلك أكثر لاعب عراقي اشترك في دورات الخليج... حاز على عدد من الألقاب والأوسمة في مسيرة رياضية حافلة بالإنجازات.",
    }
]
