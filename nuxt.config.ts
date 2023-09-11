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
      TINYMCE_KEY: process.env.TINYMCE_KEY,
      SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  },
});
