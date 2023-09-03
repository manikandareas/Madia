<template>
  <UIPostsContainer>
    <!-- aside left -->
    <UIPostsLeft></UIPostsLeft>
    <!-- end aside left -->
    <!-- content -->
    <UIPostsContent>
      <UIPostsOverview
        v-for="post in mockPosts"
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

const mockPosts = ref<PropsPosts[]>(posts);

definePageMeta({
  layout: "blog",
});
</script>
~/data/mockPosts
