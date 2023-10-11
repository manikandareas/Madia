<template>
  <AppSettingsContainer>
    <AppSettingsPopupUpdated :isSuccess="profileUpdating.isSuccess" />
    <AppSettingsFirstSignin :isNewUser="!username" />
    <div
      class="relative w-full max-w-[1024px] min-h-screen mx-auto pt-4 pb-16 md:pb-14 space-y-4"
      :class="{ 'mt-[58px]': !profileUpdating.isSuccess }"
    >
      <!-- header -->
      <AppSettingsHeader :username="(username as string)" />

      <!-- content -->
      <HLTabGroup as="div" class="flex space-x-4">
        <HLTabList
          class="min-w-[240px] text-zinc-400 flex flex-col items-start"
        >
          <HLTab
            class="space-x-3 w-full p-2 justify-start flex items-center ui-selected:text-white border-none focus:outline-none hover:bg-green-500/50 rounded-md"
          >
            <span class="">😲</span>
            <h3 class="inline-block text-lg font-bold">Profile</h3>
          </HLTab>
          <HLTab
            class="space-x-3 w-full p-2 justify-start flex items-center ui-selected:text-white border-none focus:outline-none hover:bg-green-500/50 rounded-md"
          >
            <span class="">🌱</span>
            <h3 class="inline-block text-lg font-bold">Account</h3>
          </HLTab>
        </HLTabList>
        <!-- main -->
        <HLTabPanels class="min-w-[750px]">
          <HLTabPanel
            as="form"
            class="flex space-x-4"
            @submit.prevent="onSubmitProfilePress"
          >
            <div class="flex flex-col w-full space-y-5">
              <div class="bg-zinc-900 rounded-lg p-6">
                <h3 class="mb-2 text-xl font-bold">User</h3>
                <div class="flex flex-col space-y-4">
                  <div class="space-y-2">
                    <label for="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      v-model="profileForm.name"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      v-model="profileForm.email"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      v-model="profileForm.username"
                    />
                  </div>
                </div>
              </div>

              <div class="bg-zinc-900 rounded-lg p-6">
                <h3 class="mb-2 text-xl font-bold">Basic</h3>
                <div class="flex flex-col space-y-4">
                  <div class="space-y-2">
                    <label for="website-url">Website URL</label>
                    <input
                      id="website-url"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      placeholder="https://vitoandareas.com"
                      v-model="profileForm.website_url"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="location">Location</label>
                    <input
                      id="location"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      placeholder="Indonesia, Kalimantan Timur"
                      v-model="profileForm.location"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="bio">Bio</label>
                    <textarea
                      id="bio"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      placeholder="A short bio..."
                      v-model="profileForm.bio"
                    />
                  </div>
                </div>
              </div>

              <div class="bg-zinc-900 rounded-lg p-6">
                <h3 class="mb-2 text-xl font-bold">Social Media</h3>
                <div class="flex flex-col space-y-4">
                  <div class="space-y-2">
                    <label for="website-url" class="flex space-x-2 items-center"
                      ><IconsInstagram /> <span>Instagram</span></label
                    >
                    <input
                      id="website-url"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      placeholder="https://www.instagram.com/manikandareas"
                      v-model="profileForm.instagram_url"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="website-url" class="flex space-x-2 items-center"
                      ><IconsGit /> <span>Github</span></label
                    >
                    <input
                      id="website-url"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      placeholder="https://github.com/manikandareas"
                      v-model="profileForm.github_url"
                    />
                  </div>
                  <div class="space-y-2">
                    <label for="website-url" class="flex space-x-2 items-center"
                      ><IconsLinkedin /> <span>LinkedIn</span></label
                    >
                    <input
                      id="website-url"
                      type="text"
                      class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                      placeholder="https://www.linkedin.com/in/vitomanik/"
                      v-model="profileForm.linkedin_url"
                    />
                  </div>
                </div>
              </div>

              <div class="p-6 bg-zinc-900 rounded-lg w-full">
                <button
                  :disabled="profileUpdating.isLoading"
                  type="submit"
                  class="py-2 text-xl font-bold rounded-md w-full"
                  :class="{
                    'bg-green-400/30': profileUpdating.isLoading,
                    'bg-green-400/80': !profileUpdating.isLoading,
                  }"
                >
                  Save Profile Information
                </button>
              </div>
            </div>

            <div class="w-[150px] flex-col flex items-center gap-2">
              <button @click.prevent="open = true" type="button">
                <NuxtImg
                  :src="
                    profileForm.avatar_url
                      ? profileForm.avatar_url
                      : avatar_url || 'https://placehold.co/150'
                  "
                  class="w-[120px] h-[120px] rounded-full"
                />
              </button>
              <p class="text-xs text-center text-slate-300">
                Click for change your avatar
              </p>

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
          </HLTabPanel>
          <HLTabPanel class="space-y-5">
            <div class="bg-zinc-900 rounded-lg p-6">
              <h3 class="mb-4">Change Password</h3>
              <form
                class="flex flex-col space-y-4"
                @submit.prevent="onSubmitAccountPress"
              >
                <p class="max-w-[80%] text-justify text-zinc-400">
                  Passwords are important and highly confidential, please
                  consider carefully when choosing your password.
                </p>
                <div class="space-y-2">
                  <label for="current-password">Current Password</label>
                  <input
                    id="current-password"
                    type="password"
                    class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                    v-model="accountForm.currentPassword"
                  />
                </div>
                <div class="space-y-2">
                  <label for="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                    v-model="accountForm.newPassword"
                  />
                </div>
                <div class="space-y-2">
                  <label for="confirm-password">Confirm new password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    class="w-full bg-black rounded-md p-2 outline-slate-400 outline-1 active:outline-slate-400 focus:outline-slate-400"
                    :class="{
                      'text-red-500':
                        accountForm.confirmPassword !== accountForm.newPassword,
                    }"
                    v-model="accountForm.confirmPassword"
                  />
                  <span
                    class="text-red-500 text-sm"
                    v-if="
                      accountForm.confirmPassword !== accountForm.newPassword
                    "
                    >Password does't match !</span
                  >
                </div>
                <div>
                  <button
                    class="px-4 py-2 rounded-md bg-green-400/80 font-semibold hover:opacity-80 transition-all ease-in-out"
                    type="submit"
                    disabled="true"
                    title="This feature is ongoing"
                  >
                    Save New Password
                  </button>
                </div>
              </form>
            </div>
            <div class="bg-zinc-900 rounded-lg p-6">
              <h3 class="mb-4 text-red-500">Danger Zone</h3>

              <div class="space-y-2 max-w-[80%] text-justify">
                <h4 class="font-semibold text-xl">Delete account</h4>
                <p>Deleting your account will:</p>
                <p>
                  Delete your profile, along with your authentication
                  associations. This does not include application permissions.
                </p>
                <p>
                  Delete any and all content you have, such as articles,
                  comments, or your reading list. Allow your username to become
                  available to anyone
                </p>
                <button
                  type="button"
                  @click="openModal"
                  title="This feature is ongoing"
                  :disabled="true"
                  class="px-4 py-2 font-bold w-fit bg-red-500 text-white rounded-lg hover:opacity-80 transition-all ease-in-out"
                  :class="{
                    'bg-red-500/80': profileUpdating.isLoading === true,
                  }"
                >
                  Delete Account
                </button>
              </div>
              <HLTransitionRoot appear :show="isOpen" as="template">
                <HLDialog
                  @close="closeModal"
                  :open="isOpen"
                  class="relative z-50"
                >
                  <div class="fixed inset-0 bg-black/40" aria-hidden="true" />
                  <div class="fixed inset-0 overflow-y-auto">
                    <div
                      class="flex min-h-full items-center justify-center p-4 text-center"
                    >
                      <HLTransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                      >
                        <HLDialogPanel
                          class="w-full max-w-md transform overflow-hidden rounded-2xl bg-black/80 backdrop-blur-md p-6 text-left align-middle shadow-xl transition-all"
                        >
                          <HLDialogTitle
                            as="h3"
                            class="text-lg leading-6 text-white font-bold"
                          >
                            Delete Account
                          </HLDialogTitle>
                          <div class="mt-2">
                            <p class="text-sm text-gray-200">
                              Are you sure you want to delete this account?
                            </p>
                          </div>

                          <div class="mt-4 w-full">
                            <button
                              type="button"
                              class="inline-flex w-full justify-center items-center transition-all ease-linear rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                              @click="() => console.log('Dihapus')"
                              :disabled="
                                profileUpdating.isLoading ? true : false
                              "
                            >
                              Yes, Delete Account
                              <span
                                class="ml-2 text-2xl transition-all ease-linear delay-200"
                              ></span>
                            </button>
                          </div>
                        </HLDialogPanel>
                      </HLTransitionChild>
                    </div>
                  </div>
                </HLDialog>
              </HLTransitionRoot>
            </div>
          </HLTabPanel>
        </HLTabPanels>
      </HLTabGroup>
    </div>
  </AppSettingsContainer>
