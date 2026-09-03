import { 
  ServiceItem, 
  BenefitItem, 
  AudienceItem, 
  TestimonialItem, 
  LocationItem, 
  FAQItem, 
  BlogArticle 
} from '../types';

import siteConfig from '../config/siteConfig';

export const BRAND_INFO = {
  name: 'DRIVINITY',
  subName: 'DRIVING ACADEMY',
  fullName: 'Drivinity Driving Academy',
  legalName: 'Drivinity Platform',
  tagline: 'Get your Australian driver\'s licence with confidence.',
  phonePlaceholder: '1300 855 374',
  emailPlaceholder: 'contact@drivinity.com',
  hoursPlaceholder: 'Mon – Sun: 7:00 AM – 7:00 PM',
  serviceArea: 'Greater Sydney & Surrounding NSW Service Centres',
  instructorPlaceholder: {
    name: 'Accredited Senior Instructor',
    qualification: 'Certified Driving Instructor',
    experienceYears: '10+ Years Road Safety Experience',
    bio: 'Dedicated to empowering learner drivers, nervous students, and overseas licence converters with patient, calm, and test-route mastered instruction.'
  },
  vehiclePlaceholder: {
    model: 'Modern Dual-Control Training Vehicle',
    transmission: 'Automatic Transmission',
    safety: '5-Star ANCAP Safety Rating, Dual Controls, Reversing Camera, Blind-spot Assist',
    hygiene: 'Climate controlled, smoke-free, sanitized before every session'
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'driving-lessons',
    number: '01',
    title: 'DRIVING LESSONS',
    shortDesc: 'Personalised 1-on-1 driving lessons for beginners, experienced overseas drivers, and learners preparing for their practical test.',
    badge: 'Car available',
    slug: '/driving-lessons',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Structured 1-on-1 personalized coaching',
      'Dual-control modern automatic car',
      'NSW road rules & defensive driving skills',
      'Pick-up & drop-off options available',
      '3-for-1 NSW logbook bonus hours'
    ],
    pricePlaceholder: '$XX / session',
    idealFor: 'Beginners, international licence conversions, and test refreshers'
  },
  {
    id: 'car-hire',
    number: '02',
    title: 'CAR HIRE',
    shortDesc: 'Reliable, test-ready vehicle hire for students who need a fully compliant, dual-control car for their practical driving test.',
    badge: 'Test-day vehicle',
    slug: '/car-hire',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Service NSW test-ready dual-control vehicle',
      'Instructor accompanying at test centre',
      'Comprehensive insurance coverage included',
      'Pre-test vehicle orientation',
      'Pick-up & drop-off for test session'
    ],
    pricePlaceholder: '$XX / test session',
    idealFor: 'Learners taking their practical test without a suitable car'
  },
  {
    id: 'lesson-and-car',
    number: '03',
    title: 'LESSON + CAR PACKAGE',
    shortDesc: 'The ultimate test-day package: a 45-60 minute warm-up lesson right before your test plus dual-control vehicle hire for the exam.',
    badge: 'Most Popular',
    slug: '/lesson-and-car',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      '45-60 min pre-test warmup session',
      'Warm-up on actual test routes',
      'Dual-control vehicle hire for the test',
      'Instructor support at Service NSW desk',
      'Full insurance & test day peace of mind'
    ],
    pricePlaceholder: '$XX total package',
    idealFor: 'Students wanting maximum confidence on test day'
  }
];

export const WHY_CHOOSE_US = [
  {
    iconName: 'ShieldCheck',
    title: 'PERSONALISED TRAINING',
    description: 'Tailored instruction structured around your current skill level, pace, and specific driving goals.'
  },
  {
    iconName: 'Award',
    title: 'TEST-FOCUSED LESSONS',
    description: 'We practice on real Service NSW test routes, mastering exact examiner scoring and marking criteria.'
  },
  {
    iconName: 'Car',
    title: 'MODERN VEHICLES',
    description: 'Compact, 5-star ANCAP safety rated automatic training cars equipped with certified dual controls.'
  },
  {
    iconName: 'Sparkles',
    title: 'CONFIDENCE FIRST',
    description: 'Calm, patient, and stress-free environment with zero shouting or pressure to build genuine road instincts.'
  }
];

export const WHY_DRIVINITY = WHY_CHOOSE_US;

