import { defineComponent, mergeProps, useSSRContext, watch, computed, withCtx, createVNode, openBlock, createBlock, renderSlot, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderTeleport, ssrRenderClass, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "primary",
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
        "data-modal-toggle": "add-user-modal",
        class: "inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/button/primary.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    zIndex: {
      type: Number,
      default: 1055
    },
    closeable: {
      type: Boolean,
      default: true
    },
    centered: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    watch(() => props.show, () => {
      if (props.show) ;
    });
    const maxWidthClass = computed(() => {
      return {
        "sm": "sm:max-w-sm",
        "md": "sm:max-w-md",
        "lg": "sm:max-w-lg",
        "xl": "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "1100px": "sm:max-w-[1100px]"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="${ssrRenderClass([[
          __props.show ? "" : "hidden"
        ], "fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto outline-none transition duration-150 linear z-50"])}" tabindex="-1"><div class="${ssrRenderClass([maxWidthClass.value, "transition duration-300 ease-out mx-auto w-auto relative rounded-lg bg-white mt-4"])}">`);
        if (__props.show) {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div></div><div style="${ssrRenderStyle(__props.show ? null : { display: "none" })}" class="${ssrRenderClass([[__props.show ? "bg-opacity-50" : "bg-opacity-0"], "bg-[#000] fixed top-0 left-0 w-screen h-screen transition duration-150 linear z-40"])}"></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "DialogModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    centered: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    },
    noFooter: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const close = () => {
      emit("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$1;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        show: __props.show,
        "max-width": __props.maxWidth,
        closeable: __props.closeable,
        centered: __props.centered,
        onClose: close
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative px-6 py-4"${_scopeId}><button type="button" class="absolute top-[5px] right-[5px] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" title="Close"${_scopeId}><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"${_scopeId}><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button>`);
            ssrRenderSlot(_ctx.$slots, "title", {}, null, _push2, _parent2, _scopeId);
            _push2(`<div class="mt-4"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "content", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (!__props.noFooter) {
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "relative px-6 py-4" }, [
                createVNode("button", {
                  onClick: ($event) => close(),
                  type: "button",
                  class: "absolute top-[5px] right-[5px] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white",
                  title: "Close"
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-5 h-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ], 8, ["onClick"]),
                renderSlot(_ctx.$slots, "title"),
                createVNode("div", { class: "mt-4" }, [
                  renderSlot(_ctx.$slots, "content")
                ]),
                !__props.noFooter ? renderSlot(_ctx.$slots, "footer", { key: 0 }) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DialogModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$2 as a
};
//# sourceMappingURL=DialogModal-sQS30h9B.js.map
