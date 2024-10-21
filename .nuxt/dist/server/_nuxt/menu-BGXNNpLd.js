import { useSSRContext, ref, computed, mergeProps, unref, watch, reactive, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, withDirectives, vModelText } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./DialogModal-sQS30h9B.js";
import { h as useAuth, m as useDialogAuth, f as useDialog, b as useRouter, d as defineStore } from "../server.mjs";
import "js-cookie";
const _sfc_main$2 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: Array,
      default: () => ["py-1", "bg-white"]
    }
  },
  setup(__props) {
    const props = __props;
    let open = ref(false);
    const widthClass = computed(() => {
      return {
        "48": "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "origin-top-left left-0";
      }
      if (props.align === "right") {
        return "origin-top-right right-0";
      }
      return "origin-top";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${ssrRenderStyle(unref(open) ? null : { display: "none" })}" class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md bg-white"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dropdown.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuth();
    const dialogAuth = useDialogAuth();
    useDialog();
    useRouter();
    ref(false);
    const loadingBtn = ref(false);
    let form;
    formClear();
    async function submit(e) {
      await auth.login({ ...form });
    }
    watch(() => dialogAuth.active.login, (v) => {
      formClear();
    });
    function formClear() {
      form = reactive(formDefaults());
    }
    function formDefaults() {
      return {
        email: "",
        password: ""
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DialogModal = _sfc_main$3;
      const _component_uiButtonPrimary = _sfc_main$4;
      _push(ssrRenderComponent(_component_DialogModal, mergeProps({
        noFooter: false,
        show: unref(dialogAuth).active.login,
        onClose: ($event) => unref(dialogAuth).setActive("login", false)
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="bg-gray-50 dark:bg-gray-900"${_scopeId}><div class="w-full space-y-8 bg-white rounded-lg dark:bg-gray-800"${_scopeId}><h2 class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}> Авторизация </h2><form class="mt-8 space-y-6"${_scopeId}><div${_scopeId}><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Эл. почта</label><input${ssrRenderAttr("value", unref(form).email)} placeholder="mail@mail.ru" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"${_scopeId}></div><div${_scopeId}><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Пароль</label><input${ssrRenderAttr("value", unref(form).password)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required${_scopeId}></div><div class="flex items-start"${_scopeId}><div class="flex items-center h-5"${_scopeId}><input id="remember" aria-describedby="remember" name="remember" type="checkbox" class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"${_scopeId}></div><div class="ms-3 text-sm"${_scopeId}><label for="remember" class="font-medium text-gray-500 dark:text-gray-400"${_scopeId}>Запомнить меня</label></div><a href="#" class="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"${_scopeId}>Забыли пароль?</a></div>`);
            _push2(ssrRenderComponent(_component_uiButtonPrimary, {
              type: "submit",
              disabled: unref(loadingBtn)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(loadingBtn) ? "..." : "Войти")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(loadingBtn) ? "..." : "Войти"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form></div></section>`);
          } else {
            return [
              createVNode("section", { class: "bg-gray-50 dark:bg-gray-900" }, [
                createVNode("div", { class: "w-full space-y-8 bg-white rounded-lg dark:bg-gray-800" }, [
                  createVNode("h2", { class: "text-2xl font-bold text-gray-900 dark:text-white" }, " Авторизация "),
                  createVNode("form", {
                    class: "mt-8 space-y-6",
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "email",
                        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }, "Эл. почта"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                        placeholder: "mail@mail.ru",
                        type: "email",
                        name: "email",
                        id: "email",
                        class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).email]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "password",
                        class: "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      }, "Пароль"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                        type: "password",
                        name: "password",
                        id: "password",
                        placeholder: "••••••••",
                        class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).password]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-start" }, [
                      createVNode("div", { class: "flex items-center h-5" }, [
                        createVNode("input", {
                          id: "remember",
                          "aria-describedby": "remember",
                          name: "remember",
                          type: "checkbox",
                          class: "w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        })
                      ]),
                      createVNode("div", { class: "ms-3 text-sm" }, [
                        createVNode("label", {
                          for: "remember",
                          class: "font-medium text-gray-500 dark:text-gray-400"
                        }, "Запомнить меня")
                      ]),
                      createVNode("a", {
                        href: "#",
                        class: "ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      }, "Забыли пароль?")
                    ]),
                    createVNode(_component_uiButtonPrimary, {
                      type: "submit",
                      disabled: unref(loadingBtn)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(loadingBtn) ? "..." : "Войти"), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ], 32)
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mt-3 mb-6 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}> Ещё не зарегистрированы? <a class="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"${_scopeId}>Создать аккаунт</a></div>`);
          } else {
            return [
              createVNode("div", { class: "mt-3 mb-6 text-sm font-medium text-gray-900 dark:text-white" }, [
                createTextVNode(" Ещё не зарегистрированы? "),
                createVNode("a", { class: "text-blue-600 hover:underline dark:text-blue-500 cursor-pointer" }, "Создать аккаунт")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dialogs/auth/login.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const dialogAuth = useDialogAuth();
    useDialog();
    const showPassword = ref(false);
    const loadingBtn = ref(false);
    let form;
    formClear();
    watch(() => dialogAuth.active.register, (v) => {
      formClear();
    });
    function formClear() {
      form = reactive(formDefaults());
    }
    function formDefaults() {
      return {
        email: "",
        password: "",
        password_confirmation: "",
        role: "organizer"
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: [{ active: unref(dialogAuth).active.register }, "registration popup"]
      }, _attrs))}><div class="registration__content"><div class="registration__title title"> Регистрация </div><form class="registration__form"><div class="registration__info"><input${ssrRenderAttr("value", unref(form).email)} name="email" class="registration__mail registration__info-item input_blue" placeholder="Эл. почта"><div class="password-eye"><input${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)} class="registration__password registration__info-item input_blue" placeholder="Пароль"${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} name="password"><div class="${ssrRenderClass([{ active: unref(showPassword) }, "password-control"])}"></div></div><div class="password-eye"><input${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password_confirmation, null)} class="registration__password-confirm registration__info-item input_blue" placeholder="Потвердить пароль"${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")}><div class="${ssrRenderClass([{ active: unref(showPassword) }, "password-control"])}"></div></div></div><div class="registration__roles"><label class="registration__role registration__organizer"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).role, "organizer")) ? " checked" : ""} type="radio" name="role" value="organizer" checked><span class="filter__custom-input"></span><div class="registration__role-text"> Организатор </div></label><label class="registration__role registration__sponsor"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).role, "sponsor")) ? " checked" : ""} type="radio" name="role" value="sponsor"><span class="filter__custom-input"></span><div class="registration__role-text"> Партнер </div></label></div><button class="registration__create-btn btn btn_blue" type="submit"${ssrIncludeBooleanAttr(unref(loadingBtn)) ? " disabled" : ""}>${ssrInterpolate(unref(loadingBtn) ? "..." : "Создать аккаунт")}</button></form><div class="registration__footer"><div class="registration__login"> Есть аккаунт? <div class="registration__login-btn header__authorization"> Авторизация </div></div></div><div class="popup-close"></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dialogs/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useMenu = defineStore("menu", {
  state: () => ({
    header: [
      {
        text: "Главная",
        route: "index"
      },
      {
        text: "Каталог",
        route: "catalog"
      },
      {
        text: "Прайс-лист",
        route: "price-list"
      },
      {
        text: "Новинки",
        route: "new"
      },
      {
        text: "Партнёры",
        route: "partners"
      },
      {
        text: "Декларации",
        route: "declarations"
      },
      {
        text: "Контакты",
        route: "contacts"
      }
    ],
    headerMobile: [
      {
        text: "Главная",
        route: "index"
      },
      {
        text: "Каталог",
        route: "catalog"
      },
      {
        text: "Прайс-лист",
        route: "price-list"
      },
      {
        text: "Новинки",
        route: "new"
      },
      {
        text: "Партнёры",
        route: "partners"
      },
      {
        text: "Декларации",
        route: "declarations"
      },
      {
        text: "Контакты",
        route: "contacts"
      }
    ],
    footer: [
      {
        text: "Главная",
        route: "index"
      },
      {
        text: "Каталог",
        route: "catalog"
      },
      {
        text: "Прайс-лист",
        route: "price-list"
      },
      {
        text: "Новинки",
        route: "new"
      },
      {
        text: "Партнёры",
        route: "partners"
      },
      {
        text: "Декларации",
        route: "declarations"
      },
      {
        text: "Контакты",
        route: "contacts"
      }
    ],
    drawerMobile: false,
    drawerAdminSidebar: false
  }),
  getters: {
    //
  },
  actions: {
    get(name) {
      const data = this[name];
      const router = useRouter();
      return data.map((v) => {
        let link = v.href || v.route;
        const valueRoute = typeof v.route === "string" ? { name: v.route } : v.route;
        if (router.hasRoute(valueRoute.name)) {
          v._route = router.resolve(valueRoute);
          link = v._route.href;
        }
        return {
          ...v,
          link
        };
      });
    },
    toggleDrawerMobile() {
      this.drawerMobile = !this.drawerMobile;
    }
  }
});
export {
  _sfc_main$2 as _,
  _sfc_main$1 as a,
  _sfc_main as b,
  useMenu as u
};
//# sourceMappingURL=menu-BGXNNpLd.js.map
