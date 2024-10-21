import { useAuth } from '~/stores/auth'

declare module '#app' {
    // @ts-ignore
    interface NuxtApp {
        $auth: {
            user: models.User | null
            check: boolean
        }
    }
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $auth: {
            user: models.User | null
            check: boolean
        }
    }
}

export default defineNuxtPlugin(async nuxtApp => {
    const auth = useAuth()

    try {
        if (! auth.check && auth.token()) {
            await auth.fetchUser()
        }
    } catch (e) {
    }

    return {
        provide: {
            auth
        },
    }
})