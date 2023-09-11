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
            class="bg-zinc-900 rounded-lg min-w-[810px] max-w-[810px] mx-auto overflow-hidden"
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
            <div class="md:px-14 space-y-4 py-8">
              <div class="flex flex-col space-y-4">
                <!-- create input image -->
                <!-- <div>
                  <input
                    ref="myFile"
                    id="cover"
                    type="file"
                    accept="image/png, image/jpeg"
                    class="border rounded-md bg-green-900/30"
                    disabled
                    title="Feature coming soon ASAP!"
                  />
                  <label
                    for="cover"
                    class="text-sm text-zinc font-semibold text-zinc-400 block"
                    >max size 500kb</label
                  >
                </div> -->
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
              <Editor
                plugins=""
                v-model="form.descriptions"
                :api-key="TINYMCE_KEY"
                @focus="inputActive = 'descriptions'"
              />
              <div class="">
                <button
                  type="submit"
                  class="px-4 py-2 font-bold w-fit bg-green-500 text-white rounded-lg"
                >
                  Publish
                </button>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                pariatur praesentium accusamus quibusdam cupiditate explicabo
                nihil! Ipsam explicabo accusantium consequuntur.
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

            <div v-html="form.descriptions" />
          </section>
        </HLTabPanel>
      </HLTabPanels>
    </HLTabGroup>
  </main>
</template>

<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";

const form = reactive({
  title: "",
  descriptions: "",
  cover_image_url: "",
  user_id: "",
});

const inputActive = ref("");

// const inputCover = ref<HTMLInputElement | null>(null);

// const validateImg = reactive<{
//   error: string | null | undefined;
//   file: File | null | undefined;
//   dURL: string | null | undefined;
// }>({
//   error: null,
//   file: null,
//   dURL: null,
// });

const config = useRuntimeConfig();

const TINYMCE_KEY = config.public.TINYMCE_KEY;

const { useGetPublicURL, useUploadCover, useInsertPosts } = usePosts();

const client = useSupabase();

const onSubmitPress = async () => {
  form.user_id = (await client.auth.getUser()).data.user?.id!;

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
  // const { error: errorInsertPosts, data: resultInserPosts } =
  //   await useInsertPosts({
  //     ...form,
  //   });

  console.log({ ...form });
};

definePageMeta({
  layout: "blog",
});

// watch(inputCover, (newValue) => {
//   const {
//     validate: { dURL, data, error },
//   } = imageValidator(newValue!);

//   validateImg.file = data;
//   validateImg.error = error;
//   validateImg.dURL = dURL;
// });

// watch(myFile, () => {
//   console.log(myFile.value);
// });

watch(form, (newValue) => {
  form.descriptions = newValue.descriptions;
});

onUnmounted(() => {
  form.descriptions = "";
});
</script>
