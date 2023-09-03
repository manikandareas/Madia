<template>
  <main
    class="relative w-full max-w-6xl min-h-screen mx-auto text-white pt-4 pb-16 md:pt-20 md:pb-14 flex gap-x-6"
  >
    <!-- action left -->
    <UIPostsDetailsLeftActions />
    <!-- end action left -->
    <!-- content -->
    <div class="w-full">
      <div class="flex flex-col overflow-hidden gap-y-4 rounded-lg">
        <!-- main -->
        <UIPostsDetailsContent
          :avatar-img-url="data.avatarImgUrl"
          :cover-img-url="data.coverImgUrl"
          :name-owner-posts="data.nameOwnerPosts"
          :reaction-posts="data.reactionsPosts"
          :tag-posts="data.tagPosts"
          :title-posts="data.titlePosts"
          :views-posts="data.viewsPosts"
        />
      </div>
    </div>
    <!-- end content -->
    <!-- aside right -->

    <!-- end aside right -->
  </main>
</template>

<script lang="ts" setup>
import posts from "~/data/mockPosts";
import { PropsBlogPosts } from "~/types/blog";

const data = ref<PropsBlogPosts>(posts[3]);

definePageMeta({
  layout: "blog",
});
</script>

<style></style>
~/data/mockPosts
