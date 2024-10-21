import Datepicker from '@vuepic/vue-datepicker'
import ru from 'date-fns/esm/locale/ru'

import Toast, { useToast } from 'vue-toastification/src/index'
import type { PluginOptions, ToastInterface } from 'vue-toastification/src/index'
import 'vue-toastification/dist/index.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

declare module '#app' {
    // @ts-ignore
    interface NuxtApp {
        $toast: ToastInterface
    }
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $toast: ToastInterface
    }
}

export default defineNuxtPlugin(async nuxtApp => {
    // setDefaultsComponent(Datepicker, {
    //     locale: 'ru',
    //     formatLocale: ru,
    //     monthNameFormat: 'long',
    //     clearable: false,
    //     dark: false,
    //     selectText: 'Выбрать',
    //     cancelText: 'Отмена',
    //     autoApply: true
    //     // hideInputIcon: true
    // })
    nuxtApp.vueApp.component('Datepicker', Datepicker)

    const ToastOptions: PluginOptions = {
        showCloseButtonOnHover: true,
        closeOnClick: false,
        pauseOnFocusLoss: false,
    };

    nuxtApp.vueApp.use(Toast, ToastOptions)
    nuxtApp.vueApp.use(VueTippy)

    return {
        provide: {
            toast: useToast()
        },
    }
})