</template>

<script lang="ts" setup>
import { ProgressBar, StatusBar, DragDrop, DashboardModal } from "@uppy/vue";
import Uppy from "@uppy/core";
import XHR from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/status-bar/dist/style.min.css";
import "@uppy/progress-bar/dist/style.min.css";
import "@uppy/dashboard/dist/style.css";

const isOpen = ref(false);
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

const client = useSupabase();

const {
  data: { user },
} = await client.auth.getUser();

const { useSelectProfileByID, useUpdateProfile } = useProfile();

const { data: profile } = await useSelectProfileByID(user?.id!);

const {
  avatar_url,
  bio,
  created_at,
  email,
  github_url,
  id,
  instagram_url,
  linkedin_url,
  location,
  name,
  posts_id,
  username,
  website_url,
} = await profile;
console.log(avatar_url);

const open = ref(false);
const handleClose = () => {
  open.value = false;
};
const config = useRuntimeConfig();
const folderName = `${id}/avatar/${username}.png`;
const supabaseUploadURL = `${config.public.SUPABASE_URL}/storage/v1/object/madia/${folderName}`;

const uppy = new Uppy();

const onSubmitProfilePress = async () => {
  try {
    profileUpdating.isLoading = true;
    const { error } = await useUpdateProfile({
      ...profileForm,
      id: user?.id!,
    });

    if (!error) {
      profileUpdating.isSuccess = true;
      $toast.success("Profile already updated 🤤", {
        duration: 120000,
        dismissible: true,
      });
    }
  } catch (err) {
    throw err;
  } finally {
    profileUpdating.isLoading = false;
    scrollToTop();
  }
};

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
    bucketName: "madia",
    objectName: folderName,
    contentType: file.type,
  };
});

