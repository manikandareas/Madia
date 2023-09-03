<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" viewBox="0 0 24 24">
    <g fill="white" stroke="white" strokeWidth="2">
      <circle cx="4" cy="12" r="1"></circle>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="20" cy="12" r="1"></circle>
    </g>
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
