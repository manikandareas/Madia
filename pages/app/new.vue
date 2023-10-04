<template>
  <main class="text-white overflow-y-auto">
    <HLTabGroup
      as="div"
      class="relative w-full max-w-7xl mx-auto pb-16 mt-4 md:pb-14 space-y-4"
    >
      <HLTabList class="w-full flex justify-end space-x-6">
        <HLTab
          class="bg-transparent outline-none ui-selected:text-white text-slate-300"
        >
          Edit
        </HLTab>
        <HLTab
          class="bg-transparent outline-none ui-selected:text-white text-slate-300"
        >
          Preview
        </HLTab>
      </HLTabList>
      <HLTabPanels>
        <HLTabPanel class="flex space-x-4 h-auto max-h-[3000px]">
          <form
            @submit.prevent="onSubmitPress"
            class="bg-zinc-900 rounded-lg min-w-[810px] mx-auto"
            data-aos="fade-right"
            data-aos-duration="200"
          >
            <div class="space-y-4 py-8">
              <div class="md:px-14 flex flex-col space-y-2">
                <div v-if="!form.cover_image_url">
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
                <div class="max-w-full">
                  <div class="flex space-x-2 items-center">
                    <div
                      v-if="form.tags.length > 0"
                      v-for="tag in form.tags"
                      :key="tag.id"
                      class="hover:bg-[]"
                    >
                      <div class="flex items-center space-x-2">
                        <small class="text-base flex items-center"
                          ><span :style="{ color: tag.color }">#&nbsp;</span>
                          {{ tag.tag }}</small
                        >
                        <button
                          class="hover:text-red-500 font-bold"
                          @click="
                            () => {
                              listOfTags.push(tag);
                              form.tags.splice(form.tags.indexOf(tag), 1);
                            }
                          "
                        >
                          <IconsClose />
                        </button>
                      </div>
                    </div>

                    <input
                      type="search"
                      @focus="inputActive = 'tags'"
                      class="text-white bg w-full bg-transparent border-none outline-none placeholder:text-sm"
                      :placeholder="
                        form.tags.length === 4
                          ? 'Only 4 selections allowed'
                          : 'Add up to 4 tags...'
                      "
                      v-model="queryTags"
                      :disabled="form.tags.length === 4"
                    />
                  </div>
                  <div
                    class="w-full flex-col z-10 flex items-start bg-zinc-900 rounded-md"
                    v-if="inputActive === 'tags'"
                  >
                    <h3 class="w-full border-b text-xl font-bold p-2">
                      Top Tags
                    </h3>
                    <div
                      v-for="tag in listOfTags.filter((tag) =>
                        tag.tag.toLowerCase().includes(queryTags.toLowerCase())
                      )"
                      :key="tag.id"
                      @click="
                        () => {
                          form.tags.push(tag);
                          listOfTags = listOfTags.filter(
                            (item) => item.id !== tag.id
                          );
                        }
                      "
                      class="flex items-center w-full p-2 hover:bg-zinc-950 rounded-lg flex-col cursor-pointer"
                    >
                      <h5
                        type="button"
                        class="capitalize text-sm w-full text-start"
                      >
                        <span :style="{ color: tag.color }"># </span
                        >{{ tag.tag }}
                      </h5>
                      <small class="text-start w-full text-slate-300">{{
                        tag.descriptions
                      }}</small>
                    </div>
                  </div>
                </div>
              </div>

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

              <div class="md:px-14 flex justify-between">
                <button
                  v-if="!isLoading"
                  type="submit"
                  class="px-4 py-2 font-bold w-fit bg-green-500 text-white rounded-lg"
                >
                  Publish
                </button>
                <UIButtonLoading v-else />

                <p
                  class="text-sm text-slate-400 text-end max-w-[70%]"
                  v-if="!!form.cover_image_url"
                >
                  Cover image successfully uploaded. click
                  <NuxtLink
                    class="underline text-sky-500"
                    :to="form.cover_image_url"
                    target="_blank"
                    >show</NuxtLink
                  >
                  to preview image and
                  <NuxtLink class="underline text-red-500">cancel</NuxtLink>
                  to remove image.
                </p>
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
        <HLTabPanel class="flex space-x-4 w-[1000px] mx-auto min-h-screen">
          <ClientOnly>
            <section
              class="bg-zinc-900 rounded-lg md:min-h-[500px] w-full"
              data-aos="fade-left"
              data-aos-duration="200"
            >
              <div
                class="w-full overflow-hidden rounded-lg h-[340px]"
                :class="{ 'border-b': !form.cover_image_url }"
              >
                <img :src="form.cover_image_url" v-if="form.cover_image_url" />

                <div
                  class="w-full overflow-hidden bg-cover flex justify-center items-center font-bold text-2xl h-full"
                >
                  Oops no cover image uploaded
                </div>
              </div>

              <div class="w-full p-6 space-y-3">
                <div class="flex items-center space-x-3">
                  <div>
                    <NuxtImg
                      :src="
                        avatar_url
                          ? avatar_url
                          : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                      "
                      class="rounded-full max-h-[40px] object-cover"
                    />
                  </div>
                  <div class="leading-[17px]">
                    <h3 class="text-xl">{{ username }}</h3>
                    <small class="text-slate-300">Baru Saja</small>
                  </div>
                </div>
                <h1 class="text-5xl font-bold">{{ form.title }}</h1>
                <div class="flex space-x-4 text-slate-300">
                  <small
                    v-if="form.tags"
                    v-for="tag in (form.tags as RowTags[])"
                    :style="{ color: tag.color }"
                    :key="tag.id"
                    class="text-base items-center font-medium italic"
                    >#{{ tag.tag }}</small
                  >
                </div>
                <MdPreview
                  :model-value="form.descriptions"
                  :theme="'dark'"
                  style="background-color: #18181b"
                />
              </div>
            </section>
          </ClientOnly>
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
import XHR from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/status-bar/dist/style.min.css";
import "@uppy/progress-bar/dist/style.min.css";
import "@uppy/dashboard/dist/style.css";
import { RowTags } from "~/types/tags";
const client = useSupabase();
const config = useRuntimeConfig();
const form = reactive({
  title: "",
  descriptions: "",
  cover_image_url: "",
  user: "",
  tags: [] as RowTags[],
});

