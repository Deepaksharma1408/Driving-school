// Centralized White-Label Configuration for Driving School SaaS Platform

export interface SiteConfig {
  brandName: string;
  shortName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  address: string;
  currencySymbol: string;
  copyrightYear: number;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    googleMaps?: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: 'Drivinity Driving Academy',
  shortName: 'Drivinity',
  tagline: 'The Complete Driving School Management & Online Booking Platform',
  supportEmail: 'contact@drivinity.com',
  supportPhone: '1300 855 374',
  address: 'Suite 100, Innovation Way, Sydney NSW Australia',
  currencySymbol: '$',
  copyrightYear: 2026,
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    googleMaps: 'https://maps.google.com'
  }
};

export default siteConfig;
