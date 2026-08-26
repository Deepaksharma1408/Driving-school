export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  badge: string;
  slug: string;
  image: string;
  highlights: string[];
  pricePlaceholder?: string;
  idealFor: string;
}

export interface BenefitItem {
  iconName: string;
  title: string;
  description: string;
}

export interface AudienceItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  focusPoints: string[];
  link: string;
}

export interface TestimonialItem {
  id: string;
  studentName: string;
  locationTag: string;
  rating: number;
  serviceType: string;
  reviewText: string;
  passStatus: string;
  date: string;
}

export interface LocationItem {
  id: string;
  name: string;
  region: string;
  code: string;
  description: string;
  addressPlaceholder: string;
  testCenterType: string;
  isPopular?: boolean;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'lessons' | 'car-hire' | 'test-day' | 'international';
  question: string;
  answer: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string[];
  imagePosition?: string;
  imagePositionDesktop?: string;
  imagePositionMobile?: string;
  imageFit?: 'cover' | 'contain';
  imageBg?: string;
}

export interface BookingState {
  serviceId: string;
  locationId: string;
  transmission: 'automatic' | 'manual';
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  licenceType: string;
  notes: string;
}
