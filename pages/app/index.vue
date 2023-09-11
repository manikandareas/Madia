<template>
  <UIPostsContainer>
    <!-- aside left -->
    <UIPostsLeft></UIPostsLeft>
    <!-- end aside left -->
    <!-- content -->
    <UIPostsContent>
      <HLMenu as="div" class="relative inline-block text-white z-[50]">
        <HLMenuButton>Filter</HLMenuButton>
        <HLMenuItems
          class="flex absolute flex-col bg-zinc-950/80 backdrop-blur-md p-4 rounded-md font-bold space-y-4 max-w-fit"
        >
          <HLMenuItem v-slot="{ active }">
            <button
              type="button"
              :class="{ 'bg-blue-500': active }"
              @click="filtered = null"
            >
              Default
            </button>
          </HLMenuItem>
          <HLMenuItem v-slot="{ active }">
            <button
              type="button"
              :class="{ 'bg-blue-500': active }"
              @click="handleFilter('webdev')"
            >
              Webdev
            </button>
          </HLMenuItem>
          <HLMenuItem v-slot="{ active }">
            <button
              type="button"
              :class="{ 'bg-blue-500': active }"
              @click="handleFilter('kotlin')"
            >
              Kotlin
            </button>
          </HLMenuItem>
          <HLMenuItem v-slot="{ active }">
            <button
              type="button"
              :class="{ 'bg-blue-500': active }"
              @click="handleFilter('javascript')"
            >
              Javascript
            </button>
          </HLMenuItem>
        </HLMenuItems>
      </HLMenu>
      <UIPostsOverview
        v-for="post in filtered ? filtered : mockPosts"
        data-aos="zoom-in"
        data-aos-duration="300"
        data-aos-once="true"
        :avatar-img-url="post.avatarImgUrl"
        :cover-img-url="post.coverImgUrl"
        :name-owner-posts="post.nameOwnerPosts"
        :reaction-posts="post.reactionsPosts"
        :tag-posts="post.tagPosts"
        :title-posts="post.titlePosts"
        :views-posts="post.viewsPosts"
        :verified="post.verified"
      />
    </UIPostsContent>
    <!-- end content -->
    <!-- aside right -->
    <UIPostsRight></UIPostsRight>
    <!-- end aside right -->
  </UIPostsContainer>
</template>

<script setup lang="ts">
import { PropsBlogPosts as PropsPosts } from "~/types/blog";
import posts from "~/data/mockPosts";

const filtered = ref<PropsPosts[] | null>();
const handleFilter = (x: string) => {
  filtered.value = posts.filter((item) =>
    item.tagPosts.includes(x.toLocaleLowerCase())
  );
};

const client = useSupabase();

// TODO: schema fetch posts
const { useFetchAllPosts } = useBlog();

const { data, error } = await useFetchAllPosts();

onMounted(() => {
  console.log(data);
});

/* TODO: schema stars
   if user_id in stars.user_id -> unlike : push user_id to stars.user_id -> like
   Qty views = stars.user_id.length

   s
*/

/* TODO: schema views 
  const client = useSupabase()
  let { data, error } = await 
    client.rpc('increment_view', {
      row_id
    })
    if (error) console.error(error)
    else console.log(data)
*/

// TODO: Process created_at to format time ex. Aug 30(1 day ago)

// TODO: Implement infinite scroll

// TODO: Implement realtime views and stars

const mockPosts = ref<PropsPosts[]>(posts);

definePageMeta({
  layout: "blog",
});
</script>
~/data/mockPosts
