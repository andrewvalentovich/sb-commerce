import { useAuth } from '~/stores/auth'
import { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const auth = useAuth()

    if (! auth.check) {
        useCookie('intended_url').value = to.path
        return navigateTo({ name: 'index'}, { redirectCode: 301 })
    }
})
