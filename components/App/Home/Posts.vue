<template>
  <article class="bg-zinc-900 text-white rounded-lg">
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
          <div class="overflow-hidden max-w-[40px]">
            <NuxtImg
              :src="avatarImgUrl"
              class="rounded-full max-h-[40px] overflow-hidden"
            />
          </div>
          <div class="leading-[17px]">
            <div class="flex space-x-2 items-center">
              <NuxtLink
                :to="`/app/${props.user_id}`"
                class="text-xl hover:underline"
                >{{ props.name }}</NuxtLink
              >
              <IconsVerified v-if="props.verified" />
            </div>
            <small class="text-slate-300">{{ props.createdAt }}</small>
          </div>
        </div>

        <!-- content blog -->
        <div class="md:px-[52px] space-y-2">
          <NuxtLink :to="props.posts_url || '/app'">
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
              v-for="tag in (props.tagPosts as RowTags[])"
              :key="tag.id"
              ><span :style="{ color: tag.color }"># </span>{{ tag.tag }}</small
            >
          </div>
        </div>

        <!-- footer blog -->

        <div class="md:px-[52px] flex space-x-4">
          <ClientOnly>
            <button
              class="text-sm font-semibold flex items-center"
              title="give reactions"
              type="button"
              @click="
                () =>
                  user
                    ? handlerStars()
                    : $toast.warning('Not now... you\'re not logged in yet 😵')
              "
            >
              <IconsStars
                class="mr-2"
                :style="{
                  color:
                    statusStars.isUserReadyStars && user ? 'yellow' : 'white',
                }"
              />
              {{ stars }}
              Stars
            </button>
          </ClientOnly>
          <div class="flex flex-1 items-center">
            <IconsComment class="mr-2" /> Comments
          </div>

          <div class="flex items-center font-semibold" title="viewed 50 times">
            <IconsSeen class="mr-2" /> {{ props.viewsPosts }}
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
const props = defineProps({
  coverImgUrl: {
    type: String,
  },
  avatarImgUrl: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  titlePosts: {
    type: String,
    required: true,
  },
  tagPosts: {},
  viewsPosts: {
    type: Number,
    default: 0,
  },
  post_id: {
    type: Number,
  },
  createdAt: {
    type: String,
  },
  posts_url: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: String,
    required: true,
  },
});

import { RowTags } from "~/types/tags";

const user = useSupabaseUser();
const client = useSupabase();
const {
  data: { user: privateData },
  error: privateError,
} = await client.auth.getUser();

const { useHandlerStars, useCountStarsWherePostID, useStatusStars } =
  usePosts();

const stars = ref(0);

const statusStars = reactive({
  isUserReadyStars: false,
});

const updateStatusStars = async () => {
  let { data, error } = await useStatusStars(props.post_id!, privateData?.id!);
  statusStars.isUserReadyStars = data!;
};

const countingStars = async () => {
  stars.value = await useCountStarsWherePostID(props.post_id!).then(
    (r) => r.data!
  );
};

const handlerStars = async () => {
  await updateStatusStars();
  if (statusStars.isUserReadyStars) {
    await useHandlerStars(props.post_id!, privateData?.id!);
    stars.value -= 1;
  } else {
    await useHandlerStars(props.post_id!, privateData?.id!);
    stars.value += 1;
  }
};

onBeforeMount(async () => {
  await updateStatusStars();
});

onBeforeMount(async () => {
  await countingStars();
});

watch(stars, async (newPayload, oldPayload) => {
  await updateStatusStars();
});
</script>
