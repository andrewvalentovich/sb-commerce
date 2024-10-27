import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAdminTags = defineStore('adminTags', {
    state: () => ({
        loading: false,
        items: <models.Tags>[],
        list: <models.Tags>[],
        laravelData: <models.TagsResults>[],
        meta: <api.MetApiPaginate | undefined>[],
        current: null,
        filterParams: {
            per_page: null,
            page: 1
        }
    }),

    getters: {

    },

    actions: {
        changePage(page: number): void
        {
            this.filterParams.page = page;
        },
        async get(params: object): Promise<models.TagsResults>
        {
            this.loading = true

            try {
                const {data, error} = await useApi('admin/tags', {
                    params
                })

                if (error.value) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.laravelData = data?.value?.data
                this.items = data?.value?.data?.data
                this.meta = data?.value?.data?.meta
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        },

        async getList(): Promise<models.TagsResults>
        {
            this.loading = true

            try {
                const { data, error } = await useApi('admin/tags/list')

                if (error.value) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.list = data.value.data
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        },

        async update(id: number, body: object|FormData)
        {
            this.loading = true

            try {
                if (body instanceof FormData) {
                    body.append('_method', 'put')
                } else {
                    // @ts-ignore
                    body._method = 'put'
                }

                const {data, error} = await useApi(`admin/tags/${id}`, {
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

        async store(body: object): Promise<models.UserResults>
        {
            this.loading = false

            try {
                const {data, error} = await useApi(`admin/tags`, {
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

        async destroy(id: number)
        {
            this.loading = true

            try  {
                await useApi(`admin/tags/${id}`, {
                    method: 'delete',
                })
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        }
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdminTags, import.meta.hot))
}

