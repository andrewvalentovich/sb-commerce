import { acceptHMRUpdate, defineStore } from 'pinia'
// @ts-ignore
import Cookies from 'js-cookie'
import { useApi } from "../composables/useApi"
import { navigateTo } from "nuxt/app"
import { useDialog, useDialogAuth } from '~/stores/dialog'

interface State {
    loading: false,
    user: models.User | null,
}

export const useAuth = defineStore('auth', {
    state: (): State => ({
        user: null,
    }),

    getters: {
        check: state => state.user != null,
        hasVerifiedPhone: state => state.user && state.user.phone_verified_at !== null,
        checkAdmin: state => state.user?.roles?.find(x => x.name === 'admin'),
        checkManager: state => state.user?.roles?.find(x => x.name === 'admin' || x.name === 'manager')
    },

    actions: {
        token() {
            return useCookie('token', { watch: false }).value
        },

        getCookie() {
            const xsrfToken = useCookie('XSRF-TOKEN', { watch: false }).value ?? null
            const laravelSession = useCookie('laravel_session', { watch: false }).value ?? null

            return `XSRF-TOKEN=${xsrfToken}; laravel_session=${laravelSession}`
        },

        async fetchUser() {
            const { data, error }: any = await useApi('auth/me')

            if (data.value || ! error.value) {
                if (data.value.exists === false) {
                    this.logout()
                    return
                }

                this.updateUser(data.value.data)
            }
        },

        saveToken(token: string, remember: boolean = true) {
            Cookies.set('token', token, { expires: remember ? 365 : 1 })
        },

        async csrfCookie() {
            await useApi('csrf-cookie')
        },

        async login(params: RequestInit["body"] | Record<string, any>, remember: boolean = true) {
            this.loading = true

            try {
                const body = JSON.parse(JSON.stringify(params))

                const { data: { value: data } }: { data: models.UserResults } = await useApi('auth/login', {
                    method: 'post',
                    body
                })

                if (data) {
                    this.saveToken(data?.data?.token, remember)
                    await this.fetchUser()

                    const { $toast } = useNuxtApp()
                    $toast.success('Вы успешно авторизованы!')
                    this.redirect()
                }
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        },

        async register(params: RequestInit["body"] | Record<string, any>) {
            this.loading = true

            try {
                const body = JSON.parse(JSON.stringify(params))

                const { data, error }: any = await useApi('auth/register', {
                    method: 'post',
                    body
                })

                if (error.value) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data) {
                    const { $toast } = useNuxtApp()
                    $toast.success('Вы успешно зарегистрированы!')
                }

                this.loading = false
                return data
            } catch (e) {
                console.log(e)
            }
        },

        async redirect() {
            const dialog = useDialogAuth()
            await dialog.deactivateAll()

            await nextTick()

            const intendedUrl = Cookies.get('intended_url')
            if (intendedUrl) {
                Cookies.remove('intended_url')

                useRouter().push({ path: intendedUrl })
            } else {
                navigateTo({ name: 'profile' }, { redirectCode: 301 })
            }
        },

        async confirm_code(body: RequestInit["body"] | Record<string, any>) {
            this.loading = true

            try {
                const {data, error}: any = await useApi('auth/register?action=code', {
                    method: 'post',
                    body
                })

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }
                this.saveToken(data.value.token, true)
                await this.fetchUser()

                return { data: data.value }
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        },

        async recovery(params: object) {
            this.loading = true

            try {
                const body = JSON.parse(JSON.stringify(params))

                const {data, error}: any = await useApi(`auth/recovery?action=${body.iterations.current}`, {
                    method: 'post',
                    body
                })

                if (error.value || !data.value.success) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.loading = false
                return {
                    data: data?.value?.data,
                    success: data?.value?.success,
                    message: data?.value?.message,
                }
            } catch (e) {
                console.log(e);
            }
        },

        updateUser(payload: any) {
            if (Array.isArray(payload.meta_data)) {
                payload.meta_data = {}
            }
            this.user = payload
        },

        async logout(sendRequest: boolean = true) {
            this.loading = true

            try {
                if (sendRequest) {
                    await useApi('auth/logout', {
                        method: 'post'
                    })
                }

                this.user = null
                Cookies.remove('token')

                const {$toast} = useNuxtApp()
                $toast.success('Вы вышли из учётной записи!')

                navigateTo({ name: 'index' }, { redirectCode: 301 })
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        }
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot?.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}

