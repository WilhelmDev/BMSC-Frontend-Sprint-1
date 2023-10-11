import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,

  render: {
    csp: {
      unsafeInlineCompatibility: false,
      policies: {
        "script-src": [
          "'self'",
          "https://connect.facebook.net",
          "https://maps.googleapis.com",
          "https://www.google.com",
          "https://www.gstatic.com",
          "https://unruffled-shannon-1a7413.netlify.app",
          "http://unruffled-shannon-1a7413.netlify.app"
        ],
      },
    },
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'server',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    link: [
      { hid: 'icon', rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/theme/_fonts.scss',
    '~/assets/theme/_fontIcons.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/global.js',
    '~/plugins/filter.js',
    '~/plugins/google-maps.js',
    { src: '~plugins/script_bmscuekd.js', ssr: false },

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'vue-social-sharing/nuxt',
    '@nuxtjs/gtm',
    '@nuxtjs/axios',
    ['nuxt-facebook-pixel-module', {
      /* module options */
      track: 'PageView',
      pixelId: 571174450212796,
      autoPageView: true,
      disabled: false
    }],
    [
      '@nuxtjs/recaptcha',
      {
        language: 'es',
        siteKey: process.env.RECAPTCHA_SITE_KEY,
        version: 2
      }
    ],
    '@nuxtjs/gtm'
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    theme: {
      light: true
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
  },
  gtm: {
    enabled: true, /* see below */
    debug: false,

    layer: 'dataLayer',
    variables: {},

    pageTracking: true,
    pageViewEventName: 'nuxtRoute',

    autoInit: true,
    respectDoNotTrack: true,

    scriptId: 'gtm-script',
    scriptDefer: false,
    scriptURL: 'https://www.googletagmanager.com/gtm.js',
    crossOrigin: false,

    noscript: true,
    noscriptId: 'gtm-noscript',
    noscriptURL: 'https://www.googletagmanager.com/ns.html',

    id: process.env.GOOGLE_TAG_MANAGER_ID
  },
  publicRuntimeConfig: {
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    },
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    servicesBaseUrl: process.env.SERVICES_BASE_URL,
    recaptcha: {
      siteKey: process.env.RECAPTCHA_SITE_KEY // for example
    }
  },
  generate: {
    // choose to suit your project
    interval: 2000,
  }

}
