import { acceptHMRUpdate, defineStore } from 'pinia'
import { expandNested, recursiveSearch } from "~/utils/nested";

export const useAdminCategory = defineStore('adminCategory', {
    state: () => ({
        loading: false,
        items: <models.Category>[],
        tree: <models.Category>[],
        list: <models.Category>[],
    }),

    getters: {

    },

    actions: {
        async getTree(): Promise<models.CategoriesResults>
        {
            this.loading = true

            const { data, error } = await useApi('admin/categories/tree')

            if (error.value) {
                this.loading = false
                // @ts-ignore
                throw new Error(error.value)
            }

            this.tree = data.value.data
            this.loading = false
        },

        async getList(): Promise<models.CategoriesResults>
        {
            const { data, error } = await useApi('admin/categories/list')

            if (error.value) {
                this.loading = false
                // @ts-ignore
                throw new Error(error.value)
            }

            this.list = data.value.data
        },

        async get(params?: object): Promise<models.CategoriesResults>
        {
            this.loading = true

            try {
                const { data, error } = await useApi('admin/categories', {
                    params
                })

                if (error.value) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.items = data.value.data
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        },

        async store(body: object): Promise<models.CategoryResults>
        {
            this.loading = true

            try {
                const { data, error } = await useApi(`admin/categories`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body
                })

                if (error.value) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value && data.value.success) {
                    const { $toast } = useNuxtApp()
                    $toast.success(data.value.message)

                    this.loading = false
                    return data.value
                }
            } catch (e) {
                console.log(e)
            }
        },

        async update(id: number, body: object|FormData): Promise<models.CategoryResults>
        {
            this.loading = true

            try {
                if (body instanceof FormData) {
                    body.append('_method', 'put')
                } else {
                    // @ts-ignore
                    body._method = 'put'
                }

                const { data, error } = await useApi(`admin/categories/${id}`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body
                })

                if (error.value) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value && data.value.success) {
                    const {$toast} = useNuxtApp()
                    $toast.success(data.value.message)

                    this.loading = false
                    return data.value
                }
            } catch (e) {
                console.log(e)
            }
        },

        async destroy(id: number)
        {
            this.loading = true

            try  {
                const { data, error } = await useApi(`admin/categories/${id}`, {
                    method: 'delete',
                })

                if (error.value) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value && data.value.message) {
                    const {$toast} = useNuxtApp()
                    $toast.success(data.value.message)
                }
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        },

        async changeOrder(data: models.Category[])
        {
            await useApi(`admin/categories/change_order`, {
                method: 'put',
                body: {
                    items: data.reduce((c: any, v, i) => {
                        c[v.id] = i
                        return c
                    }, {})
                }
            })
        },

        async sort(items: object)
        {
            await useApi(`admin/categories/sort`, {
                method: 'put',
                body: {
                    items
                }
            })
        },
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdminCategory, import.meta.hot))
}

