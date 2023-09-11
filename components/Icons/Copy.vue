<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" viewBox="0 0 24 24">
    <path
      :fill="color"
      d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.006-1H7Zm2 0h8v10h2V4H9v2Z"
    ></path>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: "20px",
  },
  color: {
    type: String,
    default: "#888888",
  },
});
</script>