const queryTags = ref("");
const { $toast } = useNuxtApp();
const {
  data: { user },
} = await client.auth.getUser();

const bucketName = "madia";

const date = new Date().getTime();

const folderName = `${user?.id}/cover_posts/${form.title + date}.png`;

const supabaseUploadURL = `${config.public.SUPABASE_URL}/storage/v1/object/${bucketName}/${folderName}`;

const { useGetPublicURL, useInsertPosts, useGetListsTags } = usePosts();

const { useSelectProfileByID } = useProfile();

const {
  data: { username, avatar_url },
} = await useSelectProfileByID(user?.id!);

const uppy = new Uppy();

uppy.setOptions({
  restrictions: {
    maxNumberOfFiles: 1,
    maxFileSize: 512000,
  },
});
const uppyImage = ref();

uppy.use(XHR, {
  endpoint: supabaseUploadURL,
  headers: {
    Authorization: `Bearer ${config.public.SUPABASE_ANON_KEY}`,
  },
});

uppy.on("file-added", (file) => {
  uppyImage.value = file;
  file.meta = {
    ...file.meta,
    bucketName: bucketName,
    objectName: folderName,
    contentType: file.type,
  };
});

uppy.on("dashboard:modal-closed", async () => {
  form.cover_image_url = await useGetPublicURL(folderName);
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

const { data: listOfTags } = await useGetListsTags();

const onSubmitPress = async () => {
  form.user = (await client.auth.getUser()).data.user?.id!;
  try {
    isLoading.value = true;
    const { error: errorInsertPosts, data: resultInserPosts } =
      await useInsertPosts({
        ...form,
      });

    if (!errorInsertPosts) router.push("/app");
    $toast.success("Successfully created post 🥳", {
      position: "bottom-right",
      duration: 120000,
      dismissible: true,
    });
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
