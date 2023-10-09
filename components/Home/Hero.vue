<template>
  <main
    class="relative w-full max-w-7xl h-screen mx-auto items-center justify-center flex flex-col md:flex-row flex-wrap"
  >
    <img
      data-aos="zoom-in-up"
      src="~/assets/images/IphoneView.png"
      alt="Iphone view"
      class="md:hidden w-[200px] absolute opacity-50 top-10"
    />
    <article
      data-aos="zoom-in"
      class="w-full flex items-center justify-center flex-col px-4 md:px-0 flex-1 space-y-4 z-50"
    >
      <h1
        class="dark:text-white text-2xl md:text-4xl font-bold backdrop-blur-sm md:backdrop-blur-none"
      >
        Madia Blog
      </h1>
      <p
        class="dark:text-white md:text-base text-center md:max-w-[85%] md:block hidden"
      >
        Madia Blog bukan sekadar platform, tetapi sebuah komunitas yang
        berkembang. Ini adalah rumah bagi mereka yang memiliki semangat untuk
        terus belajar dan berkembang dalam dunia teknologi. Bergabunglah dengan
        kami di Madia Blog dan saksikan bagaimana kita bersama-sama membentuk
        masa depan teknologi yang lebih cerah!
      </p>
      <p class="dark:text-white md:text-base text-center backdrop-blur-sm">
        "Madia Blog: Menggali Kreativitas, Meretas Inovasi, dan Menguatkan
        Komunitas Developer!"
      </p>
      <!-- social media -->
      <ul
        class="flex items-center w-full space-x-4 justify-center mr-4 md:mr-0"
      >
        <HomeSocialMedia
          v-for="socialMedia in listsSocialMedia"
          :key="socialMedia.URL"
          :URL="socialMedia.URL"
          :icon="socialMedia.icon"
        />
      </ul>
      <!-- cta -->
      <div class="flex gap-2 items-center">
        <button
          @click="navigateTo('/app')"
          class="px-4 py-2 w-full md:w-fit dark:text-white font-semibold rounded-md shadow-md bg-[#2BC286] hover:bg-opacity-80 transition-all ease-in-out"
        >
          Jump to app 🦸
        </button>
        <button
          @click="navigateTo('/auth/signup')"
          class="hidden md:block px-4 py-2 w-full md:w-fit dark:text-[#2BC286] font-semibold rounded-md shadow-md bg-[#fff] hover:bg-opacity-80 transition-all ease-in-out"
        >
          Signup Now 👻
        </button>
      </div>
    </article>
    <aside class="flex-1 transition-all ease-in-out hidden md:block">
      <HomeHeroImage />
    </aside>
  </main>
</template>

<script setup lang="ts">
const isSuperButton = ref(false);

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
