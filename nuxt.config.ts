// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  tailwindcss: {
    exposeConfig: true,
    config: {
      plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "nuxt-headlessui",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],
  app: {
    head: {
      title: "Madia",
    },
  },
  css: ["~/assets/css/main.scss"],
  supabase: {
    redirect: false,
  },
  headlessui: {
    prefix: "HL",
  },
  components: {
    global: true,
    dirs: ["~/components"],
  },
  ssr: false,
  runtimeConfig: {
    public: {
      SUPABASE_PROJECT_ID: process.env.SUPABASE_PROJECT_ID,
      SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_ANON_KEY: process.env.SUPABASE_KEY,
    },
  },
});
