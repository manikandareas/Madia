<template>
  <main
    class="relative w-full max-w-7xl h-screen mx-auto items-center flex flex-col md:flex-row flex-wrap"
  >
    <article
      data-aos="fade-down"
      class="w-full flex items-center justify-center flex-col px-4 md:px-0 md:block flex-1 space-y-4"
    >
      <h1 class="dark:text-white md:text-4xl font-bold">Madia Blog</h1>
      <p class="dark:text-white md:text-base text-justify max-w-[80%]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse aliquam
        eligendi reiciendis odio, beatae optio consequatur, molestiae eum
        facere, error non commodi! Ea suscipit tenetur possimus fugit blanditiis
        consectetur sapiente.
      </p>
      <!-- social media -->
      <ul class="flex items-center space-x-4 mx-auto mr-4 md:mr-0">
        <HomeSocialMedia
          v-for="socialMedia in listsSocialMedia"
          :key="socialMedia.URL"
          :URL="socialMedia.URL"
          :icon="socialMedia.icon"
        />
      </ul>
      <!-- cta -->
      <button
        @click="navigateTo('/app')"
        class="px-4 py-2 w-full md:w-fit dark:text-white font-semibold rounded-md shadow-md bg-[#2BC286] hover:bg-opacity-80 transition-all ease-in-out"
      >
        Jump to app
      </button>
    </article>
    <!-- hero image -->
    <aside
      class="flex-1 transition-all ease-in-out hidden md:block"
      data-aos="fade-up"
    >
      <HomeHeroImage />
    </aside>
  </main>
</template>

<script setup lang="ts">
const listsSocialMedia: Array<{
  URL: string;
  icon: string;
}> = [
  {
    icon: "git",
    URL: "https://github.com/manikandareas",
  },
  {
    icon: "ig",
    URL: "https://instagram.com/manikandareas",
  },
  {
    icon: "linkedin",
    URL: "https://www.linkedin.com/in/vitomanik",
  },
];
</script>
