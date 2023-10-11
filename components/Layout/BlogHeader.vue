<template>
  <header
    class="border-black border-b bg-zinc-900 md:block hidden top-0 left-0 w-full z-[100] sticky"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2"
    >
      <!-- left -->
      <div class="flex space-x-4 items-center relative">
        <NuxtLink to="/app"><IconsMadiaGreen /></NuxtLink>
        <form class="flex items-center relative">
          <input
            type="text"
            placeholder="Find your friends..."
            v-model="searchInput"
            class="transition-all ease-in-out bg-zinc-950 rounded-md border-none outline outline-slate-600 outline-1 focus:outline-2 active:outline-green-500 focus:outline-green-500 w-[420px] text-slate-100 p-2"
          />
          <button class="invisible pointer-events-auto flex items-center">
            <IconsSearch class="absolute right-2 cursor-pointer visible" />
          </button>
        </form>
        <div
          class="w-[420px] bg-black/70 backdrop-blur-sm h-auto absolute top-11 right-0 rounded-lg p-4"
          v-if="queryFromSearch.length > 0"
        >
          <ul class="flex flex-col space-y-2">
            <li
              v-for="(item, id) in (queryFromSearch as QueryPosts[])"
              :key="id"
              class="hover:underline cursor-pointer border-b border-green-500"
              v-if="searchInput.charAt(0) !== '@'"
            >
              <NuxtLink :to="item.posts_url"
                ><div class="flex flex-col items-start justify-start">
                  <h3 class="text-xl font-bold">
                    {{ item.title }}
                    <small v-for="tag in item.tags">
                      <span :style="{ color: tag.color }">#</span
                      >{{ tag.tag }}</small
                    >
                  </h3>
                </div></NuxtLink
              >
            </li>

            <li
              v-for="item in (queryFromSearch as RowProfile[])"
              :key="item.id"
              class="hover:underline cursor-pointer border-b border-green-500/50 p-1"
              v-else
            >
              <NuxtLink :to="`/app/${item.id}`" class="flex gap-2 items-center"
                ><NuxtImg
                  :src="item.avatar_url || 'https://placehold.co/40'"
                  class="w-[40px] h-[40px] rounded-full overflow-hidden"
                />
                <div class="flex flex-col">
                  <h3 class="text-xl font-bold">
                    @{{ item.username }}
                    <p class="text-xs font-bold text-slate-300">
                      {{ item.name }}
                    </p>
                  </h3>
                </div></NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- right -->
      <div class="flex space-x-4 items-center">
        <button
          type="button"
          @click="$router.push('/app/new')"
          title="Create Post"
          class="px-4 py-2 text-green-500 bg-transparent border border-green-500 rounded-md font-semibold hover:text-white hover:bg-green-500 hover:underline"
        >
          Create Post
        </button>
        <HLMenu
          as="div"
          class="relative inline-block text-left w-10 h-10 rounded-full"
        >
          <HLMenuButton
            ><NuxtImg
              alt="Manik"
              src="https://placehold.co/40"
              class="rounded-full"
          /></HLMenuButton>
          <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <HLMenuItems
              as="div"
              class="min-w-[250px] w-max flex flex-col absolute bg-zinc-900 opacity-100 rounded-md p-2 text z-20 right-4 top-14 space-y-2 border border-slate-400"
            >
              <HLMenuItem v-slot="{ active }" v-if="isSupported">
                <div
                  ref="copyBtn"
                  class="flex items-center justify-between px-2 py-2 rounded-md cursor-pointer"
                  :class="{ 'bg-green-500': active }"
                  @click="copy()"
                  title="Salin username"
                >
                  <div class="flex flex-col cursor-pointer hover:underline">
                    <h1 class="font-semibold text-xl">{{ profile.name }}</h1>
                    <small class="text-slate-200"
                      >@{{ profile.username }}</small
                    >
                  </div>

                  <span type="button" @click="copy()" title="Salin username">
                    <IconsCopy color="white" />
                  </span>
                </div>
              </HLMenuItem>
              <span class="border-[0px] border-b border-slate-300" />
              <HLMenuItem v-slot="{ active }">
                <NuxtLink
                  class="px-2 py-2 rounded-md cursor-pointer hover:underline flex items-center"
                  :class="{ 'bg-green-500': active }"
                  :to="`/app/${profile.id}`"
                >
                  <IconsDahsboard class="mr-2" />Dashboard
                </NuxtLink>
              </HLMenuItem>
              <HLMenuItem v-slot="{ active }">
                <NuxtLink
                  class="px-2 py-2 rounded-md cursor-pointer hover:underline flex items-center"
                  :class="{ 'bg-green-500': active }"
                  to="/app/new"
                >
                  <IconsAdd class="mr-2" />Post
                </NuxtLink>
              </HLMenuItem>
              <HLMenuItem v-slot="{ active }">
                <NuxtLink
                  class="px-2 py-2 rounded-md cursor-pointer hover:underline flex items-center"
                  :class="{ 'bg-green-500': active }"
                  to="/app/settings"
                >
                  <IconsSettings class="mr-2" />Settings
                </NuxtLink>
              </HLMenuItem>
              <span class="border-[0px] border-b border-slate-300" />

              <HLMenuItem as="div" v-slot="{ active }" class="flex items-start">
                <button
                  type="button"
                  @click="openModal"
                  class="px-2 py-2 rounded-md cursor-pointer hover:underline flex items-center w-full"
                  :class="{ 'bg-green-500': active }"
                >
                  <IconsSignOut class="mr-2" /> Sign Out
                </button>
              </HLMenuItem>
            </HLMenuItems>
          </Transition>
        </HLMenu>
      </div>
    </div>
    <HLTransitionRoot appear :show="isOpen" as="template">
      <HLDialog @close="closeModal" :open="isOpen" class="relative z-50">
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
                  Sign Out
                </HLDialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-200">
                    Are you sure you want to sign out?
                  </p>
                </div>

                <div class="mt-4 w-full">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center items-center transition-all ease-linear rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"
                    @click="onSignoutPress"
                    @mouseover="isLogoutHover = true"
                    @mouseout="isLogoutHover = false"
                  >
                    Yes, sign out
                    <span
                      class="ml-2 text-2xl transition-all ease-linear delay-200"
                      >{{ isLogoutHover ? "😡" : "🫠" }}</span
                    >
                  </button>
                </div>
              </HLDialogPanel>
            </HLTransitionChild>
          </div>
        </div>
      </HLDialog>
    </HLTransitionRoot>
  </header>
