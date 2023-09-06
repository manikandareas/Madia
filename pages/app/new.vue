<template>
  <main class="text-white">
    <div
      name="wrapper"
      class="relative w-full max-w-7xl min-h-screen mx-auto pt-4 pb-16 md:pt-[150px] md:pb-14 space-y-4"
    >
      <div class="w-full flex justify-start space-x-6">
        <button
          @click="tabs.activeTab = 'tab-1'"
          :class="{
            'text-white border border-white/75': tabs.activeTab === 'tab-1',
          }"
          class="text-slate-400 font-semibold active:text-white hover:text-white border border-transparent rounded-md px-4 py-2"
        >
          Edit
        </button>
        <button
          @click="tabs.activeTab = 'tab-2'"
          :class="{
            'text-white border border-white/75': tabs.activeTab === 'tab-2',
          }"
          class="text-slate-400 font-semibold active:text-white hover:text-white border border-transparent rounded-md px-4 py-2"
        >
          Preview
        </button>
      </div>
      <form
        v-if="tabs.activeTab === 'tab-1'"
        class="bg-zinc-900 rounded-lg md:max-w-6xl md:px-14 py-8 space-y-4 mx-auto"
        data-aos="fade-right"
        data-aos-duration="200"
      >
        <!-- <div>
          <NuxtImg v-if="imageUrl.publicUrl" :src="imageUrl.publicUrl" v />
        </div> -->
        <div class="flex flex-col space-y-4">
          <!-- <button
            type="button"
            class="px-4 py-2 bg-transparent border font-bold w-fit border-slate-400 rounded-lg"
          >
            Add a cover image
            <input type="file" class="sr-only" />
          </button> -->
          <!-- create input image -->
          <input
            type="file"
            accept="image/png, image/jpeg"
            @change="(e) => {
              const target = e.target as HTMLInputElement
            }"
          />
          <input
            type="text"
            placeholder="New post title here..."
            v-model="form.title"
            class="border-none outline-none placeholder:font-extrabold font-extrabold min-h-[60px] text-4xl placeholder:text-zinc-600 bg-transparent"
          />
        </div>
        <Editor plugins="" v-model="form.textArea" :api-key="TINYMCE_KEY" />
        <div class="space-x-3">
          <button
            type="button"
            @click="handleSubmit"
            class="px-4 py-2 font-bold w-fit bg-green-500 text-white rounded-lg"
          >
            Publish
          </button>
          <button
            @click="tabs.activeTab = 'tab-2'"
            type="button"
            class="px-4 py-2 font-medium w-fit bg-transparent text-slate-400"
          >
            Preview
          </button>
        </div>
      </form>
      <div
        v-if="tabs.activeTab === 'tab-2'"
        class="bg-zinc-900 rounded-lg md:max-w-6xl md:px-14 py-8 md:min-h-[500px] mx-auto"
        data-aos="fade-left"
        data-aos-duration="200"
      >
        <h1 v-html="form.title" class="mb-4" />

        <div v-html="form.textArea" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";

const form = ref({
  title: "",
  textArea: "",
});

const config = useRuntimeConfig();

const TINYMCE_KEY = config.public.TINYMCE_KEY;

const tabs = ref({
  activeTab: "tab-1",
});

const client = useSupabaseClient();

const {
  data: { user },
} = await client.auth.getUser();

const id = user?.id;

/**
 * Handles the form submission.
 *
 * This function uploads a cover image to the "madia" storage collection.
 * If the upload is successful, it handles success.
 * If there is an error during the upload, it handles the error.
 */
const handleSubmit = async () => {
  // Upload the cover image to the "madia" storage collection
  const { data, error } = await client.storage
    .from("madia")
    .upload(`${id}/cover_posts/cover.png`, "");

  // Check if there was an error during the upload
  if (error) {
    // Handle error
    console.log("Error:", error);
  } else {
    // Handle success
    console.log("Upload successful:", data);
  }
};

definePageMeta({
  layout: "blog",
});

useHead({
  link: [{ rel: "stylesheet", href: "~/assets/css/blog.scss" }],
});

watch(form.value, (newValue) => {
  form.value.textArea = newValue.textArea;
});

onUnmounted(() => {
  form.value.textArea = "";
});
</script>
