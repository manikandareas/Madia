<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
  >
    <path
      fill="white"
      d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm-6 4q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Z"
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
