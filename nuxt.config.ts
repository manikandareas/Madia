// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  tailwindcss: {
    exposeConfig: true,
  },
  modules: ["@nuxtjs/tailwindcss"],
  app: {
    head: {
      title: "Madia",
    },
  },
});
