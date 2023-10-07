<template>
  <AppProfilesContainer>
    <!-- header -->
    <AppProfilesHeader :profile="profile" />
    <!-- content -->
    <AppProfilesContent>
      <AppProfilesPosts
        v-if="posts?.length! > 0"
        v-for="(post) in (posts as RowPosts[])"
        data-aos-once="true"
        data-aos="zoom-in"
        data-aos-duration="300"
        :key="post.title"
        :avatar-img-url="post.user.avatar_url || 'https://placehold.co/40'"
        :cover-img-url="post.cover_image_url!"
        :name="post.user.name!"
        :title-posts="post.title"
        :views-posts="post.views!"
        :username="post.user.username"
        :post_id="+post.id"
        :tag-posts="post.tags"
        :posts_url="post.posts_url!"
        :created-at="timeFormatter(post.created_at)"
        :descriptions="post.descriptions!"
      />
      <div
        v-else
        class="w-full flex justify-center items-center text-xl text-zinc-400 bg-zinc-900 rounded-lg h-24"
      >
        <strong>You haven't uploaded anything at all 😱</strong>
      </div>
    </AppProfilesContent>
  </AppProfilesContainer>
</template>

<script lang="ts" setup>
import { RowPosts } from "~/types/posts";
const route = useRoute();
const user = useSupabaseUser();
const userId = ref(route.params?.userId! as string);
const { useFetchPostsByID } = usePosts();

const { useSelectProfileByID } = useProfile();

const { data: profile } = await useSelectProfileByID(
  route.params.userId! as string
);

const { data: posts } = await useFetchPostsByID(route.params.userId! as string);

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
