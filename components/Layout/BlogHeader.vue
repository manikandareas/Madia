<template>
  <nav
    class="bg-white border-gray-200 dark:bg-zinc-900 md:block hidden fixed top-0 left-0 w-full z-50"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3"
    >
      <!-- left -->
      <div class="flex space-x-4 items-center">
        <NuxtLink to="/app"><IconsMadiaGreen /></NuxtLink>
        <form class="flex items-center relative">
          <input
            type="text"
            class="transition-all ease-in-out bg-zinc-950 rounded-md border-none outline outline-slate-600 outline-1 focus:outline-2 active:outline-green-500 focus:outline-green-500 w-[420px] text-slate-100 p-2"
          />
          <button class="invisible pointer-events-auto flex items-center">
            <UISearch class="absolute right-2 cursor-pointer visible" />
          </button>
        </form>
      </div>

      <!-- right -->
      <div class="flex space-x-4 items-center">
        <button
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
              <HLMenuItem v-slot="{ active }">
                <div
                  class="flex items-center justify-between px-2 py-2 rounded-md"
                  :class="{ 'bg-green-500': active }"
                >
                  <div class="flex flex-col cursor-pointer hover:underline">
                    <h1 class="font-semibold">Manik</h1>
                    <small class="text-slate-200">@manikxixi</small>
                  </div>

                  <button>
                    <IconsCopy />
                  </button>
                </div>
              </HLMenuItem>
              <span class="border-[0px] border-b border-slate-300" />
              <HLMenuItem v-slot="{ active }">
                <NuxtLink
                  class="px-2 py-2 rounded-md cursor-pointer hover:underline flex items-center"
                  :class="{ 'bg-green-500': active }"
                  to="/app/manikxixi"
                >
                  <IconsDahsboard class="mr-2" />Dashboard
                </NuxtLink>
              </HLMenuItem>
              <HLMenuItem v-slot="{ active }">
                <a
                  class="px-2 py-2 rounded-md cursor-pointer hover:underline flex items-center"
                  :class="{ 'bg-green-500': active }"
                  href="/account-settings"
                >
                  <IconsAdd class="mr-2" />Post
                </a>
              </HLMenuItem>
              <span class="border-[0px] border-b border-slate-300" />

              <HLMenuItem v-slot="{ active }" class="flex items-start">
                <button
                  class="px-2 py-2 rounded-md cursor-pointer hover:underline flex items-center"
                  :class="{ 'bg-green-500': active }"
                >
                  <IconsSignOut class="mr-2" />Sign Out
                </button>
              </HLMenuItem>
            </HLMenuItems>
          </Transition>
        </HLMenu>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();

const onSignoutPress = async () => {
  await client.auth.signOut();
};
</script>

<style></style>
