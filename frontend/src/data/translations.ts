export type Language = 'en' | 'hi' | 'zh' | 'ar';

export interface Translations {
  nav: {
    home: string;
    services: string;
    drivingLessons: string;
    carHire: string;
    logbook: string;
    quiz: string;
    instructors: string;
    locations: string;
    bookNow: string;
    studentLogin: string;
    trackInstructor: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    bookBtn: string;
    quizBtn: string;
  };
  logbook: {
    headerTag: string;
    headerTitle: string;
    headerSubtitle: string;
    dayHours: string;
    nightHours: string;
    instructorBonus: string;
    aiScoreTitle: string;
    downloadPdf: string;
    addEntry: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    startQuiz: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      drivingLessons: 'Driving Lessons',
      carHire: 'Test Car Hire',
      logbook: '120h Logbook',
      quiz: 'NSW Test Quiz',
      instructors: 'Instructors',
      locations: 'Locations',
      bookNow: 'Book Session',
      studentLogin: 'Student Portal',
      trackInstructor: 'Track Instructor'
    },
    hero: {
      badge: 'PREMIUM NSW DRIVING ACADEMY',
      title: 'MASTER THE ROAD WITH CONFIDENCE.',
      subtitle: 'Structured dual-control driving lessons, Service NSW test car hire, and 3-for-1 logbook credit hours in Sydney.',
      bookBtn: 'BOOK LESSON NOW',
      quizBtn: 'TAKE PRACTICE QUIZ'
    },
    logbook: {
      headerTag: 'NSW TRANSPORT LOGBOOK ASSISTANT',
      headerTitle: '120-HOUR LOGBOOK & AI READINESS ENGINE.',
      headerSubtitle: 'Track day/night driving hours, 3-for-1 instructor credits, AI test readiness score, and export official PDF logbook.',
      dayHours: 'Day Driving Hours',
      nightHours: 'Night Driving Hours',
      instructorBonus: 'Instructor 3-for-1 Bonus Credits',
      aiScoreTitle: 'AI Driving Test Readiness Assessment',
      downloadPdf: 'DOWNLOAD OFFICIAL LOGBOOK PDF',
      addEntry: 'Log New Driving Entry'
    },
    quiz: {
      title: 'NSW DKT & PRACTICAL DRIVING QUIZ',
      subtitle: 'Test your knowledge of NSW road rules, hazard perception, and speed management before your practical driving test.',
      startQuiz: 'Start NSW Quiz'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      services: 'सेवाएं',
      drivingLessons: 'ड्राइविंग पाठ',
      carHire: 'टेस्ट कार किराए पर लें',
      logbook: '120-घंटे लॉगबुक',
      quiz: 'एनएसडब्ल्यू टेस्ट क्विज़',
      instructors: 'प्रशिक्षक',
      locations: 'स्थान',
      bookNow: 'सत्र बुक करें',
      studentLogin: 'छात्र पोर्टल',
      trackInstructor: 'प्रशिक्षक ट्रैक करें'
    },
    hero: {
      badge: 'प्रीमियम एनएसडब्ल्यू ड्राइविंग अकादमी',
      title: 'आत्मविश्वास के साथ ड्राइविंग सीखें।',
      subtitle: 'सिडनी में स्ट्रक्चर्ड डुअल-कंट्रोल ड्राइविंग पाठ, सर्विस एनएसडब्ल्यू टेस्ट कार हायर, और 3-फॉर-1 लॉगबुक क्रेडिट ऑवर्स।',
      bookBtn: 'अभी पाठ बुक करें',
      quizBtn: 'अभ्यास क्विज़ दें'
    },
    logbook: {
      headerTag: 'एनएसडब्ल्यू परिवहन लॉगबुक सहायक',
      headerTitle: '120-घंटे लॉगबुक और एआई टेस्ट तैयारी इंजन।',
      headerSubtitle: 'दिन/रात के ड्राइविंग घंटे, 3-फॉर-1 प्रशिक्षक क्रेडिट, एआई टेस्ट तैयारी स्कोर ट्रैक करें और आधिकारिक पीडीएफ निर्यात करें।',
      dayHours: 'दिन के ड्राइविंग घंटे',
      nightHours: 'रात के ड्राइविंग घंटे',
      instructorBonus: 'प्रशिक्षक 3-फॉर-1 बोनस क्रेडिट',
      aiScoreTitle: 'एआई ड्राइविंग टेस्ट तत्परता मूल्यांकन',
      downloadPdf: 'आधिकारिक लॉगबुक पीडीएफ डाउनलोड करें',
      addEntry: 'नई ड्राइविंग प्रविष्टि जोड़ें'
    },
    quiz: {
      title: 'एनएसडब्ल्यू डीकेटी और व्यावहारिक ड्राइविंग क्विज़',
      subtitle: 'अपने व्यावहारिक ड्राइविंग टेस्ट से पहले एनएसडब्ल्यू सड़क नियमों और गति प्रबंधन के अपने ज्ञान का परीक्षण करें।',
      startQuiz: 'क्विज़ शुरू करें'
    }
  },
  zh: {
    nav: {
      home: '首页',
      services: '服务课程',
      drivingLessons: '驾驶课程',
      carHire: '路考租车',
      logbook: '120小时日志',
      quiz: 'NSW路考模拟测验',
      instructors: '教练团队',
      locations: '考试中心',
      bookNow: '立即预约',
      studentLogin: '学员中心',
      trackInstructor: '实时追踪教练'
    },
    hero: {
      badge: '悉尼高品质驾驶学院',
      title: '自信掌握驾驶技能，一次通过路考。',
      subtitle: '提供双控安全教练车、Service NSW考场陪考租车，以及1小时抵3小时LOGBOOK积分。',
      bookBtn: '立即预约课程',
      quizBtn: '路考理论测验'
    },
    logbook: {
      headerTag: '新州交通局 120小时日志助手',
      headerTitle: '120小时驾驶日志与AI路考准备度评估。',
      headerSubtitle: '实时统计日间/夜间驾驶时长、3倍教练积分、AI智能评分并导出官方PDF日志。',
      dayHours: '日间驾驶时长',
      nightHours: '夜间驾驶时长',
      instructorBonus: '教练3倍赠送积分',
      aiScoreTitle: 'AI路考通过率智能评估',
      downloadPdf: '导出官方PDF日志',
      addEntry: '记录新驾驶行程'
    },
    quiz: {
      title: '新州DKT与路考规则测试',
      subtitle: '在路考前测试您的交通法规知识、危险感知能力及车速控制。',
      startQuiz: '开始测试'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      drivingLessons: 'دروس القيادة',
      carHire: 'استئجار سيارة الاختبار',
      logbook: 'سجل 120 ساعة',
      quiz: 'اختبار القيادة NSW',
      instructors: 'المدربون',
      locations: 'المواقع',
      bookNow: 'احجز الآن',
      studentLogin: 'بوابة الطالب',
      trackInstructor: 'تتبع المدرب'
    },
    hero: {
      badge: 'أكاديمية القيادة المتميزة في سيدني',
      title: 'إتقان القيادة بكل ثقة وأمان.',
      subtitle: 'دروس قيادة متقدمة بسيارات مزدوجة التحكم، واستئجار سيارات لاختبار Service NSW، ورصيد ساعات مضاعف.',
      bookBtn: 'احجز درسك الآن',
      quizBtn: 'ابدأ الاختبار التجريبي'
    },
    logbook: {
      headerTag: 'مساعد سجل القيادة NSW',
      headerTitle: 'سجل 120 ساعة ومحرك الجاهزية بالذكاء الاصطناعي.',
      headerSubtitle: 'تتبع ساعات القيادة النهارية والليلية، ورصيد المدرب 3-مقابل-1، وتقرير PDF الرسمي.',
      dayHours: 'ساعات القيادة النهارية',
      nightHours: 'ساعات القيادة الليلية',
      instructorBonus: 'نقاط مكافأة المدرب 3-مقابل-1',
      aiScoreTitle: 'تقييم الجاهزية بالذكاء الاصطناعي',
      downloadPdf: 'تحميل سجل القيادة PDF',
      addEntry: 'إضافة سجل قيادة جديد'
    },
    quiz: {
      title: 'اختبار قواعد القيادة في NSW',
      subtitle: 'اختبر معرفتك بقواعد المرور والتعامل مع المخاطر قبل اختبار القيادة العملي.',
      startQuiz: 'ابدأ الاختبار'
    }
  }
};
