<template>
  <div class="dark:bg-zinc-900 text-white rounded-lg">
    <div class="flex flex-col">
      <!-- cover image -->
      <div class="w-full max-h-[250px] overflow-hidden" v-if="coverImgUrl">
        <NuxtImg
          :src="props.coverImgUrl"
          class="object-cover w-full rounded-lg"
        />
      </div>
      <!-- header blog -->
      <div class="p-6 space-y-2">
        <div class="flex items-center space-x-3">
          <div>
            <NuxtImg
              :src="avatarImgUrl"
              class="rounded-full max-h-[40px] object-cover"
            />
          </div>
          <div class="leading-[17px]">
            <div class="flex space-x-2 items-center">
              <h3>{{ props.nameOwnerPosts }}</h3>
              <IconsVerified v-if="props.verified" />
            </div>
            <small class="text-slate-300">Aug 30 (1 day ago)</small>
          </div>
        </div>

        <!-- content blog -->
        <div class="md:px-[52px] space-y-2">
          <NuxtLink :to="postsLink">
            <h1
              class="font-bold text-xl md:text-3xl hover:underline focus:underline"
            >
              {{ props.titlePosts }}
            </h1>
          </NuxtLink>
          <!-- tag -->
          <div class="flex space-x-4 text-slate-300">
            <small
              v-if="props.tagPosts"
              v-for="tag in props.tagPosts"
              :key="tag"
              >#{{ tag }}</small
            >
          </div>
        </div>

        <!-- footer blog -->
        <div class="md:px-[52px] flex space-x-4">
          <div
            class="text-sm font-semibold flex items-center"
            title="give reactions"
          >
            <IconsStars class="mr-2" /> {{ props.reactionPosts }} Reactions
          </div>

          <div class="flex flex-1 items-center">
            <IconsComment class="mr-2" /> Comments
          </div>

          <div class="flex items-center font-semibold" title="viewed 50 times">
            <IconsSeen class="mr-2" /> {{ props.viewsPosts }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  coverImgUrl: {
    type: String,
  },
  avatarImgUrl: {
    type: String,
    default: "https://placehold.co/40",
  },
  nameOwnerPosts: {
    type: String,
    required: true,
  },
  titlePosts: {
    type: String,
    required: true,
  },
  tagPosts: {},
  reactionPosts: {
    type: Number,
    default: 0,
  },
  viewsPosts: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const postsLink = `/app/${props.nameOwnerPosts}/${props.titlePosts}`;
</script>