export const LEARNING_AREAS = [
  {
    title: 'Vehicle Setup & Cabin Ergonomics',
    desc: 'Seat, mirror adjustments, blind spot awareness, and dual-control familiarization.'
  },
  {
    title: 'Steering & Precision Throttle Control',
    desc: 'Smooth progressive braking, hand-over-hand steering, and low-speed vehicle control.'
  },
  {
    title: 'Roundabouts & Intersections',
    desc: 'Navigating Sydney multi-lane roundabouts, giving way rules, and judging gaps safely.'
  },
  {
    title: 'Reverse Parallel & Angle Parking',
    desc: 'Repeatable reference points for flawless parallel, 90-degree, and kerbside parking.'
  },
  {
    title: 'Speed Zones & Hazard Anticipation',
    desc: 'Observing 40 km/h school zones, scanning ahead, and 3-second crash avoidance space.'
  }
];

export const AUDIENCE_TYPES: AudienceItem[] = [
  {
    id: 'beginners',
    title: 'BEGINNER DRIVERS',
    tag: 'Starting from scratch',
    description: 'For learners getting behind the wheel for the very first time. We start in quiet residential streets and progressively build road instincts.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    focusPoints: ['Pedal sensitivity & steering control', 'NSW logbook 3-for-1 bonus hours', 'Basic maneuvers & parking mastery'],
    link: '/driving-lessons'
  },
  {
    id: 'international',
    title: 'INTERNATIONAL DRIVERS',
    tag: 'Overseas licence conversion',
    description: 'For experienced drivers adapting to Australian road rules, driving on the left side, complex Sydney roundabouts, and practical test criteria.',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    focusPoints: ['Eliminating old habits that fail tests', 'Sydney multi-lane roundabouts & school zones', 'Understanding Service NSW test scoring'],
    link: '/driving-lessons'
  },
  {
    id: 'anxious',
    title: 'NERVOUS & ANXIOUS DRIVERS',
    tag: 'Confidence rebuilding',
    description: 'For people who feel stressed about traffic, previous test setbacks, or busy highways. We provide calm, reassuring, and systematic practice.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
    focusPoints: ['Step-by-step low-stress progression', 'Breathing & test-day anxiety management', 'Safe defensive decision making'],
    link: '/driving-lessons'
  }
];

export const PLACEHOLDER_REVIEWS: TestimonialItem[] = [
  {
    id: 'rev-01',
    studentName: 'Lucas M.',
    locationTag: 'Service NSW Test Centre',
    rating: 5,
    serviceType: 'Lesson + Car Package',
    reviewText: 'The lessons changed the way I drive. Passed my practical driving test on the first attempt thanks to the warm-up route practice!',
    passStatus: 'Passed 1st Go',
    date: 'Recent Graduate'
  },
  {
    id: 'rev-02',
    studentName: 'Ana Clara S.',
    locationTag: 'Overseas Conversion',
    rating: 5,
    serviceType: 'Driving Lesson',
    reviewText: 'Converting my international licence was so easy with Drivinity. Clear explanations on roundabouts, blind spots, and NSW road rules.',
    passStatus: 'Licence Converted',
    date: 'Recent Graduate'
  },
  {
    id: 'rev-03',
    studentName: 'Michael K.',
    locationTag: 'Botany Test Centre',
    rating: 5,
    serviceType: 'Driving Lesson',
    reviewText: 'My instructor was incredibly patient and knew every single trick of the test routes. Highly recommend to anyone nervous about their test.',
    passStatus: 'Passed 1st Go',
    date: 'Recent Graduate'
  },
  {
    id: 'rev-04',
    studentName: 'Chloe W.',
    locationTag: 'Test Day Car Hire',
    rating: 5,
    serviceType: 'Car Hire for Test',
    reviewText: 'Hiring the dual-control car for my driving test gave me total confidence. The car is smooth, compact, and super easy to park.',
    passStatus: 'Passed Test',
    date: 'Recent Graduate'
  }
];

