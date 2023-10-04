import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== "undefined") {
    nuxtApp.toast = useToast();

    return {
      provide: {
        toast: useToast(),
      },
    };
  }
});
