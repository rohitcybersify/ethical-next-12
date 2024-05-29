const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: !!process.env.BUNDLE_ANALYZE,
})

module.exports = bundleAnalyzer({
  i18n: {
    locales: ['en-us', 'en-ca'],
    defaultLocale: 'en-us',
  },
  images: {
    domains: [
      'cdn.builder.io',
      'test.cybersify.tech',
      'v5.airtableusercontent.com',
      'raw.githubusercontent.com',
      'v2.convertapi.com',
      'ethical-images.s3.ca-central-1.amazonaws.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // this will allow site to be framed under builder.io for wysiwyg editing
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors https://*.builder.io https://builder.io',
          },
        ],
      },
    ]
  },
  env: {
    // expose env to the browser
    BUILDER_PUBLIC_KEY: process.env.BUILDER_PUBLIC_KEY,
  },
})
