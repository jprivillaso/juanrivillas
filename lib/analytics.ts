// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// GA4 Measurement ID - you'll need to replace this with your actual GA4 ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: title || document.title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track navigation events
export const trackNavigation = (destination: string, source?: string) => {
  trackEvent('navigation', 'user_interaction', `${source || 'unknown'} -> ${destination}`);
};

// Track blog post engagement
export const trackBlogEngagement = (slug: string, action: 'view' | 'scroll' | 'time_on_page', value?: number) => {
  trackEvent(action, 'blog_engagement', slug, value);
};

// Track social link clicks
export const trackSocialClick = (platform: string) => {
  trackEvent('click', 'social_interaction', platform);
};

// Track project interactions
export const trackProjectView = (projectName: string) => {
  trackEvent('view', 'project_interaction', projectName);
};

// Track search interactions (if you add search functionality)
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  trackEvent('search', 'site_search', searchTerm, resultsCount);
};

// Track file downloads or external links
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('click', 'external_link', linkText || url);
};

// Enhanced ecommerce events (for future use)
export const trackPurchase = (transactionId: string, value: number, currency = 'USD') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    });
  }
};

// Track user engagement time
export const trackEngagementTime = (timeInSeconds: number, page: string) => {
  trackEvent('engagement_time', 'user_engagement', page, timeInSeconds);
};
