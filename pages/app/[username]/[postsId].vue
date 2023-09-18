<template>
  <main class="w-full bg-black">
    <section
      class="relative max-w-6xl min-h-screen mx-auto text-white pt-4 pb-16 md:pt-20 md:pb-14 flex gap-x-6"
    >
      <!-- action left -->
      <UIPostsDetailsLeftActions />
      <!-- end action left -->
      <!-- content -->
      <div class="w-full">
        <div class="flex flex-col overflow-hidden gap-y-4 rounded-lg">
          <!-- main -->
          <UIPostsDetailsContent
            :avatar-img-url="
              posts?.user.avatar_url || 'https://placehold.co/40'
            "
            :cover-img-url="posts?.cover_image_url"
            :name-owner-posts="posts?.user.username!"
            :tag-posts="posts?.tags"
            :title-posts="posts?.title!"
            :views-posts="posts?.views!"
            :descriptions="posts?.descriptions!"
            :created-at="timeFormater(posts?.created_at!)"
            :post_id="+posts?.id!"
          />
        </div>
      </div>
      <!-- end content -->
      <!-- aside right -->

      <!-- end aside right -->
    </section>
  </main>
</template>

<script lang="ts" setup>
import { PropsBlogPosts } from "~/types/blog";
const data = ref<PropsBlogPosts>();

const route = useRoute();
const postId = route.params.postsId as string;

const { useFetchSinglePosts } = useBlog();

const { data: posts, error } = await useFetchSinglePosts(+postId);

const { useIncreaseViews } = useBlog();

onMounted(() => {
  setTimeout(() => {
    useIncreaseViews(+postId);
  }, 1000 * 120);
});

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

<style></style>
