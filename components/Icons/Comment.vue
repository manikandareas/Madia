<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" viewBox="0 0 24 24">
    <path
      fill="white"
      d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8Z"
    ></path>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: "20px",
  },
});
</script>