export const TEST_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-01',
    name: 'SERVICE LOCATION 01 (Botany / South Sydney)',
    region: 'Sydney South',
    code: 'NSW-01',
    description: 'Active testing centre covering urban, industrial, and suburban roundabouts.',
    addressPlaceholder: 'Near Service NSW Centre, South Sydney Area, NSW',
    testCenterType: 'Service NSW Practical Test Centre',
    isPopular: true
  },
  {
    id: 'loc-02',
    name: 'SERVICE LOCATION 02 (Silverwater / Inner West)',
    region: 'Sydney Inner West',
    code: 'NSW-02',
    description: 'Multi-lane traffic flows, 40 km/h school zones, and highway merge corridors.',
    addressPlaceholder: 'Near Service NSW Centre, Inner West Hub, NSW',
    testCenterType: 'Service NSW Practical Test Centre',
    isPopular: true
  },
  {
    id: 'loc-03',
    name: 'SERVICE LOCATION 03 (Marrickville / City Fringe)',
    region: 'Sydney City Fringe',
    code: 'NSW-03',
    description: 'Narrow residential streets, pedestrian crossings, and tight reverse parallel parking.',
    addressPlaceholder: 'Near Service NSW Centre, City Fringe, NSW',
    testCenterType: 'Service NSW Practical Test Centre'
  },
  {
    id: 'loc-04',
    name: 'SERVICE LOCATION 04 (Rockdale / St George)',
    region: 'St George Region',
    code: 'NSW-04',
    description: 'Suburban test routes with speed changes, stop sign priorities, and hill starts.',
    addressPlaceholder: 'Near Service NSW Centre, Rockdale District, NSW',
    testCenterType: 'Service NSW Practical Test Centre'
  }
];

export const SERVICE_LOCATIONS = TEST_LOCATIONS;

