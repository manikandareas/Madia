<template>
  <AppPostContainer>
    <AppPostAsideActions />

    <AppPostContent>
      <!-- main -->
      <AppPostPosts
        :avatar-img-url="posts?.user.avatar_url || 'https://placehold.co/40'"
        :cover-img-url="posts?.cover_image_url"
        :name-owner-posts="posts?.user.username!"
        :tag-posts="posts?.tags"
        :title-posts="posts?.title!"
        :views-posts="posts?.views!"
        :descriptions="posts?.descriptions!"
        :created-at="timeFormatter(posts?.created_at!)"
        :post_id="+posts?.id!"
      />
    </AppPostContent>
    <!-- end content -->
  </AppPostContainer>
</template>

<script lang="ts" setup>
const route = useRoute();
const postId = route.params.postsId as string;

const { useFetchSinglePosts, useIncreaseViews } = usePosts();

const { data: posts, error } = await useFetchSinglePosts(+postId);

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
