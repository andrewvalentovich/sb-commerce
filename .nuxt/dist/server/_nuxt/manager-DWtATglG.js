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
const manager = defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  console.log("manager middleware");
  console.log(!auth.user.roles || !auth.user.roles.find((x) => x.name === "admin" || x.name === "manager"));
  if (!auth.user.roles || !auth.user.roles.find((x) => x.name === "admin" || x.name === "manager")) {
    useCookie("intended_url").value = to.path;
    return navigateTo({ name: "profile-me" });
  }
});
export {
  manager as default
};
//# sourceMappingURL=manager-DWtATglG.js.map
