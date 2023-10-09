<script setup lang="ts">
// import {
//   email,
//   helpers,
//   minLength,
//   required,
//   sameAs,
// } from "@vuelidate/validators";

// import { useVuelidate } from "@vuelidate/core";

import { FormSignUp } from "~/types/form";

const { $toast } = useNuxtApp();

const form = reactive<FormSignUp>({
  email: "",
  password: "",
  confirmPassword: "",
});

const client = useSupabaseClient();

const isLoading = ref<boolean>(false);

let resultSignUp = ref<{ user: object | null }>({ user: null });

const signupError = ref<string>("");

const checkPassword = () => {
  if (form.password !== form.confirmPassword) {
    signupError.value = "Password tidak sama";
  } else {
    signupError.value = "";
  }
};

// const rules = computed(() => {
//   return {
//     email: {
//       required: helpers.withMessage("The email field is required", required),
//       email: helpers.withMessage("Invalid email format", email),
//     },
//     password: {
//       required: helpers.withMessage("The password field is required", required),
//       minLength: minLength(6),
//     },
//     confirmPassword: {
//       required: helpers.withMessage(
//         "The password confirmation field is required",
//         required
//       ),
//       sameAs: helpers.withMessage(
//         "Passwords don't match",
//         sameAs(form.password)
//       ),
//     },
//   };
// });

// const v$ = useVuelidate(rules, form);

const { useCheckProfileByEmail } = useProfile();

const onSignUpPress = async () => {
  try {
    if (!signupError.value || signupError.value !== "Password tidak sama") {
      const { data: isEmailExist, error: isEmailExistError } =
        await useCheckProfileByEmail(form.email);
      if (!isEmailExist) {
        isLoading.value = true;
        const { error, data } = await client.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (error) {
          signupError.value = error.message;
          $toast.success("Yeayy... your account was successfully created! 🤩", {
            duration: 120000,
            dismissible: true,
          });
        }
        signupError.value = "";
        resultSignUp.value.user = data.user;
      } else {
        signupError.value = isEmailExistError!;
        console.log(isEmailExistError);
      }
    }
  } catch (error) {
    throw error;
  } finally {
    isLoading.value = false;
  }
};

// const onSignInGithubPress = async () => {
//   try {
//     isLoading.value = true;
//     const { error, data } = await client.auth.signInWithOAuth({
//       provider: "github",
//     });
//     if (error) {
//       signupError.value = error.message;
//     }
//   } catch (error) {
//     throw error;
//   } finally {
//     isLoading.value = false;
//   }
// };

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div class="flex w-full max-w-7xl mx-auto">
    <div class="flex-1 hidden md:block"></div>
    <div
      class="flex-1 w-full h-screen flex justify-center px-3 md:px-8 flex-col"
    >
      <h1
        class="font-bold text-5xl text-white mx-auto mb-4"
        data-aos="zoom-in-out"
      >
        Sign<span class="font-bold text-5xl text-green-500">up</span>
      </h1>
      <form
        class="w-full max-w-[calc(1280px*80/100)] mx-auto inline-block"
        @submit.prevent="onSignUpPress"
      >
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email</label
          >
          <input
            type="email"
            id="email"
            name="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="name@madia.com"
            v-model="form.email"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            type="password"
            id="password"
            name="password"
            class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            required
            v-model="form.password"
          />
        </div>

        <div class="mb-3">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            class="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            required
            @change="checkPassword"
            @click="checkPassword"
            v-model="form.confirmPassword"
          />

          <span
            class="px-4 py-1 bg-yellow-400/20 text-slate-300 rounded-md text-sm max-w-fit"
            v-if="signupError === 'Password tidak sama'"
            ><IconsWarning class="inline-block m-auto mr-1" color="yellow" />
            {{ signupError }}</span
          >
          <span
            class="px-4 py-1 bg-yellow-400/20 text-slate-300 rounded-md text-sm max-w-fit"
            v-if="signupError === 'Email already exists, signin now'"
            ><IconsWarning class="inline-block m-auto mr-1" color="yellow" />
            {{ signupError }}</span
          >

          <div class="flex flex-col space-y-2">
            <span class="py-1 text-slate-300 text-sm"
              >Already registered? let's
              <nuxt-link to="/auth/signin" class="text-blue-500"
                >signin</nuxt-link
              >
              now.
            </span>
            <span
              class="px-4 py-1 bg-green-400/20 text-slate-300 rounded-md text-sm max-w-fit"
              v-if="resultSignUp.user"
              ><IconsCheck class="inline-block m-auto mr-1" /> Please check your
              email for confirmation.</span
            >
          </div>
        </div>

        <button
          v-if="!isLoading"
          type="submit"
          class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Signup
        </button>
        <UIButtonLoading v-else />
      </form>
    </div>
  </div>
</template>
