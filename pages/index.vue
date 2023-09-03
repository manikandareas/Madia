<script lang="ts" setup></script>

<template>
  <main
    class="relative w-full max-w-7xl h-screen mx-auto items-center flex flex-col md:flex-row flex-wrap"
  >
    <div data-aos="fade-down" class="flex-1 space-y-4">
      <h1 class="dark:text-white md:text-4xl font-bold">Madia Blog</h1>
      <p class="dark:text-white md:text-base text-justify max-w-[80%]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse aliquam
        eligendi reiciendis odio, beatae optio consequatur, molestiae eum
        facere, error non commodi! Ea suscipit tenetur possimus fugit blanditiis
        consectetur sapiente.
      </p>
      <ul class="flex items-center space-x-4 mx-auto mr-4 md:mr-0">
        <li class="">
          <NuxtLink to="#"
            ><IconsGit class="hover:opacity-80 transition-all ease-in"
          /></NuxtLink>
        </li>
        <li class="">
          <NuxtLink to="#"
            ><IconsInstagram class="hover:opacity-80 transition-all ease-in"
          /></NuxtLink>
        </li>
        <li class="">
          <NuxtLink to="#"
            ><IconsLinkedin class="hover:opacity-80 transition-all ease-in"
          /></NuxtLink>
        </li>
      </ul>
      <button
        @click="navigateTo('/app')"
        class="px-4 py-2 dark:text-white font-semibold rounded-md shadow-md bg-[#2BC286] hover:bg-opacity-80 transition-all ease-in-out"
      >
        Jump to app
      </button>
    </div>
    <div
      class="flex-1 transition-all ease-in-out hidden md:block"
      data-aos="fade-up"
    >
      <UIHeroImage />
    </div>
  </main>
</template>
