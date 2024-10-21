import { _ as __nuxt_component_0 } from "./nuxt-link-BW5P-K3c.js";
import { useSSRContext, computed, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, toDisplayString, defineComponent, ref, watch, withDirectives, vModelText, Fragment, renderList, vModelSelect, reactive, isRef } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderAttr } from "vue/server-renderer";
import { a as useRoute, b as useRouter, d as defineStore, c as useApi, e as useNuxtApp, f as useDialog } from "../server.mjs";
import { _ as _sfc_main$4, a as _sfc_main$5 } from "./DialogModal-sQS30h9B.js";
import * as pkg from "laravel-vue-pagination";
import "hookable";
import "ufo";
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
import "js-cookie";
import "ohash";
import "cookie-es";
import "@venegrad/vue3-click-outside";
import "date-fns";
import "vue-tippy";
const _sfc_main$3 = {
  __name: "Breadcrumbs",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const crumbsRoute = computed(() => {
      let fullPath = "";
      const routes = route.fullPath.substring(1).split("/");
      return routes.map((route2) => {
        if (route2) {
          fullPath = `${fullPath}/${route2}`;
          return router.resolve(fullPath);
        }
      }).filter(Boolean);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-4" }, _attrs))}><nav class="flex mb-5" aria-label="Breadcrumb"><ol class="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2"><li class="inline-flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: { name: "index" },
        class: "inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"${_scopeId}></path></svg> Главная `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 mr-2.5",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createVNode("path", { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" })
              ])),
              createTextVNode(" Главная ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><!--[-->`);
      ssrRenderList(unref(crumbsRoute), (crumb, index) => {
        _push(`<li><div class="flex items-center"><svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`);
        if (index != Object.keys(unref(crumbsRoute)).length - 1) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: { name: crumb.name },
            class: "ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(crumb.meta.breadcrumbs)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(crumb.meta.breadcrumbs), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span class="ml-1 text-gray-400 md:ml-2 dark:text-gray-500">${ssrInterpolate(crumb.meta.breadcrumbs)}</span>`);
        }
        _push(`</div></li>`);
      });
      _push(`<!--]--></ol></nav></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Breadcrumbs.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "danger",
  __ssrInlineRender: true,
  props: {
    disabled: {
      default: false
    },
    type: {
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        disabled: props.disabled,
        type: props.type,
        "data-modal-toggle": "delete-user-modal",
        class: "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/button/danger.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useAdminUsers = defineStore("adminUsers", {
  state: () => ({
    loading: false,
    items: [],
    laravelData: [],
    meta: [],
    current: null,
    filter_params: []
  }),
  getters: {},
  actions: {
    async get(par) {
      var _a, _b, _c, _d, _e;
      this.loading = true;
      try {
        const params = JSON.parse(JSON.stringify(par));
        const { data, error } = await useApi("admin/users", {
          params
        });
        if (error.value) {
          throw new Error(error.value);
        }
        this.laravelData = (_a = data == null ? void 0 : data.value) == null ? void 0 : _a.data;
        this.items = (_c = (_b = data == null ? void 0 : data.value) == null ? void 0 : _b.data) == null ? void 0 : _c.data;
        this.meta = (_e = (_d = data == null ? void 0 : data.value) == null ? void 0 : _d.data) == null ? void 0 : _e.meta;
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    async update(id, body) {
      this.loading = true;
      try {
        if (body instanceof FormData) {
          body.append("_method", "put");
        } else {
          body._method = "put";
        }
        const { data, error } = await useApi(`admin/users/${id}`, {
          method: "post",
          headers: {
            "Accept": "application/json"
          },
          body
        });
        if (error.value) {
          throw new Error(error.value);
        }
        const { $toast } = useNuxtApp();
        $toast.success("Данные о пользователе успешно обновлены");
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    async store(body) {
      this.loading = false;
      try {
        const { data, error } = await useApi(`admin/users`, {
          method: "post",
          headers: {
            "Accept": "application/json"
          },
          body
        });
        if (error.value) {
          throw new Error(error.value);
        }
        const { $toast } = useNuxtApp();
        $toast.success("Создан новый пользователь");
      } catch (e) {
        console.log(e);
      }
      this.loading = true;
    },
    async destroy(id) {
      this.loading = true;
      try {
        await useApi(`admin/users/${id}`, {
          method: "delete"
        });
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    }
  }
});
const useEnum = defineStore("enum", {
  state: () => ({
    loading: false,
    userRoles: [],
    userStatuses: []
  }),
  getters: {},
  actions: {
    async getUserRoles() {
      var _a;
      this.loading = true;
      try {
        const { data, error } = await useApi(`enums/user_roles`);
        if (error.value) {
          throw new Error(error.value);
        }
        this.userRoles = (_a = data == null ? void 0 : data.value) == null ? void 0 : _a.data;
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
    async getUserStatuses() {
      var _a;
      this.loading = true;
      try {
        const { data, error } = await useApi(`enums/user_statuses`);
        if (error.value) {
          throw new Error(error.value);
        }
        this.userStatuses = (_a = data == null ? void 0 : data.value) == null ? void 0 : _a.data;
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    }
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: Object
    }
  },
  emits: ["update:modelValue", "fetchPageData"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const enumStore = useEnum();
    const dialog = useDialog();
    const adminUserStore = useAdminUsers();
    useRouter();
    const editModal = ref(props.modelValue);
    async function fetchParams() {
      if (Object.keys(enumStore.userRoles).length === 0) {
        await enumStore.getUserRoles();
      }
      if (Object.keys(enumStore.userStatuses).length === 0) {
        await enumStore.getUserStatuses();
      }
    }
    fetchParams();
    formClear();
    watch(() => dialog.dialogs.adminUser.active, (v) => {
      formClear();
      if (v) {
        showModal();
      } else {
        closeModal();
      }
    });
    watch(() => props.modelValue, (v) => {
      editModal.value = v;
    }, {
      deep: true
    });
    function formClear() {
      for (let name in editModal.value.form) {
        editModal.value.form[name] = "";
      }
    }
    const fetchPageData = () => {
      emit("fetchPageData");
    };
    async function submit() {
      const m = editModal.value;
      const data = JSON.parse(JSON.stringify(m.form));
      if (m.item) {
        await adminUserStore.update(m.item.id, data);
      } else {
        await adminUserStore.store(data);
      }
      formClear();
      closeModal();
      emit("update:modelValue", m);
      await fetchPageData();
    }
    function closeModal() {
      editModal.value.show = false;
      emit("update:modelValue", editModal.value);
      dialog.close("adminUser");
    }
    function showModal() {
      editModal.value.show = true;
      if (!editModal.value.formDefault) {
        editModal.value.formDefault = Object.assign({}, editModal.value.form);
      } else {
        editModal.value.form = Object.assign({}, editModal.value.formDefault);
      }
      const item = editModal.value.item;
      if (item) {
        editModal.value.title = `Редактирование пользователя: ${item.name} (ID - ${item.id})`;
        for (let name in editModal.value.form) {
          if (name === "role") {
            editModal.value.form[name] = enumStore.userRoles.find((role) => role.display_name === item[name]).name;
            continue;
          }
          if (item.hasOwnProperty(name)) {
            editModal.value.form[name] = item[name];
          }
        }
      } else {
        editModal.value.title = "Добавление пользователя";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DialogModal = _sfc_main$4;
      const _component_uiButtonPrimary = _sfc_main$5;
      _push(ssrRenderComponent(_component_DialogModal, mergeProps({
        noFooter: false,
        show: unref(dialog).dialogs.adminUser.active,
        onClose: ($event) => closeModal()
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-gray-50 dark:bg-gray-900"${_scopeId}><div class="w-full space-y-4 py-4 bg-white rounded-lg dark:bg-gray-800"${_scopeId}><h2 class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(editModal).title)}</h2></div></section>`);
          } else {
            return [
              createVNode("section", { class: "bg-gray-50 dark:bg-gray-900" }, [
                createVNode("div", { class: "w-full space-y-4 py-4 bg-white rounded-lg dark:bg-gray-800" }, [
                  createVNode("h2", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(editModal).title), 1)
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class=""${_scopeId}><form${_scopeId}><div class="grid grid-cols-6 gap-6"${_scopeId}><div class="col-span-6 sm:col-span-3"${_scopeId}><label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Имя</label><input${ssrRenderAttr("value", unref(editModal).form.name)} type="text" name="name" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="ФИО"${_scopeId}></div><div class="col-span-6 sm:col-span-3"${_scopeId}><label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Номер телефона</label><input${ssrRenderAttr("value", unref(editModal).form.phone)} type="text" name="phone" id="phone" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="+79998887766"${_scopeId}></div><div class="col-span-6 sm:col-span-3"${_scopeId}><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Email</label><input${ssrRenderAttr("value", unref(editModal).form.email)} type="email" name="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com"${_scopeId}></div><div class="col-span-6 sm:col-span-3"${_scopeId}><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Пароль</label><input${ssrRenderAttr("value", unref(editModal).form.password)} type="password" name="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="********"${_scopeId}></div><div class="col-span-6 sm:col-span-3"${_scopeId}><label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Статус</label><select id="status" name="status" class="border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"${_scopeId}><!--[-->`);
            ssrRenderList(unref(enumStore).userStatuses, (status) => {
              _push2(`<option${ssrRenderAttr("value", status.value)}${_scopeId}>${ssrInterpolate(status.value)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="col-span-6 sm:col-span-3"${_scopeId}><label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Роль</label><select id="role" name="role" class="border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"${_scopeId}><!--[-->`);
            ssrRenderList(unref(enumStore).userRoles, (role) => {
              _push2(`<option${ssrRenderAttr("value", role.name)}${_scopeId}>${ssrInterpolate(role.display_name)}</option>`);
            });
            _push2(`<!--]--></select></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "" }, [
                createVNode("form", null, [
                  createVNode("div", { class: "grid grid-cols-6 gap-6" }, [
                    createVNode("div", { class: "col-span-6 sm:col-span-3" }, [
                      createVNode("label", {
                        for: "name",
                        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }, "Имя"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(editModal).form.name = $event,
                        type: "text",
                        name: "name",
                        id: "name",
                        class: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                        placeholder: "ФИО"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(editModal).form.name]
                      ])
                    ]),
                    createVNode("div", { class: "col-span-6 sm:col-span-3" }, [
                      createVNode("label", {
                        for: "phone",
                        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }, "Номер телефона"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(editModal).form.phone = $event,
                        type: "text",
                        name: "phone",
                        id: "phone",
                        class: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                        placeholder: "+79998887766"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(editModal).form.phone]
                      ])
                    ]),
                    createVNode("div", { class: "col-span-6 sm:col-span-3" }, [
                      createVNode("label", {
                        for: "email",
                        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }, "Email"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(editModal).form.email = $event,
                        type: "email",
                        name: "email",
                        id: "email",
                        class: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                        placeholder: "example@company.com"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(editModal).form.email]
                      ])
                    ]),
                    createVNode("div", { class: "col-span-6 sm:col-span-3" }, [
                      createVNode("label", {
                        for: "password",
                        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }, "Пароль"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(editModal).form.password = $event,
                        type: "password",
                        name: "password",
                        id: "password",
                        class: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                        placeholder: "********"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(editModal).form.password]
                      ])
                    ]),
                    createVNode("div", { class: "col-span-6 sm:col-span-3" }, [
                      createVNode("label", {
                        for: "status",
                        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }, "Статус"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(editModal).form.status = $event,
                        id: "status",
                        name: "status",
                        class: "border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(enumStore).userStatuses, (status) => {
                          return openBlock(), createBlock("option", {
                            value: status.value
                          }, toDisplayString(status.value), 9, ["value"]);
                        }), 256))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(editModal).form.status]
                      ])
                    ]),
                    createVNode("div", { class: "col-span-6 sm:col-span-3" }, [
                      createVNode("label", {
                        for: "role",
                        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }, "Роль"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(editModal).form.role = $event,
                        id: "role",
                        name: "role",
                        class: "border bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(enumStore).userRoles, (role) => {
                          return openBlock(), createBlock("option", {
                            value: role.name
                          }, toDisplayString(role.display_name), 9, ["value"]);
                        }), 256))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(editModal).form.role]
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="items-center pt-8 pb-4 rounded-b dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_uiButtonPrimary, {
              onClick: submit,
              disabled: unref(adminUserStore).loading,
              type: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(adminUserStore).loading ? "Загрузка..." : unref(editModal).item ? "Обновить" : "Добавить")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(adminUserStore).loading ? "Загрузка..." : unref(editModal).item ? "Обновить" : "Добавить"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "items-center pt-8 pb-4 rounded-b dark:border-gray-700" }, [
                createVNode(_component_uiButtonPrimary, {
                  onClick: submit,
                  disabled: unref(adminUserStore).loading,
                  type: "button"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(adminUserStore).loading ? "Загрузка..." : unref(editModal).item ? "Обновить" : "Добавить"), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dialogs/admin/users.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const { TailwindPagination } = pkg;
    ref([
      {
        name: "ID по возрастанию",
        value: "id-asc"
      },
      {
        name: "ID по убыванию",
        value: "id-desc"
      },
      {
        name: "ФИО по возрастанию (А - Я)",
        value: "name-asc"
      },
      {
        name: "ФИО по убыванию (Я - А)",
        value: "name-desc"
      },
      {
        name: "Номер телефона (по возрастанию)",
        value: "phone-asc"
      },
      {
        name: "Номер телефона (по убыванию)",
        value: "phone-desc"
      }
    ]);
    const adminUserStore = useAdminUsers();
    const enumStore = useEnum();
    const dialog = useDialog();
    const filter = reactive({
      role: null,
      status: "",
      sort: "",
      per_page: null,
      page: 1
    });
    function changePage(page) {
      filter.page = page;
    }
    watch(filter, (v) => {
      adminUserStore.get(filter);
    });
    const editModal = reactive({
      show: false,
      title: "",
      formRef: null,
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        status: ""
      },
      item: null
    });
    async function fetchParams() {
      if (Object.keys(enumStore.userRoles).length === 0) {
        await enumStore.getUserRoles();
      }
      if (Object.keys(enumStore.userStatuses).length === 0) {
        await enumStore.getUserStatuses();
      }
    }
    fetchParams();
    adminUserStore.get(filter);
    async function destroy(item) {
      if (!confirm("Действие необратимо!\nВы уверены?")) {
        return;
      }
      await adminUserStore.destroy(item.id);
      await adminUserStore.get(filter);
    }
    function showModal(item) {
      console.log("click");
      dialog.open("adminUser");
      console.log(dialog.dialogs.adminUser.active);
      editModal.item = item || null;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$3;
      const _component_ui_button_primary = _sfc_main$5;
      const _component_ui_button_danger = _sfc_main$2;
      const _component_dialogsAdminUsers = _sfc_main$1;
      _push(`<!--[--><div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700"><div class="w-full mb-1">`);
      _push(ssrRenderComponent(_component_Breadcrumbs, null, null, _parent));
      _push(`<div class="sm:flex"><h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Все пользователи</h1><div class="flex items-center ml-auto space-x-2 sm:space-x-3">`);
      _push(ssrRenderComponent(_component_ui_button_primary, {
        disabled: unref(adminUserStore).loading && unref(enumStore).loading,
        onClick: ($event) => showModal()
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"${_scopeId}></path></svg> Добавить пользователя `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 mr-2 -ml-1",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
                  "clip-rule": "evenodd"
                })
              ])),
              createTextVNode(" Добавить пользователя ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><div class="flex flex-col"><div class="overflow-x-auto"><div class="inline-block min-w-full align-middle"><div class="overflow-hidden shadow"><table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600"><thead class="bg-gray-100 dark:bg-gray-700"><tr><th scope="col" class="p-4"> ID </th><th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"> ФИО </th><th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"> Номер телефона </th><th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"> Роль </th><th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"> Статус </th><th scope="col" class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"></th></tr></thead><tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"><!--[-->`);
      ssrRenderList(unref(adminUserStore).items, (user) => {
        _push(`<tr class="hover:bg-gray-100 dark:hover:bg-gray-700"><td class="p-4 text-base text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">${ssrInterpolate(user.id)}</td><td class="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap"><div class="text-sm font-normal text-gray-500 dark:text-gray-400"><div class="text-base font-semibold text-gray-900 dark:text-white">${ssrInterpolate(user.name)}</div><div class="text-sm font-normal text-gray-500 dark:text-gray-400">${ssrInterpolate(user.email)}</div></div></td><td class="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">${ssrInterpolate(user.phone)}</td><td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">${ssrInterpolate(user.role ?? "-")}</td><td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">${ssrInterpolate(user.status)}</td><td class="p-4 space-x-2 whitespace-nowrap">`);
        _push(ssrRenderComponent(_component_ui_button_primary, {
          disabled: unref(adminUserStore).loading && unref(enumStore).loading,
          onClick: ($event) => showModal(user)
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"${_scopeId}></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"${_scopeId}></path></svg> Редактировать `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 mr-2",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createVNode("path", { d: "M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" }),
                  createVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
                    "clip-rule": "evenodd"
                  })
                ])),
                createTextVNode(" Редактировать ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(ssrRenderComponent(_component_ui_button_danger, {
          disabled: unref(adminUserStore).loading && unref(enumStore).loading,
          onClick: ($event) => destroy(user)
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"${_scopeId}></path></svg> Удалить `);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 mr-2",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z",
                    "clip-rule": "evenodd"
                  })
                ])),
                createTextVNode(" Удалить ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (unref(adminUserStore).items.length == 0 && (unref(adminUserStore).loading || unref(enumStore).loading)) {
        _push(`<span>Загрузка...</span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(adminUserStore).items.length == 0 && (!unref(adminUserStore).loading && !unref(enumStore).loading)) {
        _push(`<span>Нет пользователей</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div><div class="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">`);
      _push(ssrRenderComponent(unref(TailwindPagination), {
        class: "mt-4",
        data: unref(adminUserStore).laravelData,
        onPaginationChangePage: changePage
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_dialogsAdminUsers, {
        modelValue: unref(editModal),
        "onUpdate:modelValue": ($event) => isRef(editModal) ? editModal.value = $event : null,
        onFetchPageData: ($event) => unref(adminUserStore).get(unref(filter))
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin-panel/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=users-DAhDrOHL.js.map
