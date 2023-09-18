<template>
  <main class="w-full bg-black">
    <section
      class="relative w-full max-w-[992px] min-h-screen mx-auto text-white pt-4 pb-16 md:pt-[150px] md:pb-14 space-y-8"
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
        <div class="items-center flex flex-col space-y-6 h-auto">
          <h1 class="text-3xl font-bold">Vito Andareas Manik</h1>
          <p class="text-xl font-medium">
            {{ profile.bio }}
          </p>
          <div class="flex space-x-6 justify-center">
            <NuxtLink
              :to="profile.github_url"
              target="_blank"
              class="flex text-base text-slate-300 items-center"
              v-if="profile.github_url"
              ><IconsGit class="mr-2" />
              {{ getTitleFromURL(profile.github_url) }}</NuxtLink
            >
            <NuxtLink
              :to="profile.linkedin_url"
              target="_blank"
              class="flex text-base text-slate-300 items-center"
              v-if="profile.linkedin_url"
              ><IconsLinkedin class="mr-2" />
              {{ getTitleFromURL(profile.linkedin_url) }}</NuxtLink
            >
            <NuxtLink
              :to="profile.instagram_url"
              target="_blank"
              class="flex text-base text-slate-300 items-center"
              v-if="profile.instagram_url"
              ><IconsInstagram class="mr-2" />
              {{ getTitleFromURL(profile.instagram_url) }}</NuxtLink
            >
            <NuxtLink
              :to="profile.website_url"
              target="_blank"
              class="flex text-base text-slate-300 items-center"
              title="Go to my website"
              v-if="profile.website_url"
              ><IconsShare
            /></NuxtLink>
          </div>
          <span class="w-full border-t border-zinc-500 inline-block" />
          <div class="w-full h-full flex items-center justify-center space-x-4">
            <div class="flex space-x-2 items-center mt-3">
              <IconsBirthday />
              <span> {{ generateJoinedDate(profile.created_at) }}</span>
            </div>
            <div class="flex space-x-2 items-center mt-3">
              <IconsEarth />
              <span> {{ profile.location }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- second -->
      <div class="w-full">
        <UIPostsProfilesContent>
          <UIPostsOverview
            v-if="posts?.length! > 0"
            v-for="(post,index) in (posts as PropsPosts[])"
            data-aos-once="true"
            data-aos="zoom-in"
            data-aos-duration="300"
            :key="index"
            :avatar-img-url="post.user.avatar_url || 'https://placehold.co/40'"
            :cover-img-url="post.cover_image_url"
            :name-owner-posts="post.user.name!"
            :reaction-posts="post.stars"
            :tag-posts="post.tags"
            :title-posts="post.title"
            :views-posts="post.views"
          />
          <div
            v-else
            class="w-full flex justify-center items-center text-xl text-zinc-400 bg-zinc-900 rounded-lg h-24"
          >
            <strong>You haven't uploaded anything at all 😱</strong>
          </div>
        </UIPostsProfilesContent>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { PropsBlogPosts as PropsPosts } from "~/types/blog";

const client = useSupabase();
const user = useSupabaseUser();
const route = useRoute();

const { useFetchPostsByUsername } = useBlog();

const { useSelectProfile } = useProfile();

const username = route.params.username as string;

const {
  data: { user: payloadUser },
} = await client.auth.getUser();

const { data: profile } = await useSelectProfile(payloadUser?.id!);

const { data: posts } = await useFetchPostsByUsername(username);

const enableCustomLayout = () => {
  if (!user.value) {
    setPageLayout("auth");
  } else {
    setPageLayout("blog");
  }
};

onBeforeMount(() => {
  enableCustomLayout();
});

definePageMeta({
  layout: false,
});
</script>

<style></style>
