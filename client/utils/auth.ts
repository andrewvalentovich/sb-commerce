import { useAuth } from '~/stores/auth'

export function checkRoles(roles: models.Role | models.Role[]) {
    const auth = useAuth()

    if (! auth.user) {
        return false
    }
    const user: models.User = auth.user

    if (typeof roles === 'string') {
        // @ts-ignore
        roles = roles.split('|')
    }

    for (const role of roles) {
        if (user.role === role) {
            return true
        }
    }

    return false
}

export function firstRoleDisplayName() {
    const auth = useAuth()

    if (! auth.user) {
        return null
    }
    const user: models.User = auth.user

    if (user.roles && user.roles.length > 0) {
        return user.roles[0].display_name
    }

    return null
}

export function authProfileCompleted(user?: models.User): boolean {
    const u = user || useAuth().user
    if (! u) {
        return false
    }

    return !! u.profile_completed
}