</template>

<script lang="ts" setup>
import { RowProfile } from "~/types/profile";
import { RowTags } from "~/types/tags";

const client = useSupabase();

const router = useRouter();

const { useSelectProfileByID, useGetAllProfileByUsername } = useProfile();

const {
  data: { user },
  error,
} = await client.auth.getUser();

const { data: profile } = await useSelectProfileByID(user?.id!);

const source = ref(profile.username!);

const { copy, isSupported } = useClipboard({ source });

const isLogoutHover = ref(false);

const isOpen = ref(false);
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

const { useGetAllPostsByTitle } = usePosts();

const searchInput = ref<string>("");

type QueryPosts = {
  title: string;
  posts_url: string;
  tags: RowTags[];
};

const queryFromSearch = ref<RowProfile[] | QueryPosts[]>([]);

async function handleSearching() {
  if (searchInput.value.charAt(0) === "@") {
    const { data, error: smError } = await useGetAllProfileByUsername(
      searchInput.value.slice(1)
    );
    queryFromSearch.value = data;
  } else {
    const { data, error } = await useGetAllPostsByTitle(searchInput.value);

    queryFromSearch.value = data;
  }
}
console.log(queryFromSearch.value);

watchDebounced(
  searchInput,
  async () => {
    console.log("changed! ", searchInput.value);
    if (searchInput.value.length >= 3) {
      await handleSearching();
    } else {
      queryFromSearch.value = [];
    }
  },
  { debounce: 3000, maxWait: 3500 }
);

onUnmounted(() => {
  searchInput.value = "";
});

const onSignoutPress = async () => {
  await client.auth.signOut();
  router.go(0);
};
</script>

<style></style>
