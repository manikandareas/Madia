<template>
  <div class="w-full flex flex-col rounded-lg overflow-hidden bg-zinc-900">
    <h3 class="p-4 border border-zinc-950 font-bold text-xl cursor-default">
      #{{ tag }}
    </h3>
    <h4
      v-for="(post, id) in posts"
      :key="id"
      class="p-4 text-zinc-200 text-base border-zinc-950 border-b hover:text-green-500"
    >
      <NuxtLink :to="post.URL">
        {{ post.title }}
      </NuxtLink>
    </h4>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  tag: {
    type: String,
    required: true,
  },
  posts: {
    type: Array<{ title: string; URL: string }>,
    required: true,
  },
});
</script>
