<template>
  <AppProfilesContainer>
    <!-- header -->
    <AppProfilesHeader :profile="profile" />
    <!-- content -->
    <AppProfilesContent>
      <AppProfilesPosts
        v-if="posts?.length! > 0"
        v-for="(post,index) in (posts as RowPosts[])"
        data-aos-once="true"
        data-aos="zoom-in"
        data-aos-duration="300"
        :key="index"
        :avatar-img-url="post.user.avatar_url || 'https://placehold.co/40'"
        :cover-img-url="post.cover_image_url!"
        :name-owner-posts="post.user.name!"
        :reaction-posts="post.stars"
        :tag-posts="post.tags"
        :title-posts="post.title"
        :views-posts="post.views!"
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

const client = useSupabase();
const user = useSupabaseUser();
const route = useRoute();

const { useFetchPostsByUsername } = usePosts();

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
