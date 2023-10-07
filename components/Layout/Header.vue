<template>
  <header class="bg-white dark:bg-transparent" data-aos="fade-down">
    <nav
      class="max-w-screen-xl flex items-center justify-between mx-auto py-4 px-2 md:px-0"
    >
      <a href="#" class="flex items-center">
        <IconsMadiaGreen />
      </a>
      <div class="flex md:order-2">
        <ul class="flex items-center space-x-4 mx-auto mr-4 md:mr-0">
          <HomeHeaderSocialMedia
            v-for="socialMedia in listsSocialMedia"
            :key="socialMedia.URL + socialMedia.icon"
            :URL="socialMedia.URL"
            :icon="socialMedia.icon"
            :title="socialMedia.title"
          />
        </ul>
        <button
          data-collapse-toggle="navbar-cta"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-cta"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-cta"
      >
        <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
        >
          <HomeHeaderRoutes
            v-for="route in pages"
            :key="route.URL"
            :URL="route.URL"
            :page="route.page"
          />
        </ul>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const pages: Array<{ URL: string; page: string }> = [
  {
    URL: "/",
    page: "Home",
  },
  {
    URL: "/about",
    page: "About",
  },
  {
    URL: "/app",
    page: "App",
  },
];

const listsSocialMedia: Array<{ URL: string; icon: string; title: string }> = [
  {
    icon: "git",
    URL: "https://github.com/manikandareas",
    title: "Go to my Github",
  },
  {
    icon: "ig",
    URL: "https://instagram.com/manikandareas",
    title: "Go to my Instagram",
  },
  {
    icon: "linkedin",
    URL: "https://www.linkedin.com/in/vitomanik",
    title: "Go to my Linkedin",
  },
];
</script>
