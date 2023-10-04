<template>
  <div
    v-show="isSuccess"
    class="w-full bg-white text-black h-12 flex items-center justify-center"
  >
    <h4>Your profile has been updated</h4>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isSuccess: {
    type: Boolean,
    required: true,
  },
});
</script>
