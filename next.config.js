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

  // REDIRECTION URLS
  async redirects() {
    return [
      {
        source: '/pages/about-us',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/pages/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/pages/faq',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/collections/bags',
        destination: '/category/bags',
        permanent: true,
      },
      {
        source: '/collections/drinkware',
        destination: '/category/drinkware',
        permanent: true,
      },
      {
        source: '/collections/straws',
        destination: '/category/drinkware/straws',
        permanent: true,
      },
      {
        source: '/collections/writing-tools',
        destination: '/category/office-&-school/writing-tools',
        permanent: true,
      },
      {
        source: '/collections/cups-mugs',
        destination: '/category/drinkware/mugs',
        permanent: true,
      },
      {
        source: '/collections/tote-bags',
        destination: '/category/bags/totes',
        permanent: true,
      },
      {
        source: '/collections/travel-bags-accessories',
        destination: '/category/bags/travel-bags-accessories',
        permanent: true,
      },
      {
        source: '/collections/glassware',
        destination: '/category/drinkware/glassware',
        permanent: true,
      },
      {
        source: '/collections/cups-mugs',
        destination: '/category/drinkware/cups-mugs',
        permanent: true,
      },
      {
        source: '/collections/tumblers',
        destination: '/category/drinkware/tumblers',
        permanent: true,
      },
      {
        source: '/collections/water-bottles',
        destination: '/category/drinkware/water-bottles',
        permanent: true,
      },
      {
        source: '/collections/grow-kits',
        destination: '/category/plants-&-seeds/grow-kits',
        permanent: true,
      },
      {
        source: '/collections/plants-seeds-notebooks',
        destination: '/category/plants-&-seeds/notebooks',
        permanent: true,
      },
      {
        source: '/collections/candles',
        destination: '/category/at-home/candles',
        permanent: true,
      },
      {
        source: '/collections/food-containers',
        destination: '/category/at-home/food-containers',
        permanent: true,
      },
      {
        source: '/collections/games-entertainment',
        destination: '/category/at-home/games',
        permanent: true,
      },
      {
        source: '/collections/home-kitchen',
        destination: '/category/at-home/home-&-kitchen',
        permanent: true,
      },
      {
        source: '/collections/cutlery-utensils',
        destination: '/category/at-home/utensils',
        permanent: true,
      },
      {
        source: '/collections/desk-accessories',
        destination: '/category/office-&-school/desk-accessories',
        permanent: true,
      },
      {
        source: '/collections/writing-tools',
        destination: '/category/office-&-school/writing-tools',
        permanent: true,
      },
      {
        source: '/collections/desk-toys',
        destination: '/category/office-&-school/desk-toys',
        permanent: true,
      },
      {
        source: '/collections/earbuds-headphones',
        destination: '/category/tech/headphones',
        permanent: true,
      },
      {
        source: '/collections/portable-lights',
        destination: '/category/tech/lights',
        permanent: true,
      },
      {
        source: '/collections/speakers',
        destination: '/category/tech/speakers',
        permanent: true,
      },
      {
        source: '/collections/wellness',
        destination: '/category/wellness',
        permanent: true,
      },
      {
        source: '/collections/lip-balms',
        destination: '/category/wellness/lip-balms',
        permanent: true,
      },
      {
        source: '/collections/masks-ppe',
        destination: '/category/wellness/masks-&-ppe',
        permanent: true,
      },
      {
        source: '/collections/events-material-office-schools',
        destination: '/category/other/events-material',
        permanent: true,
      },
      {
        source: '/collections/keychains',
        destination: '/category/other/keychainss',
        permanent: true,
      },
      {
        source: '/collections/food',
        destination: '/category/other/snacks',
        permanent: true,
      },
      {
        source: '/products/cardboard-box',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/sample',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/biodegradable-mailer',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/la-guardia-20l-computer-backpack-certified-b-corp-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-recycled-sling-backpack-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/metropol-100-recycled-15-computer-backpack-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/hip-100-recycled-15-computer-backpack-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/best-selling-100-recycled-13-computer-backpack-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/broadway-100-recycled-15-computer-backpack-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-cotton--genuine-leather-15-computer-backpack-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/adventure-backpack-cooler-recycled-polyester--%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/modern-recycled-pet-lunch-cooler-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/organic-lunch-bag-%F0%9F%98%80%F0%9F%98%80%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-lunch-bag-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-lunch-cooler-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-canvas-lunch-cooler-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-and-cork-drawstring-bag-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-drawstring-bag--%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-convertible-cinch-pack-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-cotton-drawstring-bag-with-front-pocket-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-drawstring-sportspack-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/two-tone-recycled-cotton-drawstring-bag-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/hipster-fanny-pack-with-face-mask-kit-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/fanny-pack-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-fanny-pack-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/weathered-paper-fanny-pack-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/reusable-polyester-mesh-vegetable--produce-bag-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/set-of-3-piece-produce-bags-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/fabulous-laundry-bag-%F0%9F%98%80',
        destination: 'product/4610',
        permanent: true,
      },
      {
        source: '/products/100-recycled-messenger-bag-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/-recycled-gusseted-pouch-organizer-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/accent-recycled-felt-pouch-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/kharma-certified-bamboo-pouch-natural-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/accent-dye-sublimated-felt-pouch-made-in-the-usa-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-cotton-3-pc-travel-pouch-set-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/large-cotton-zippered-pouch-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-travel-pouch-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-cotton-pouch-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/waterproof-pouch-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/heavy-duty-all-purpose-tote-16l-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/porto-cork-tote-bag-%F0%9F%98%8A%F0%9F%98%8A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/farmers-market-cotton-mesh-bag-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-tote-bag-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-cotton-super-tote-%F0%9F%98%8A%F0%9F%98%8A%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-packable-tote-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-mesh-tote-%F0%9F%98%80%F0%9F%98%80"',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-super-tote-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81"',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/large-trade-show-bag-%F0%9F%98%80"',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-cork-convention-bag-%F0%9F%98%80%F0%9F%98%80"',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-zippered-tote-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/product/5133',
        permanent: true,
      },
      {
        source: '/products/recycled-cotton-convention-tote-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/product/4534',
        permanent: true,
      },
      {
        source: '/products/small-laminated-non-woven-shopper-tote-%F0%9F%98%80',
        destination: '/product/3798',
        permanent: true,
      },
      {
        source: '/products/large--shopper-tote-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/reflective-coloring-tote-bag-with-crayons-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/product/4834',
        permanent: true,
      },
      {
        source: '/products/best-selling-tote-bag-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/two-tone-tote-bag-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-cotton-market-bag-natural-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-cotton-grocery-tote-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plaid-printed-jute-tote-%F0%9F%98%80',
        destination: '/product/4755',
        permanent: true,
      },
      {
        source: '/products/canvas-boat-tote-bags-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/deluxe-cotton-packable-tote---%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-laminated-shopper-tote',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-recycled-luggage-tag-%F0%9F%98%83%F0%9F%98%83%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/travel-wallet-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-duffel-bag-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-sport-duffel-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/product/3921',
        permanent: true,
      },
      {
        source: '/products/shoe-bag-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/graphite-20-upright-luggage-%F0%9F%98%80',
        destination: '/product/3605',
        permanent: true,
      },
      {
        source: '/products/samsonite--22-wheeled-duffel-black-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/2-in-1-carry-on-travel-blanket-and-pillow-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/copper-vacuum-insulated-bottle-cork-top-20oz-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-felt-cup-sleeve-made-in-the-usa-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/speckled-2-in-1-tumbler--can-koozie-11oz-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cocktail-kit-gift-set-natural%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-mug-%F0%9F%98%80%F0%9F%98%80%F0%9F%91%A9`',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/moon-matte-ceramic-mug-14-oz-%F0%9F%98%80%F0%9F%98%80',
        destination: '/product/3919',
        permanent: true,
      },
      {
        source: '/products/campground-copper-insulated-mug-14-oz-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-collapsible-can-cooler-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%AD%90%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/individual-reusable-straight-stainless-steel-straws-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/individual-reusable-curved-stainless-steel-straw-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/reusable-stainless-steel-straw-3pcs-set-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/reusable-stainless-straw-set-with-eco-tube-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/reusable-stainless-straw-10-in-1-set%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/reusable-stainless-steel-straw-set-with-brush%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stainless-steel-straw-set-5-piece-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/4-piece-bamboo-wine-gift-set%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-wine-case-set-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/-matte-finish-absorbent-square-coasters---4x4%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/live-edge-coasters%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/double-sided-2-circle-seed-paper-button-badges-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-promotional-flags-printed-both-sides-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      }, 
      {
        source: '/products/knit-toque-with-faux-fur-pom-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      }, 
      {
        source: '/products/unisex-beanie---made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      }, 
      {
        source: '/products/leaf-shape-small-plantable-bookmark-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/warm-buff-made-in-canada-%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      }, 
      {
        source: '/products/fully-branded-buff---made-in-canada-%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      }, 
      {
        source: '/products/seed-paper-business-card-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },               
      {
        source: '/products/seed-paper-business-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/veggie-seed-paper-shapes-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/large-die-cut-paper-shapes-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-whale-shape-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-seed-paper-circle-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/sustainability-footprint-seed-paper-business-card-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/herb-seed-paper-shape-pack-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-circle-2-sided',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/canadian-made-baseball-cap-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/adjustable-ballcap-with-leather-visor-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-coffee-cup-sleeve-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-tent-cards-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-panel-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/4-x-9-seed-paper-panel-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/adele-portable-bluetooth-speaker-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/double-luck-wifi-extender-with-charger-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/web-cam-cover-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/microfiber-lens-cleaning-cloth-5-x-5-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-eco-friendly-wooden-mobile-docking-station-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-eco-friendly-wooden-phone-stand-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/flower-power-seed-paper-sprouter-kit-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/paper-sprouter-kit-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/sunflower-seed-bomb-in-a-muslin-bag-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-peanut-butter-blondie-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-sticky-squirrel-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-blueberry-grunt-bar-53g-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-cranberry-choco-chunk-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-coconut-in-the-dark-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-luxury-spa-gift-set-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-seed-paper-greeting-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-greeting-card-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-greeting-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/60-ml-gel-hand-sanitizer-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-in-canada-coloring-book-soft-cover-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: 'product/3661',
        permanent: true,
      },
      {
        source: '/products/mini-plantable-pocket-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-eco-friendly-keychains-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/non-medical-sublimated-2-layer-face-mask-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/3615',
        permanent: true,
      },
      {
        source: '/products/non-medical-hemp-cotton-face-mask-with-adjustable-ear-loops-%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83%F0%9F%8D%81b',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/-short-sleeve-mens-bamboo-golf-shirt-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-xl-fully-custom-notebook-7-x-9-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-m-fully-custom-notebook-5-x-7-with-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81-',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-s-fully-custom-notebook-4-x-6-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81-',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-plantable-pocket-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/spiral-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/organic-inkrecycled-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%92%9A%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-refillable-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-backing-rectangle-roll-stickers-2x-3-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-pencil-with-2-sided-seeds-paper-wrap-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/magnetic-cap-pen---made-in-canada%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/katey-portable-back-up-phone-charger-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-super-tote-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-40-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-185-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-250-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-500-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-50-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/4119',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-100-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/4519',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-250-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/3887',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-500-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-in-canada-full-zip-hooded-sweatshirt-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/organic-and-recycled-long-sleeve-t-shirt-made-in-canada-%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/portable-cloud-usb-storage-drive-with-app-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-short-sleeve-womens-t-shirt-%F0%9F%8D%81%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-wristband-long-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-in-canada-coloring-book-soft-cover-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/3661',
        permanent: true,
      },
      {
        source: '/products/mini-plantable-pocket-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-eco-friendly-keychains-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/non-medical-sublimated-2-layer-face-mask-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/3615',
        permanent: true,
      },
      {
        source: '/products/non-medical-hemp-cotton-face-mask-with-adjustable-ear-loops-%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83%F0%9F%8D%81b',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/-short-sleeve-mens-bamboo-golf-shirt-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-xl-fully-custom-notebook-7-x-9-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-m-fully-custom-notebook-5-x-7-with-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81-',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-s-fully-custom-notebook-4-x-6-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81-',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-plantable-pocket-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/organic-inkrecycled-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%92%9A%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-refillable-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-backing-rectangle-roll-stickers-2x-3-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-pencil-with-2-sided-seeds-paper-wrap-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/magnetic-cap-pen---made-in-canada%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/katey-portable-back-up-phone-charger-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-super-tote-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-40-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-185-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-500-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-50-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/4119',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-100-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/4519',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-250-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/3887',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-500-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-in-canada-full-zip-hooded-sweatshirt-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/portable-cloud-usb-storage-drive-with-app-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-short-sleeve-womens-t-shirt-%F0%9F%8D%81%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-wristband-long-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-in-canada-coloring-book-soft-cover-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/color-block-recycled-bound-journal-with-pen-set-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cork-hard-bound-journal-book-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-apple-peel-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-spiral-journal-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/large-recycled-spiral-journal-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-journal-premium-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-bound-journal-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/leather-refillable-journal-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/accent-dye-sublimated-recycled-felt-journal-made-in-the-usa-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-xl-fully-custom-notebook-7-x-9-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-m-fully-custom-notebook-5-x-7-with-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81-',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-s-fully-custom-notebook-4-x-6-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81-',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/saddle-stitched-recycled-notepad-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/eco-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-plantable-pocket-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/spiral-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/organic-inkrecycled-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%92%9A%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-refillable-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-backing-rectangle-roll-stickers-2x-3-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-backing-rectangle-roll-stickers-2x-3-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-pencil-with-2-sided-seeds-paper-wrap-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/magnetic-cap-pen---made-in-canada%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/katey-portable-back-up-phone-charger-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton-super-tote-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-40-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-185-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-250-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-round-glass-bottle-500-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-50-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/4119',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-100-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/4519',
        permanent: true,
      },
      {
        source: '/products/pure-canadian-maple-syrup-in-leaf-glass-bottle-250-ml-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/3887',
        permanent: true,
      },
      {
        source: '/products/made-in-canada-full-zip-hooded-sweatshirt-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/organic-and-recycled-long-sleeve-t-shirt-made-in-canada-%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/portable-cloud-usb-storage-drive-with-app-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-short-sleeve-womens-t-shirt-%F0%9F%8D%81%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-in-canada-coloring-book-soft-cover-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/product/3661',
        permanent: true,
      },
      {
        source: '/products/recycled-leather-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/color-block-recycled-bound-journal-with-pen-set-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cork-hard-bound-journal-book-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-apple-peel-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-spiral-journal-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/large-recycled-spiral-journal-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-bound-journal-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-journal-premium-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BBB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/leather-refillable-journal-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/accent-dye-sublimated-recycled-felt-journal-made-in-the-usa-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-xl-fully-custom-notebook-7-x-9-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-m-fully-custom-notebook-5-x-7-with-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81-',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/stories-s-fully-custom-notebook-4-x-6-150-pages-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81-',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/saddle-stitched-recycled-notepad-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-plantable-pocket-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/spiral-recycled-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/organic-inkrecycled-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%92%9A%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-refillable-notebook-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/refillable-faux-leather-notebook-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-non-adhesive-note-pad-3x-6-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB-%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-sticky-notepad-4-x-6-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-felt-padfolio-%F0%9F%98%80%F0%9F%98%80%E2%99%BB%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/zip-tablet-portfolio-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-pencil-with-2-sided-seeds-paper-wrap-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-tire-pencil-%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83%E2%AD%90%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/lacquer-free-pencil-with-eraser-%F0%9F%98%83%F0%9F%98%83%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-paper-and-cornstarch-not-plastic-pen-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/product/4481',
        permanent: true,
      },
      {
        source: '/products/color-parade-wheat-straw-ballpoint-pen-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-water-bottle-ballpoint-pen-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-plastic-highlighter-pen-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/metal-twist-stylus-ballpoint-pen-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-plastic-pen-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-and-metal-ballpoint-pen-%F0%9F%98%80%F0%9F%98%80',
        destination: '/product/3695',
        permanent: true,
      },
      {
        source: '/products/magnetic-cap-pen---made-in-canada%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/wheat-husk-made-ballpoint-pen-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/double-sided-2-circle-seed-paper-button-badges-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-promotional-flags-printed-both-sides-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-business-card-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-business-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/veggie-seed-paper-shapes-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/product/3754',
        permanent: true,
      },
      {
        source: '/products/large-die-cut-paper-shapes-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-whale-shape-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-seed-paper-circle-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/sustainability-footprint-seed-paper-business-card-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/herb-seed-paper-shape-pack-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-circle-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-coffee-cup-sleeve-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-tent-cards-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-panel-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/4-x-9-seed-paper-panel-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/flower-power-seed-paper-sprouter-kit-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/paper-sprouter-kit-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-seed-paper-greeting-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-greeting-card-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-greeting-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-plantable-pocket-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-pencil-with-2-sided-seeds-paper-wrap-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-wristband-long-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/paper-pack-washable-paper-backpack-%F0%9F%98%80%F0%9F%98%80%F0%9F%92%9A%F0%9F%91%A9',
        destination: '/product/4380',
        permanent: true,
      },
      {
        source: '/products/seed-paper-promotional-flags-printed-both-sides-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/unisex-beanie---made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/leaf-shape-small-plantable-bookmark-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-business-card-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-business-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/veggie-seed-paper-shapes-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/product/3754',
        permanent: true,
      },
      {
        source: '/products/large-die-cut-paper-shapes-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-whale-shape-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-seed-paper-circle-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/sustainability-footprint-seed-paper-business-card-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/herb-seed-paper-shape-pack-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-circle-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-multipurpose-reusable-cleaning-cloth-2-pack-%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-multipurpose-reusable-cleaning-cloth-3-pack-%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-multipurpose-reusable-cleaning-cloth-4-pack-%F0%9F%98%83%F0%9F%98%83%F0%9F%98%83%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-coffee-cup-sleeve-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-tent-cards-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-panel-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/4-x-9-seed-paper-panel-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/weathered-paper-fanny-pack-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },   
      {
        source: '/products/paper-sprouter-kit-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/sunflower-seed-bomb-in-a-muslin-bag-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-peanut-butter-blondie-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-sticky-squirrel-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%8112810',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-blueberry-grunt-bar-53g-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-cranberry-choco-chunk-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-coconut-in-the-dark-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%811',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/small-seed-paper-greeting-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/medium-seed-paper-greeting-card-2-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/drizzle-turmeric-gold-raw-honey-2oz-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/drizzle-white-raw-honey-2oz-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/drizzle-cinnamon-spiced-raw-honey-2oz-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/drizzle-honey-taster-trio-gift-set-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mini-plantable-pocket-notebook-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-journal-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%E2%99%BB%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/mens-bamboo-cotton-jersey-short-sleeve-golf-shirt-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%92%9A12',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-mug-%F0%9F%98%80%F0%9F%98%80%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-pencil-with-2-sided-seeds-paper-wrap-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/full-print-fleece-throw-blanket-%F0%9F%98%80%F0%9F%98%80%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/-womens-cross-over-long-sleeve-shirt-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/seed-paper-wristband-long-1-sided-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81%F0%9F%91%A9',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/hand-cleanser-spray-8-ml-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-in-canada-non-medical-sublimated-2-layer-face-mask-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/all-you-need-kits-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/fully-branded-buff-%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/60-ml-gel-hand-sanitizer-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cotton--apron-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-retractable-badge-holder-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/product/3912',
        permanent: true,
      },
      {
        source: '/products/recycled-lanyard-with-standard-attachment-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/dog-walker-hydration-sling-black-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/biodegradable-latex-balloon-9-round-standard-made-in-canada-%F0%9F%98%8A%F0%9F%98%8A%F0%9F%98%8A%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/biodegradable-latex-balloon-11-round-standard-made-in-canada-%F0%9F%98%8A%F0%9F%98%8A%F0%9F%98%8A%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/biodegradable-latex-balloon-16-round-standard-made-in-canada-%F0%9F%98%8A%F0%9F%98%8A%F0%9F%98%8A%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/outdoor-biodegradable-latex-balloon-17-round-standard-made-in-canada-%F0%9F%98%8A%F0%9F%98%8A%F0%9F%98%8A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/new-cozy-blanket-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-recycled-pet-fleece-blanket-with-canvas-pouch-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/product/4810',
        permanent: true,
      },
      {
        source: '/products/made-with-local-peanut-butter-blondie-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-sticky-squirrel-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-blueberry-grunt-bar-53g-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-blueberry-grunt-bar-53g-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-cranberry-choco-chunk-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/made-with-local-coconut-in-the-dark-bar-53g-certified-b-corp-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/flip-lid-mint-tin-%F0%9F%98%80',
        destination: '/product/4029',
        permanent: true,
      },
      {
        source: '/products/38-dye-sublimated-waffle-weave-shoelace-pair-%F0%9F%98%80%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/34-dye-sublimated-waffle-weave-shoelaces-pair-%F0%9F%98%80%E2%AD%90',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/jacquard-socks-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/just-us-breaking-the-silence-coffee-12-oz.-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/wheat-straw-baggie-dispenser-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/web-cam-cover-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/products/jobbs-webcam-cover',
        permanent: true,
      },
      {
        source: '/products/microfiber-lens-cleaning-cloth-5-x-5-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/productslicone-card-holder-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/amp-2200-mah-power-bank-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bluetooth-wooden-speaker-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/popsockets-grip-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/metal--fabric-waterproof-bluetooth-speaker-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/wooden-wireless-charging-pad--%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/qi-4000-mah-wireless-power-bank-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/high-density-5000-mah-power-bank--%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/5000-mah-bamboo-wireless-power-bank-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-charging-pad-with-stand-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-eco-friendly-wooden-mobile-docking-station-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-eco-friendly-wooden-phone-stand-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-chopstick-building-blocks-tower-game-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/baking-gourmet-gift-set-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/healthy-gourmet-gift-set-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bbq-gourmet-gift-set-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-picture-frame-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-coaster-set-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-eco-friendly-keychains-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/non-touch-keychain-nylon',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/non-touch-keychain-brass',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboorecycled-plastic-cutlery-set-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/travel-utensil-set-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/camping-cooking-set-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/live-edge-coasters-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/cedar-bbq-scraper-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/maple-wood-magnetic-knife-holder--%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/live-edge-wooden-cutting-board-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-utensil-set-in-cotton-pouch-%F0%9F%98%80',
        destination: '/product/4914',
        permanent: true,
      },
      {
        source: '/products/bamboo-utensil-set-with-pouch-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-salad-serving-set-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-lunch-box-with-cutting-board-lid-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/bamboo-cutting-board-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/natural-bamboo-16-serving-tray--%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/hanging-bag-keeper-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/plantable-pencil-with-2-sided-seeds-paper-wrap-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/all-natural-lip-balm-%F0%9F%98%80%F0%9F%98%80',
        destination: '/product/3989',
        permanent: true,
      },
      {
        source: '/products/bamboo-facial-brush-%F0%9F%98%80%F0%9F%98%80',
        destination: '/product/4093',
        permanent: true,
      },
      {
        source: '/products/bamboo-shower--body-brush-%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/organic--natural-lip-moisturizer-%F0%9F%98%80%F0%9F%98%80%F0%9F%92%9A',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-organic-reusable-make-up-remover-pads-made-in-canada-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%F0%9F%92%9A%D3%BE',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recycled-backing-rectangle-roll-stickers-2x-3-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80%E2%99%BB%F0%9F%8D%81',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/individual-reusable-straight-stainless-steel-straws-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/individual-reusable-curved-stainless-steel-straw-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/reusable-stainless-steel-straw-3pcs-set-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/reusable-stainless-straw-set-with-eco-tube',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/100-recycled-luggage-tag-%F0%9F%98%83%F0%9F%98%83%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/fanny-pack-%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/recyclable-paper-luggage-tag-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/48-recycled-plaid-inversion-umbrella-%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/48-recycled-fashion-umbrella%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/42-recycled-openclose-folding-umbrella%F0%9F%98%80%F0%9F%98%80%E2%99%BB',
        destination: '/category',
        permanent: true,
      },
      {
        source: '/products/grab-and-go-6-piece-bio-plastic-utensil-set-%F0%9F%98%80%F0%9F%98%80%F0%9F%98%80',
        destination: '/category',
        permanent: true,
      }
    ]  
  }
})