uppy.on("dashboard:modal-closed", async () => {
  const { data } = await client.storage.from("madia").getPublicUrl(folderName);

  profileForm.avatar_url = data.publicUrl;

  await onSubmitProfilePress();
});

const { $toast, $router } = useNuxtApp();
const profileUpdating = reactive({
  isLoading: false,
  isSuccess: false,
});

const profileForm = reactive({
  name: name ? name : "",
  email: email ? email : "",
  username: username ? username : "",
  location: location ? location : "",
  bio: bio ? bio : "",
  website_url: website_url ? website_url : "",
  instagram_url: instagram_url ? instagram_url : "",
  github_url: github_url ? github_url : "",
  linkedin_url: linkedin_url ? linkedin_url : "",
  avatar_url: avatar_url ? avatar_url : "",
});

const accountForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const scrollToTop = () => {
  window.scroll({
    behavior: "smooth",
  });
  window.scrollTo(0, 0);
};

const onSubmitAccountPress = async () => {
  console.log(accountForm);
};

onUnmounted(() => {
  Object.assign(accountForm, {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
});

const onDeleteAccountPress = async () => {
  try {
    profileUpdating.isLoading = true;
    const { data, error } = await client.auth.admin.deleteUser(id);
    const removeProfile = await client.from("profile").delete().eq("id", id);
    $router.push("/app");
  } catch (err) {
    console.log(err);
  } finally {
    profileUpdating.isLoading = false;
  }
};

watchEffect(() => {
  if (profileUpdating.isSuccess === true) {
    setTimeout(() => {
      profileUpdating.isSuccess = false;
    }, 10000);
  }
});

definePageMeta({
  layout: "blog",
});
</script>

<style></style>
