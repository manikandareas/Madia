<template>
  <header class="w-full">
    <h2 class="text-3xl">
      Setting for <span class="text-green-500">@{{ username }}</span>
    </h2>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  username: {
    type: String,
    required: true,
  },
});
</script>
