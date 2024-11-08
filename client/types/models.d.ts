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

        export interface Category {
            id: number
            slug: string
            name: string
            description: string
            image: string
            parent_id: number
            children: Category|null
            descendants: Category|null
            ancestors: Category|null
            parent: Category|null
            sort_order: number
            package_weight: string|null
            product_count_per_package: string|null
            _lft: Category|null
            _rgt: Category|null
            media: ManyMediaResults|[]
            createdAt: string
        }
        export type Categories = Category[]
        export type CategoryResults = Modify<api.MetApiResults, { data: Category }>
        export type CategoriesResults = Modify<api.MetApiResults, { data: Categories }>

        export interface Tag {
            id: number
            slug: string
            name: string
            createdAt: string
        }
        export type Tags = Tag[]
        export type TagResults = Modify<api.MetApiResults, { data: Tag }>
        export type TagsResults = Modify<api.MetApiResults, { data: Tags }>

        export interface Product {
            id: number
            slug: string|null
            name: string
            description: string|null
            isbn: string|null
            year_of_production: number|null
            package_weight: number|null
            count_per_package: number|null
            price: number
            old_price: number
            ccfea: number|null
            category_id: number|null
            category: CategoryResults|null
            tags: TagsResults|[]
            media: ManyMediaResults|[]

            created_at: string|null
            updated_at: string|null
        }
        export type Products = Product[]
        export type ProductResults = Modify<api.MetApiResults, { data: Product }>
        export type ProductsResults = Modify<api.MetApiResults, { data: Products }>

        export interface Media {
            id: number
            url: string
            file_name: string
            order_column: number
        }
        export type ManyMedia = Media[]
        export type MediaResults = Modify<api.MetApiResults, { data: Media }>
        export type ManyMediaResults = Modify<api.MetApiResults, { data: ManyMedia }>
    }
}
