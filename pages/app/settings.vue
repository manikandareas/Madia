<template>
  <main class="text-white">
    <div
      v-show="profileUpdating.isSuccess"
      class="w-full bg-white text-black mt-[58px] h-12 flex items-center justify-center"
    >
      <h4>Your profile has been updated</h4>
    </div>
    <div
      class="relative w-full max-w-[1024px] min-h-screen mx-auto pt-4 pb-16 md:pb-14 space-y-4"
      :class="{ 'mt-[58px]': !profileUpdating.isSuccess }"
    >
      <!-- header -->
      <div class="w-full">
        <h2 class="text-3xl">
          Setting for <span class="text-green-500">@manikxixi</span>
        </h2>
      </div>

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
        <HLTabPanels class="min-w-[736px]">
          <HLTabPanel
            as="form"
            class="space-y-5"
            @submit.prevent="onSubmitProfilePress"
          >
            <div class="bg-zinc-900 rounded-lg p-6">
              <h3 class="mb-4">User</h3>
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
              <h3 class="mb-4">Basic</h3>
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
              <h3 class="mb-4">Social Media</h3>
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
                    class="px-4 py-2 rounded-md bg-green-400/80 font-semibold"
                    type="submit"
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
                  class="px-4 py-2 font-bold w-fit bg-red-500 text-white rounded-lg"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </HLTabPanel>
        </HLTabPanels>
      </HLTabGroup>
    </div>
  </main>
</template>

<script lang="ts" setup>
const client = useSupabase();

const profileUpdating = reactive({
  isLoading: false,
  isSuccess: false,
});

const {
  data: { user },
} = await client.auth.getUser();

const { useSelectProfile, useUpdateProfile } = useProfile();

const { data: profile } = await useSelectProfile(user?.id!);

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
});

const accountForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const onSubmitProfilePress = async () => {
  try {
    profileUpdating.isLoading = true;
    const { error } = await useUpdateProfile({
      ...profileForm,
      id: user?.id!,
    });

    if (!error) {
      profileUpdating.isSuccess = true;
    }
  } catch (err) {
    throw err;
  } finally {
    profileUpdating.isLoading = false;
  }
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
