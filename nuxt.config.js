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
  ],
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
      options: {},
    },
  },
});
