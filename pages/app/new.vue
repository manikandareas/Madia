<template>
  <main class="text-white">
    <HLTabGroup
      as="div"
      name="wrapper"
      class="relative w-full max-w-7xl min-h-screen mx-auto pt-4 pb-16 md:pt-[80px] md:pb-14 space-y-4"
    >
      <HLTabList class="w-full flex justify-end space-x-6">
        <HLTab
          class="px-4 py-2 bg-transparent rounded-md ui-selected:border border-zinc-500 outline-none"
        >
          Edit
        </HLTab>
        <HLTab
          class="px-4 py-2 bg-transparent rounded-md ui-selected:border border-zinc-500 outline-none"
        >
          Preview
        </HLTab>
      </HLTabList>
      <HLTabPanels>
        <HLTabPanel as="div" class="flex space-x-4">
          <form
            @submit.prevent="onSubmitPress"
            class="bg-zinc-900 rounded-lg min-w-[810px] mx-auto overflow-hidden"
            data-aos="fade-right"
            data-aos-duration="200"
          >
            <!-- <div class="w-full max-w-[1000px] max-h-[420px] overflow-hidden">
            <NuxtImg
              v-if="validateImg.dURL"
              :src="validateImg.dURL"
              class="mx-auto"
            />
          </div> -->
            <div class="space-y-4 py-8">
              <div class="md:px-14 flex flex-col space-y-4">
                <div>
                  <button
                    @click.prevent="open = true"
                    type="button"
                    class="px-4 py-2 bg-transparent border border-zinc-500 rounded-md font-semibold"
                  >
                    Add a cover image
                  </button>
                  <ClientOnly>
                    <DashboardModal
                      :uppy="uppy"
                      :open="open"
                      :plugins="[ProgressBar, StatusBar, DragDrop]"
                      :props="{
                        onRequestCloseModal: handleClose,
                      }"
                      :theme="'dark'"
                    />
                  </ClientOnly>
                </div>
                <input
                  required
                  type="text"
                  placeholder="New post title here..."
                  aria-errormessage="Halo Semua"
                  v-model="form.title"
                  class="border-none outline-none placeholder:font-extrabold font-extrabold min-h-[60px] text-4xl placeholder:text-zinc-600 bg-transparent"
                  @focus="inputActive = 'title'"
                />
              </div>
              <ClientOnly>
                <!-- @vue-ignore -->
                <MdEditor
                  @focus="inputActive = 'descriptions'"
                  v-model="form.descriptions"
                  theme="dark"
                  :preview="false"
                  :toolbars="toolbars"
                  :md-heading-id="mdHeadingId"
                  :language="'en-US'"
                  :footers="['markdownTotal', '=']"
                />
              </ClientOnly>
              <div class="md:px-14">
                <button
                  v-if="!isLoading"
                  type="submit"
                  class="px-4 py-2 font-bold w-fit bg-green-500 text-white rounded-lg"
                >
                  Publish
                </button>
                <UIButtonLoading v-else />
              </div>
            </div>
          </form>
          <aside class="flex flex-col justify-around">
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              class="max-w-[70%]"
              :style="{
                visibility: inputActive === 'title' ? 'visible' : 'hidden',
              }"
            >
              <h3 class="text-xl">Writing a Great Post Title</h3>
              <p class="text-zinc-500">
                Think of your post title as a super short (but compelling!)
                description — like an overview of the actual post in one short
                sentence. Use keywords where appropriate to help ensure people
                can find your post by search.
              </p>
            </div>
            <div
              class="max-w-[70%]"
              :style="{
                visibility:
                  inputActive === 'descriptions' ? 'visible' : 'hidden',
              }"
            >
              <h3 class="text-xl">Editor Basics</h3>
              <p class="text-zinc-500">
                Use <a href="#" class="text-blue-400">Markdown</a> to write and
                format posts. Minus pariatur praesentium accusamus quibusdam
                cupiditate explicabo nihil! Ipsam explicabo accusantium
                consequuntur.
              </p>
            </div>
          </aside>
        </HLTabPanel>
        <HLTabPanel>
          <section
            class="bg-zinc-900 rounded-lg max-w-[1000px] md:px-14 py-8 md:min-h-[500px] mx-auto"
            data-aos="fade-left"
            data-aos-duration="200"
          >
            <h1 v-html="form.title" class="mb-4" />

            <MdPreview
              :model-value="form.descriptions"
              :theme="'dark'"
              style="background-color: #18181b"
            />
          </section>
        </HLTabPanel>
      </HLTabPanels>
    </HLTabGroup>
  </main>
