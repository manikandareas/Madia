<template>
  <div
    v-show="isNewUser"
    class="w-full bg-red-600/20 backdrop-blur-md text-white h-12 flex items-center justify-center"
  >
    <h4>
      Please complete all your personal data so that all features can be opened
      🫡.
    </h4>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isNewUser: {
    type: Boolean,
    required: true,
  },
});
</script>
