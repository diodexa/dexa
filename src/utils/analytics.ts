
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  params: Record<string, string | number | boolean> = {}
) => {
  window.gtag?.("event", eventName, params);
};
