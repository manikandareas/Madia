<template>
  <li>
    <NuxtLink :to="URL">
      <IconsGit
        class="hover:opacity-80 transition-all ease-in"
        v-if="icon === 'git'"
      />
      <IconsLinkedin
        class="hover:opacity-80 transition-all ease-in"
        v-else-if="icon === 'linkedin'"
      />
      <IconsInstagram
        class="hover:opacity-80 transition-all ease-in"
        v-else-if="icon === 'ig'"
      />
    </NuxtLink>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  URL: {
    type: String,
  },
  icon: {
    type: String,
  },
});
</script>
