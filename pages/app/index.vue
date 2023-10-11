<template>
  <AppHomeContainer>
    <!-- aside left -->
    <AppHomeAsideTags>
      <div class="w-full flex flex-col p-4 space-y-2">
        <h4 class="font-bold text-xl">🏷️ Tags</h4>
        <ul class="flex flex-col space-y-2">
          <li>
            <button
              type="button"
              @click="handlerFilterTags('all')"
              class="hover:underline hover:text-green-500 cursor-pointer"
            >
              <span class="text-green-500">#</span> All Posts
            </button>
          </li>
          <li v-for="tag in listOfTags" :key="tag.id">
            <button
              type="button"
              @click="handlerFilterTags(tag.tag)"
              class="hover:underline hover:text-green-500 cursor-pointer"
            >
              <span :style="{ color: tag.color }">#</span> {{ tag.tag }}
            </button>
          </li>
        </ul>
      </div>
    </AppHomeAsideTags>
    <!-- end aside left -->
    <!-- content -->
    <AppHomeContent>
      <AppHomePosts
        v-for="post in ((secondPostsFromQuery?.length! > 0 ? secondPostsFromQuery : listOfPosts) as RowPosts[])"
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
const { useFetchAllPosts, useGetListsTags, useFetchSinglePosts } = usePosts();

const { data: listOfTags } = await useGetListsTags();

const client = useSupabase();

const listOfPosts = ref<RowPosts[]>();

// const queryOfPosts = ref<RowPosts[]>();

const { data: payload, error } = await useFetchAllPosts();
listOfPosts.value = payload;

const secondPostsFromQuery = ref<RowPosts[]>();

const posts = client
  .channel("custom-insert-channel")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "posts" },
    async (raw) => {
      const { data: sPost } = await useFetchSinglePosts(raw.new.id);

      if (raw.new) {
        listOfPosts.value = [sPost!, ...listOfPosts.value!];
      }
    }
  )
  .subscribe();

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

const enableCustomLayout = () => {
  if (!user.value) {
    setPageLayout("auth");
  } else {
    setPageLayout("blog");
  }
};

// const route = useRoute();
// const router = useRouter();

const handlerFilterTags = async (qTag: string) => {
  if (qTag !== "all") {
    secondPostsFromQuery.value = listOfPosts.value?.filter((post) =>
      post.tags.map((tag) => tag.tag).includes(qTag)
    );
  } else {
    secondPostsFromQuery.value = [];
    const { data, error } = await useFetchAllPosts();
    listOfPosts.value = data;
  }
};

onBeforeMount(() => {
  enableCustomLayout();
});

definePageMeta({
  layout: false,
});
</script>
