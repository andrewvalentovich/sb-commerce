import { u as useMenu, _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5 } from "./menu-BGXNNpLd.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-BW5P-K3c.js";
import { defineComponent, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createTextVNode, createCommentVNode, useSSRContext, mergeProps } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { h as useAuth, m as useDialogAuth, u as useHead } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DialogModal-sQS30h9B.js";
import "js-cookie";
import "ufo";
import "hookable";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "@vue/devtools-api";
import "destr";
import "klona";
import "@vueuse/core";
import "tailwind-merge";
import "@iconify/vue";
import "ohash";
import "cookie-es";
import "@venegrad/vue3-click-outside";
import "date-fns";
import "vue-tippy";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const menu = useMenu();
    const auth = useAuth();
    const dialogAuth = useDialogAuth();
    const menuHeader = menu.get("header");
    menu.get("headerMobile");
    useHead({
      title: "Slovo-book.ru"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_dropdown = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_dialogsAuthLogin = _sfc_main$4;
      const _component_dialogsAuthRegister = _sfc_main$5;
      _push(`<!--[--><nav class="w-full fixed top-0 bg-white border-gray-200 dark:bg-gray-900 z-20 border border-gray-200"><div class="flex flex-wrap items-center justify-between mx-auto p-4"><a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse"><img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo"><span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Slovo-book.ru</span></a><div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">`);
      if (unref(auth).user) {
        _push(ssrRenderComponent(_component_dropdown, null, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (_push2) {
              _push2(`<div class="flex items-center"${_scopeId}><button type="button" class="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"${_scopeId}><svg class="mx-auto text-gray-500 w-10 h-10 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"${_scopeId}></path></svg></button><div class="px-4 py-3"${_scopeId}><span class="block text-sm text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate((_b = (_a = unref(auth)) == null ? void 0 : _a.user) == null ? void 0 : _b.name)}</span><span class="block text-sm text-gray-500 truncate dark:text-gray-400"${_scopeId}>${ssrInterpolate((_d = (_c = unref(auth)) == null ? void 0 : _c.user) == null ? void 0 : _d.email)}</span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center" }, [
                  createVNode("button", {
                    type: "button",
                    class: "flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",
                    id: "user-menu-button",
                    "aria-expanded": "false",
                    "data-dropdown-toggle": "user-dropdown",
                    "data-dropdown-placement": "bottom"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "mx-auto text-gray-500 w-10 h-10 dark:text-gray-400",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ]),
                  createVNode("div", { class: "px-4 py-3" }, [
                    createVNode("span", { class: "block text-sm text-gray-900 dark:text-white" }, toDisplayString((_f = (_e = unref(auth)) == null ? void 0 : _e.user) == null ? void 0 : _f.name), 1),
                    createVNode("span", { class: "block text-sm text-gray-500 truncate dark:text-gray-400" }, toDisplayString((_h = (_g = unref(auth)) == null ? void 0 : _g.user) == null ? void 0 : _h.email), 1)
                  ])
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<ul class="py-2"${_scopeId}><li${_scopeId}>`);
              if (unref(auth).checkAdmin) {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: { name: "admin-panel" },
                  class: "w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Панель администратора`);
                    } else {
                      return [
                        createTextVNode("Панель администратора")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</li><li${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: { name: "profile" },
                class: "w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Личный кабинет`);
                  } else {
                    return [
                      createTextVNode("Личный кабинет")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</li><li${_scopeId}><button class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"${_scopeId}>Выйти из уч. записи</button></li></ul>`);
            } else {
              return [
                createVNode("ul", { class: "py-2" }, [
                  createVNode("li", null, [
                    unref(auth).checkAdmin ? (openBlock(), createBlock(_component_NuxtLink, {
                      key: 0,
                      to: { name: "admin-panel" },
                      class: "w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Панель администратора")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode("li", null, [
                    createVNode(_component_NuxtLink, {
                      to: { name: "profile" },
                      class: "w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Личный кабинет")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("li", null, [
                    createVNode("button", {
                      onClick: ($event) => unref(auth).logout(),
                      class: "w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    }, "Выйти из уч. записи", 8, ["onClick"])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_dropdown, null, {
          trigger: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center space-x-3 md:space-x-0"${_scopeId}><button type="button" class="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom"${_scopeId}><svg class="mx-auto text-gray-500 w-10 h-10 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"${_scopeId}></path></svg></button></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center space-x-3 md:space-x-0" }, [
                  createVNode("button", {
                    type: "button",
                    class: "flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",
                    id: "user-menu-button",
                    "aria-expanded": "false",
                    "data-dropdown-toggle": "user-dropdown",
                    "data-dropdown-placement": "bottom"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "mx-auto text-gray-500 w-10 h-10 dark:text-gray-400",
                      fill: "currentColor",
                      viewBox: "0 0 20 20",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ])
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<ul class="py-2"${_scopeId}><li${_scopeId}><button class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"${_scopeId}>Войти</button></li><li${_scopeId}><button class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"${_scopeId}>Зарегистрироваться</button></li></ul>`);
            } else {
              return [
                createVNode("ul", { class: "py-2" }, [
                  createVNode("li", null, [
                    createVNode("button", {
                      onClick: ($event) => unref(dialogAuth).activateLogin(),
                      class: "w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    }, "Войти", 8, ["onClick"])
                  ]),
                  createVNode("li", null, [
                    createVNode("button", {
                      onClick: ($event) => unref(dialogAuth).activateRegister(),
                      class: "w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    }, "Зарегистрироваться", 8, ["onClick"])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false"><span class="sr-only">Open main menu</span><svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path></svg></button></div><div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user"><ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"><!--[-->`);
      ssrRenderList(unref(menuHeader), (m) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          href: m.link,
          class: "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700",
          "aria-current": "page"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(m.text)}`);
            } else {
              return [
                createTextVNode(toDisplayString(m.text), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></nav>`);
      _push(ssrRenderComponent(_component_dialogsAuthLogin, null, null, _parent));
      _push(ssrRenderComponent(_component_dialogsAuthRegister, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<aside${ssrRenderAttrs(mergeProps({
    id: "sidebar",
    class: "fixed top-0 left-0 z-10 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width hidden",
    "aria-label": "Sidebar"
  }, _attrs))}><div class="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"><div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto"><div class="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"><ul class="pb-2 space-y-2"><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: { name: "admin-panel-users" },
    exactActiveClass: "bg-gray-100",
    class: "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"${_scopeId}></path></svg><span class="ml-3"${_scopeId}>Пользователи</span>`);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            class: "w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            fill: "currentColor",
            viewBox: "0 0 20 20",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            createVNode("path", { d: "M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" })
          ])),
          createVNode("span", { class: "ml-3" }, "Пользователи")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: { name: "admin-panel-categories" },
    exactActiveClass: "bg-gray-100",
    class: "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"${_scopeId}></path></svg><span class="ml-3"${_scopeId}>Категории</span>`);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            class: "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            fill: "currentColor",
            viewBox: "0 0 20 20",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            createVNode("path", { d: "M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" })
          ])),
          createVNode("span", { class: "ml-3" }, "Категории")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul><div class="pt-2 space-y-2">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: { name: "admin-panel-settings" },
    exactActiveClass: "bg-gray-100",
    class: "flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"${_scopeId}><path clip-rule="evenodd" fill-rule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path></svg><span class="ml-3"${_scopeId}>Настройки</span>`);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            class: "w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            fill: "currentColor",
            viewBox: "0 0 20 20",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true"
          }, [
            createVNode("path", {
              "clip-rule": "evenodd",
              "fill-rule": "evenodd",
              d: "M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
            })
          ])),
          createVNode("span", { class: "ml-3" }, "Настройки")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></aside>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_admin46header = _sfc_main$2;
  const _component_admin46sidebar = __nuxt_component_1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_admin46header, null, null, _parent));
  _push(`<div class="wrapper">`);
  _push(ssrRenderComponent(_component_admin46sidebar, null, null, _parent));
  _push(`<div id="main-content" class="relative h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin-panel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const adminPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  adminPanel as default
};
//# sourceMappingURL=admin-panel-CGXPTTj6.js.map
