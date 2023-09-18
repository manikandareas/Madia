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
            <button type="button" :class="{ 'bg-blue-500': active }">
              Default
            </button>
          </HLMenuItem>
          <HLMenuItem v-slot="{ active }">
            <button type="button" :class="{ 'bg-blue-500': active }">
              Webdev
            </button>
          </HLMenuItem>
          <HLMenuItem v-slot="{ active }">
            <button type="button" :class="{ 'bg-blue-500': active }">
              Kotlin
            </button>
          </HLMenuItem>
          <HLMenuItem v-slot="{ active }">
            <button type="button" :class="{ 'bg-blue-500': active }">
              Javascript
            </button>
          </HLMenuItem>
        </HLMenuItems>
      </HLMenu>
      <UIPostsOverview
        v-for="post,id in (payload as PropsPosts[])"
        :key="id"
        :avatar-img-url="post.user.avatar_url || 'https://placehold.co/40'"
        :cover-img-url="post.cover_image_url"
        :name-owner-posts="post.user.username!"
        :title-posts="post.title"
        :views-posts="post.views"
        :username="post.user.username"
        :post_id="+post.id"
        :created-at="timeFormater(post.created_at)"
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
import { timeFormater } from "~/utils/timeFormater";

// const filtered = ref<PropsPosts[] | null>();
// const handleFilter = (x: string) => {
//   filtered.value = posts.filter((item) =>
//     item.tagPosts.includes(x.toLocaleLowerCase())
//   );
// };

// TODO: schema fetch posts
const { useFetchAllPosts, useCountStars } = useBlog();

const { data: payload, error } = await useFetchAllPosts();

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

// const mockPosts = ref<PropsPosts[]>(posts);
const user = useSupabaseUser();

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