export const FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'lessons',
    question: 'How many lessons do I need before taking my driving test?',
    answer: 'It depends on your current experience. Beginners typically take 5 to 10 structured lessons alongside home practice, while international licence holders usually need 2 to 4 test-route preparation lessons.'
  },
  {
    id: 'faq-02',
    category: 'lessons',
    question: 'How far before my test should I start lessons?',
    answer: 'We recommend starting at least 3 to 6 weeks before your booked test date to practice on realistic test routes and eliminate common test-fail habits without rushing.'
  },
  {
    id: 'faq-03',
    category: 'general',
    question: 'How do I book a lesson with Drivinity Driving Academy?',
    answer: 'You can book online directly through our booking page (/book) or get in touch via our contact page. Select your service, preferred test centre or location, and pick an available time window.'
  },
  {
    id: 'faq-04',
    category: 'general',
    question: 'How does payment work?',
    answer: 'We offer secure and flexible payment options. Package discounts and transparent pricing details will be confirmed with your instructor prior to your appointment.'
  },
  {
    id: 'faq-05',
    category: 'car-hire',
    question: 'Can I use the instructor’s car for my driving test?',
    answer: 'Yes! Our dual-control automatic car is fully insured, inspected, and complies with all Service NSW testing requirements. You can hire it alone or as part of the Lesson + Car package.'
  },
  {
    id: 'faq-06',
    category: 'test-day',
    question: 'What is included in the Lesson + Car package?',
    answer: 'The package includes a 45 to 60-minute warm-up lesson immediately before your test, use of the vehicle for the test, full insurance, and instructor accompaniment at the Service NSW desk.'
  },
  {
    id: 'faq-07',
    category: 'international',
    question: 'Can international licence holders take lessons with Drivinity Driving Academy?',
    answer: 'Yes! We specialize in overseas licence conversions. We focus on right-hand drive orientation, giving way rules, school zones, and specific Service NSW scoring criteria.'
  },
  {
    id: 'faq-08',
    category: 'test-day',
    question: 'What should I bring to my driving test?',
    answer: 'You will need your current Learner licence or overseas licence with ID/translation, completed logbook (or digital app verified), booking confirmation receipt, and required Service NSW identification.'
  },
  {
    id: 'faq-09',
    category: 'lessons',
    question: 'Can I bring another person to the lesson?',
    answer: 'Lessons are strictly 1-on-1 between the instructor and student to maximize learning focus and comply with training insurance policy.'
  },
  {
    id: 'faq-10',
    category: 'test-day',
    question: 'What happens if I need additional preparation before my test?',
    answer: 'If you need extra practice, you can easily book booster lessons focused directly on your areas of improvement before test day.'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'post-1',
    slug: 'what-you-need-to-know-before-your-driving-test',
    title: 'What You Need to Know Before Your NSW Practical Driving Test',
    excerpt: 'Key examiner expectations, essential vehicle checks, and top test-day mistakes that lead to instant fail items in New South Wales.',
    category: 'Driving Test',
    readTime: '5 min read',
    date: 'Updated for 2026',
    author: 'Drivinity Instructor Team',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 75%',
    imagePositionDesktop: 'center 75%',
    imagePositionMobile: 'center 75%',
    imageFit: 'cover',
    imageBg: '#0E1720',
    content: [
      'The New South Wales practical driving test assesses your ability to drive safely, smoothly, and in full compliance with road rules.',
      '1. Head Checks & Blind Spots: Moving without a visual head check is one of the most common fail items during lane changes and kerbside stops.',
      '2. Speed Management: Keep strictly within speed limits and observe active 40 km/h school zones between designated operating hours.',
      '3. Safe Distance: Always maintain a 3-second crash avoidance space behind the vehicle in front in dry conditions.'
    ]
  },
  {
    id: 'post-2',
    slug: 'how-to-prepare-for-your-nsw-driving-test',
    title: 'How to Systematically Prepare for Your NSW Driving Test',
    excerpt: 'A structured 4-week step-by-step roadmap from mock tests and reverse parking to mastering complex multi-lane roundabouts.',
    category: 'Test Preparation',
    readTime: '6 min read',
    date: 'Updated for 2026',
    author: 'Drivinity Instructor Team',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 45%',
    imagePositionDesktop: 'center 45%',
    imagePositionMobile: 'center 45%',
    imageFit: 'cover',
    imageBg: '#1A2129',
    content: [
      'Week 1: Focus on slow-speed precision including reverse parallel parking, three-point turns, and angle parking.',
      'Week 2: Practice complex intersections, traffic lights, right turns across oncoming traffic, and multi-lane roundabouts.',
      'Week 3: Complete a full mock test using actual Service NSW marking sheets with an accredited instructor.',
      'Week 4: Refresh test routes surrounding your chosen Service NSW center and build mental composure.'
    ]
  },
  {
    id: 'post-3',
    slug: 'driving-in-australia-with-an-overseas-licence',
    title: 'Driving in Australia with an Overseas Licence: Conversion Guide',
    excerpt: 'Everything you need to know about left-side driving, Give Way vs Stop signs, and converting your foreign licence in NSW.',
    category: 'International Drivers',
    readTime: '7 min read',
    date: 'Updated for 2026',
    author: 'Drivinity Instructor Team',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 75%',
    imagePositionDesktop: 'center 75%',
    imagePositionMobile: 'center 75%',
    imageFit: 'cover',
    imageBg: '#212832',
    content: [
      'Moving to Australia means adjusting to left-hand traffic flow, unique intersection rules, and strict road safety enforcement.',
      'Key considerations:',
      '- Roundabout signaling rules: Signal left when exiting every roundabout.',
      '- Strict mobile phone zero-tolerance laws while driving.',
      '- Understand the exact criteria needed to convert your overseas licence to a full NSW driver licence.'
    ]
  },
  {
    id: 'post-4',
    slug: 'mastering-reverse-parallel-parking',
    title: 'Mastering Reverse Parallel Parking in 4 Simple Steps',
    excerpt: 'Stop dreading the kerb. Learn the foolproof reference points for flawless parallel parking every single time.',
    category: 'Driving Tips',
    readTime: '4 min read',
    date: 'Updated for 2026',
    author: 'Drivinity Instructor Team',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 75%',
    imagePositionDesktop: 'center 75%',
    imagePositionMobile: 'center 75%',
    imageFit: 'cover',
    imageBg: '#192027',
    content: [
      'Reverse parallel parking is a mandatory component of the NSW practical driving test.',
      'Follow these 4 key reference points:',
      '1. Parallel Alignment: Stop parallel to the target car in front, leaving approximately 1 metre space.',
      '2. Initial Turn: Select Reverse, check all blind spots, and turn steering fully left until your car is at a 45-degree angle.',
      '3. Straight Back: Straighten wheel and reverse straight back until your front bumper clears the rear bumper of the car ahead.',
      '4. Final Tuck: Lock steering fully right and glide smoothly into the kerbside space.'
    ]
  }
];
