import { useAuth } from '~/stores/auth'
import { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const auth = useAuth()

    if (auth.check) {
        return navigateTo({name: 'profile'})
    }
})
