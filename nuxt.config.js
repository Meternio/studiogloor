export default defineNuxtConfig({
  css: ["@/assets/css/roboto.css", "@/assets/css/global.css"],
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_TOKEN,
        apiOptions: {
          region: "", // Set 'US" if your space is created in US region (EU default)
        },
      },
    ],
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@unlok-co/nuxt-stripe",
    "@pinia/nuxt",
    "nuxt-icon",
    "nuxt-vuefire",
    "@nuxtjs/seo",
  ],
  robots: {
    // provide simple disallow rules for all robots `user-agent: *`
    disallow: ["/success", "/imprint", "/data-policy", "/checkout", "/basket"],
  },
  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  vuefire: {
    appCheck: {
      debug: process.env.NODE_ENV !== "production",
      isTokenAutoRefreshEnabled: true,
      provider: "ReCaptchaEnterprise",
      key: process.env.GOOGLE_RECAPTCHA_KEY,
    },
    auth: {
      enabled: true,
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },
  image: {
    storyblok: {
      baseURL: "https://a.storyblok.com",
    },
  },
  stripe: {
    // Server
    server: {
      key: process.env.STRIPE_SERVER,

      // your api options override for stripe server side
      options: {},
    },
    // CLIENT
    client: {
      key: process.env.STRIPE_CLIENT,

      // your api options override for stripe client side
      options: {
        locale: "en",
      },
    },
  },
});