</template>

<script setup lang="ts">
// MD Editor
import { MdEditor, MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import "md-editor-v3/lib/preview.css";
// Uppy JS
import { ProgressBar, StatusBar, DragDrop, DashboardModal } from "@uppy/vue";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.css";
import "@uppy/status-bar/dist/style.min.css";
import "@uppy/progress-bar/dist/style.min.css";
import "@uppy/dashboard/dist/style.css";
const client = useSupabase();

const config = useRuntimeConfig();

const PROJECTID = config.public.SUPABASE_PROJECT_ID;

const form = reactive({
  title: "",
  descriptions: "",
  cover_image_url: "",
  user: "",
});
const TOKEN = config.public.SUPABASE_ANON_KEY;
const bucketName = "madia";
const {
  data: { user },
} = await client.auth.getUser();
const folderName = user?.id;
const { useGetPublicURL, useUploadCover, useInsertPosts } = usePosts();

const supabaseUploadURL = `https://${PROJECTID}.supabase.co/storage/v1/upload/resumable`;
const uppy = new Uppy().use(Tus, {
  endpoint: supabaseUploadURL,
  headers: {
    authorization: `Bearer ${TOKEN}`,
  },
  chunkSize: 6 * 1024 * 1024,
  allowedMetaFields: [
    "bucketName",
    "objectName",
    "contentType",
    "cacheControl",
  ],
});

uppy.setOptions({
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 512000,
  },
});

const uppyImage = ref();

uppy.on("file-added", (file) => {
  file.meta = {
    ...file.meta,
    bucketName: bucketName,
    objectName: folderName
      ? `${folderName}/coverImage/${file.name}`
      : file.name,
    contentType: file.type,
  };
  uppyImage.value = file.data;
});

uppy.on("complete", (result) => {
  console.log(
    "Upload complete! We’ve uploaded these files:",
    result.successful
  );
});

const open = ref(false);

const handleClose = () => {
  open.value = false;
};

const mdHeadingId = (_text: string, _level: string, index: string) =>
  `H-${index}`;

const toolbars = ref<string[]>([
  "bold",
  "underline",
  "italic",
  "-",
  "title",
  "quote",
  "orderedList",
  "unorderedList",
  "task",
  "-",
  "code",
  "codeRow",
  "link",
  "-",
  "prettier",
  "=",
  "pageFullscreen",
]);

const inputActive = ref("");

const isLoading = ref(false);

const router = useRouter();

const onSubmitPress = async () => {
  form.user = (await client.auth.getUser()).data.user?.id!;

  // validate cover image make sure its less than 500kb & passed nsfw
  // const nameCoverImage = `${form.user_id}/cover_posts/${new Date().getTime()}-${
  //   form.title
  // }.png`;

  //  upload image to bucket
  // const { error: errorUploadingCover } = await useUploadCover({
  //   fileImage: validateImg.file!,
  //   URL: nameCoverImage,
  // });
  // get public url for image
  // form.cover_image_url = await useGetPublicURL(nameCoverImage);

  // upload post
  try {
    isLoading.value = true;
    const { error: errorInsertPosts, data: resultInserPosts } =
      await useInsertPosts({
        ...form,
      });

    if (!errorInsertPosts) router.push("/app");
  } catch (err) {
    throw err;
  } finally {
    isLoading.value = false;
  }
};

watch(form, (newValue) => {
  form.descriptions = newValue.descriptions;
});

definePageMeta({
  layout: "blog",
});

onUnmounted(() => {
  form.descriptions = "";
});
</script>
