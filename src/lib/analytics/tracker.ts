import { supabase } from "@/integrations/supabase/client";

export type AnalyticsEvent = 
  | 'calculator_started'
  | 'calculator_completed'
  | 'result_viewed'
  | 'lead_form_opened'
  | 'lead_submitted'
  | 'share_clicked'
  | 'guide_clicked';

interface EventData {
  countryCode?: string;
  calculatorType?: string;
}

export const trackEvent = async (eventName: AnalyticsEvent, data?: EventData) => {
  // 1. Internal tracking (privacy-conscious)
  try {
    await supabase.from('analytics_events').insert({
      event_name: eventName,
      country_code: data?.countryCode,
      calculator_type: data?.calculatorType
    });
  } catch (error) {
    console.error('Failed to track internal event:', error);
  }

  // 2. GA4 integration (if enabled and consent given)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      country: data?.countryCode,
      calculator: data?.calculatorType
    });
  }
};
