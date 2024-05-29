// lib/gtag.js
export const GA_TRACKING_ID = 'G-B51Q1TS5Y4' // Replace with your actual Google Analytics ID

// Function to track pageviews
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// log specific events happening.
export const event = ({ action, params }) => {
  window.gtag('event', action, params)
}
