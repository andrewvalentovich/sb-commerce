import { useAuth } from '~/stores/auth'
import { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const auth = useAuth()

    if (!auth.user.roles || !auth.user.roles.find(x => x.name === 'admin')) {
        useCookie('intended_url').value = to.path
        return navigateTo({ name: 'profile' })
    }
})
