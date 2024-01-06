export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const pageview = url => {
  // Only record in prod:
  if (process.env.NODE_ENV === 'development') {
    console.log('Skipping GA record pageview because in dev.');
    return null;
  }
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  })
}

// export const event = ({ action, category, label, value }) => {
//   window.gtag("event", action, {
//     event_category: category,
//     event_label: label,
//     value: value,
//   })
// }

// export const event = ({ action }) => {
//   // Only record in prod:
//   if (process.env.NODE_ENV === 'development') {
//     console.log('Skipping GA record event because in dev.');
//     return null;
//   }
//   window.gtag("event", action, {
//     // debug_mode: true,
//   })
// }
