<template>
  <main
    class="relative w-full max-w-6xl min-h-screen mx-auto text-white pt-4 pb-16 md:pt-[150px] md:pb-14 space-y-8"
  >
    <!-- main -->
    <div class="w-full h-[364px] rounded-lg relative bg-zinc-900">
      <!-- image -->
      <NuxtImg
        src="https://placehold.co/112"
        class="w-[112px] rounded-full border-[6px] border-black absolute right-[calc((100%/2)-56px)] -top-[56px]"
      />
      <!-- action right -->
      <div class="flex space-x-4 place-content-end p-8">
        <button class="px-4 py-2 font-semibold rounded-md bg-green-500">
          Follow
        </button>
        <IconsMoreHorizontal size="30px" />
      </div>
      <!-- desc -->
      <div class="items-center flex flex-col space-y-6">
        <h1 class="text-3xl font-bold">Vito Andareas Manik</h1>
        <p class="text-xl font-medium">
          Hi dude my name is vito andareas manik I'm a fullstack developer
        </p>
        <div class="flex space-x-6 justify-center">
          <span class="flex text-base text-slate-300 items-center"
            ><IconsGit class="mr-2" /> manikandareas</span
          >
          <span class="flex text-base text-slate-300 items-center"
            ><IconsLinkedin class="mr-2" /> Vito Andareas Manik</span
          >
          <span class="flex text-base text-slate-300 items-center"
            ><IconsInstagram class="mr-2" /> manikandareas</span
          >
        </div>
        <span class="w-full border-t border-zinc-500 inline-block" />
      </div>
    </div>

    <!-- second -->
    <div class="flex gap-4">
      <div class="border w-[324px]"></div>
      <UIPostsProfilesContent>
        <UIPostsOverview
          v-for="post in mockPosts"
          data-aos-once="true"
          data-aos="zoom-in"
          data-aos-duration="300"
          :avatar-img-url="post.avatarImgUrl"
          :cover-img-url="post.coverImgUrl"
          :name-owner-posts="post.nameOwnerPosts"
          :reaction-posts="post.reactionsPosts"
          :tag-posts="post.tagPosts"
          :title-posts="post.titlePosts"
          :views-posts="post.viewsPosts"
        />
      </UIPostsProfilesContent>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { PropsBlogPosts as PropsPosts } from "~/types/blog";
import posts from "~/data/mockPosts";

const mockPosts = ref<PropsPosts[]>(posts);

definePageMeta({
  layout: "blog",
});
</script>

<style></style>
~/data/mockPosts
