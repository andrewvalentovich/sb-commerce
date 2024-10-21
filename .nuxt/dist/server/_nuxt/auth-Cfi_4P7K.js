import { g as defineNuxtRouteMiddleware, h as useAuth, i as useCookie, n as navigateTo } from "../server.mjs";
import "vue";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "@vue/devtools-api";
import "destr";
import "klona";
import "@vueuse/core";
import "tailwind-merge";
import "@iconify/vue";
import "js-cookie";
import "ohash";
import "cookie-es";
import "@venegrad/vue3-click-outside";
import "date-fns";
import "vue-tippy";
import "vue/server-renderer";
const auth = defineNuxtRouteMiddleware((to, from) => {
  const auth2 = useAuth();
  if (!auth2.check) {
    useCookie("intended_url").value = to.path;
    return navigateTo({ name: "index" });
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-Cfi_4P7K.js.map
