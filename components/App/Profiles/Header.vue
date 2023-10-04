<template>
  <header class="w-full h-[364px] rounded-lg relative bg-zinc-900">
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
      <h1 class="text-3xl font-bold">{{ profile?.name }}</h1>
      <p class="text-xl font-medium">
        {{ profile?.bio }}
      </p>
      <div class="flex space-x-6 justify-center">
        <NuxtLink
          :to="profile?.github_url"
          target="_blank"
          class="flex text-base text-slate-300 items-center"
          v-if="profile?.github_url"
          ><IconsGit class="mr-2" />
          {{ getTitleFromURL(profile.github_url) }}</NuxtLink
        >
        <NuxtLink
          :to="profile?.linkedin_url"
          target="_blank"
          class="flex text-base text-slate-300 items-center"
          v-if="profile?.linkedin_url"
          ><IconsLinkedin class="mr-2" />
          {{ getTitleFromURL(profile.linkedin_url) }}</NuxtLink
        >
        <NuxtLink
          :to="profile?.instagram_url"
          target="_blank"
          class="flex text-base text-slate-300 items-center"
          v-if="profile?.instagram_url"
          ><IconsInstagram class="mr-2" />
          {{ getTitleFromURL(profile.instagram_url) }}</NuxtLink
        >
        <NuxtLink
          :to="profile?.website_url"
          target="_blank"
          class="flex text-base text-slate-300 items-center"
          title="Go to my website"
          v-if="profile?.website_url"
          ><IconsShare
        /></NuxtLink>
      </div>
      <span class="w-full border-t border-zinc-500 inline-block" />
      <div class="w-full h-full flex items-center justify-center space-x-4">
        <div class="flex space-x-2 items-center mt-3">
          <IconsBirthday />
          <span> {{ generateJoinedDate(profile?.created_at!) }}</span>
        </div>
        <div class="flex space-x-2 items-center mt-3">
          <IconsEarth />
          <span> {{ profile?.location }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
type Profile = {
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  email: string | null;
  github_url: string | null;
  id: string;
  instagram_url: string | null;
  linkedin_url: string | null;
  location: string | null;
  name: string | null;
  posts_id: number | null;
  username: string | null;
  website_url: string | null;
};

defineProps({
  profile: {
    type: Object as () => Profile,
    required: true,
  },
});
</script>
