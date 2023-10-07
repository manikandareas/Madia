<template>
  <li>
    <NuxtLink
      :to="URL"
      class="rounded hover:bg-gray-100 active:text-green-500 focus:text-green-500 text-white md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
      >{{ page }}</NuxtLink
    >
  </li>
</template>

<script lang="ts" setup>
defineProps({
  URL: {
    type: String,
  },
  page: {
    type: String,
  },
});
</script>
