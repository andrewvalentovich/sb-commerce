export {}
declare global {
    export namespace models {
        export type Role = 'admin' | 'manager' | 'client'
        export type Status = null

        export interface User {
            id: number
            phone: string
            name: string|null
            discount_percentage: number
            email: string|null
            role: string|null
            avatar_url: string|null
            phone_verified_at: string|null
            roles: Role
            status: Status

            created_at: string|null
            updated_at: string|null
        }
        export type Users = User[]
        export type UserResults = Modify<api.MetApiResults, { data: User }>
        export type UsersResults = Modify<api.MetApiResults, { data: Users }>
    }
}
