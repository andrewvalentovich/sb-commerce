import { g as defineNuxtRouteMiddleware, h as useAuth, n as navigateTo } from "../server.mjs";
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
const guest = defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth();
  if (auth.check) {
    return navigateTo({ name: "profile-me" });
  }
});
export {
  guest as default
};
//# sourceMappingURL=guest-DmTM5inM.js.map
