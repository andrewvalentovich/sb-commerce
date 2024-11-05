import { UseFetchOptions, useNuxtApp } from '#app'
import { NitroFetchRequest } from 'nitropack'
import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'
import { useAuth } from '../stores/auth'
import { useRouter } from 'vue-router'
import { FetchContext, FetchResponse } from 'ofetch'

export function useApi<T>(
    request: NitroFetchRequest,
    opts?:
        | UseFetchOptions<
        T extends void ? unknown : T,
        (res: T extends void ? unknown : T) => T extends void ? unknown : T,
        KeyOfRes<
            (res: T extends void ? unknown : T) => T extends void ? unknown : T
            >
        >
        | undefined
) {
    const config = useRuntimeConfig()
    const auth = useAuth()
    const { $toast } = useNuxtApp()

    // let baseUrl = (config.public.webURL || '/').replace(/^\/|\/$/, '') || '/'
    let baseUrl = config.public.apiURL.trim('/')
    baseUrl = `${baseUrl}/api/v1/`
    // let baseUrl = 'http://localhost:8000/api/v1/'

    // @ts-ignore
    return useFetch<T>(request, {
        baseURL: baseUrl,
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        credentials: 'omit',
        ...opts,

        async onRequest({ request, options }: FetchContext) {
            if (process.client) {
                if (options.method && options.method !== 'get' && ! useCookie('XSRF-TOKEN').value) {
                    await useFetch(`${baseUrl}csrf-cookie`, {
                        headers: {
                            'Accept': 'application/json'
                        },
                        credentials: "include"
                    })
                }
            }

            const token = auth.token()

            if (token) {
                // @ts-ignore
                options.headers.set('Authorization', `Bearer ${token}`)
            }
        },

        async onResponse({ request, response, options }) {
            const { status, statusText, _data: data } = response

            if (status === 401 && auth.check) {
                $toast.error('Сессия истекла! \nПожалуйста, войдите снова, чтобы продолжить.')
                auth.logout()

                const router = useRouter()
                await router.push({ name: 'index' })
            } else if (status === 403) {
                $toast.error('Доступ запрещен!')
            } else if (status === 404) {
                $toast.info('Страница не найдена!')
            } else if (status === 413) {
                $toast.info('Слишком большой размер загружаемого объекта')
            } else if (status === 419) {
                await useFetch(`${baseUrl}csrf-cookie`)
                $toast.info('Попробуйте снова!')
            } else if (status === 422) {
                let errorsMsg: string[] = []

                let errors = data.errors

                for (let err in errors) {
                    errorsMsg = errorsMsg.concat(errors[err])
                }

                $toast(errorsMsg.join('\n'), {
                    draggable: false,
                    // @ts-ignore
                    position: 'top-center'
                })
                // alert(errorsMsg.join('\n'))
            } else if (status === 429 && statusText === 'Too Many Requests') {
                $toast.warning('Слишком много запросов. \nПопробуйте снова.')
            }

            if (status >= 500) {
                serverError(response, $toast)
            }
        },
    })
}

let serverErrorModalShown = false

async function serverError(response: any, $toast: any) {
    if (serverErrorModalShown) {
        return
    }

    $toast?.error('Что-то пошло не так! Пожалуйста, попробуйте еще раз.')
}
