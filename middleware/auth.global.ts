export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (to.path === "/app/new" && !user.value) {
    return navigateTo("/auth/signin");
  }

  if (to.path === "/app/settings" && !user.value) {
    return navigateTo("/auth/signin");
  }

  if (
    (to.path === "/auth/signin" || to.path === "/auth/signup") &&
    user.value
  ) {
    return navigateTo("/app");
  }
});
