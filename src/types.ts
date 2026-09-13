export interface HairService {
  id: string;
  name: string;
  category: 'Haircuts & Styling' | 'Color & Balayage' | 'Perms & Texturizing' | 'Treatments & Extensions' | 'Nail Care';
  priceEstimate: string;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Balayage & Ombre' | 'Precision Cuts & Bobs' | 'Creative Color' | 'Perms & Waves' | 'Men\'s Cuts' | 'Extensions';
  stylist: string;
  image: string;
  galleryImages: string[];
  clientHairType: string;
  technique: string;
  summary: string;
  details: string;
  tags: string[];
  metrics: { label: string; value: string }[];
}

export interface StylistProfile {
  id: string;
  name: string;
  role: string;
  specialty: string[];
  experience: string;
  languages: string[];
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  source: 'Google' | 'Yelp' | 'BookBeauty';
  rating: number;
  date: string;
  stylistMentioned?: string;
  serviceMentioned?: string;
  content: string;
  positivePoints?: string[];
  ownerResponse?: string;
}

export interface BookingInquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  preferredStylist: string;
  serviceCategory: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: string;
}
