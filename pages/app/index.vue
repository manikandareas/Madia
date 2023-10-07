<template>
  <AppHomeContainer>
    <!-- aside left -->
    <AppHomeAsideTags>
      <div class="w-full flex flex-col p-4 space-y-2">
        <h4 class="font-bold text-xl">🏷️ Tags</h4>
        <ul class="flex flex-col space-y-2">
          <li v-for="tag in listOfTags" :key="tag.id">
            <nuxt-link
              :to="`?tags=${tag.tag}`"
              class="hover:underline hover:text-green-500 cursor-pointer"
              ><span :style="{ color: tag.color }">#</span>
              {{ tag.tag }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </AppHomeAsideTags>
    <!-- end aside left -->
    <!-- content -->
    <AppHomeContent>
      <AppHomePosts
        v-for="post in ( payload as RowPosts[])"
        :key="post.title"
        :avatar-img-url="post.user.avatar_url || 'https://placehold.co/40'"
        :cover-img-url="post.cover_image_url!"
        :name="post.user.name!"
        :title-posts="post.title"
        :views-posts="post.views!"
        :username="post.user.username"
        :post_id="+post.id"
        :user_id="post.user.id"
        :tag-posts="post.tags"
        :posts_url="post.posts_url!"
        :created-at="timeFormatter(post.created_at)"
      />
    </AppHomeContent>
    <!-- end content -->
    <AppHomeAsideTopTags>
      <AppHomeTopTags
        v-for="tag in topTags"
        :tag="tag.tag"
        :posts="tag.posts"
      />
    </AppHomeAsideTopTags>
    <!-- aside right -->
  </AppHomeContainer>
</template>

<script setup lang="ts">
import { RowPosts } from "~/types/posts";

// TODO: schema fetch posts
const { useFetchAllPosts, useGetListsTags } = usePosts();

const { data: payload, error } = await useFetchAllPosts();

const { data: listOfTags } = await useGetListsTags();
console.log(payload);

const topTags: Array<{
  tag: string;
  posts: Array<{ title: string; URL: string }>;
}> = [
  {
    tag: "discuss",
    posts: [
      { title: "Meme Monday", URL: "#" },
      { title: 'Throw away the "Script" from "Type"Script"', URL: "#" },
      { title: "JSDoc in JS and TS", URL: "#" },
      { title: "Web-AR: Shaping the Future of Marketing in 2023", URL: "#" },
    ],
  },
  {
    tag: "watercooler",
    posts: [
      { title: "Meme Monday", URL: "#" },
      { title: "What Crazy idea Actually Worked?", URL: "#" },
      { title: "7 Questions SaaS founders must answer", URL: "#" },
    ],
  },
];

const user = useSupabaseUser();
// TODO : Filtering posts by tags
// const queryOfURL = ref(route.query.tags);

// const { data } = await useFetchAllPostsWhereTags(route.query.tags as string);
// console.log("Sedang pengambilan data");

// filteredPosts.value = data;

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
