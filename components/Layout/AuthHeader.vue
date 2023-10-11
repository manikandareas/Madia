<template>
  <header
    class="md:block hidden sticky top-0 left-0 w-full z-50 bg-zinc-900 border-b border-zinc-950"
  >
    <nav
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3"
    >
      <!-- left -->
      <div class="flex space-x-4 items-center">
        <NuxtLink to="/app"><IconsMadiaGreen /></NuxtLink>
      </div>

      <!-- right -->
      <div class="flex space-x-4 items-center">
        <button
          :title="actionTitle"
          @click.prevent="$router.push(actionLink)"
          type="button"
          class="px-4 py-2 text-green-500 bg-transparent border border-green-500 rounded-md font-semibold hover:text-white hover:bg-green-500 hover:underline"
        >
          {{ actionTitle }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();

const actionTitle = ref("");

const actionLink = ref("");

const router = useRoute();

watchEffect(() => {
  if (router.path == "/auth/signin") {
    actionTitle.value = "Sign Up";
    actionLink.value = "/auth/signup";
  } else {
    actionTitle.value = "Sign In";
    actionLink.value = "/auth/signin";
  }
});
</script>

<style></style>
