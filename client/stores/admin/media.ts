import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAdminMedia = defineStore('adminMedia', {
    state: () => ({
        loading: false,
        items: <models.MediaResults>[],
        current: null,
    }),

    getters: {

    },

    actions: {
        // async get(params: object): Promise<models.MediaResults> {
        //     this.loading = true
        //
        //     try {
        //         const {data, error} = await useApi('admin/products', {
        //             params
        //         })
        //
        //         if (error.value) {
        //             this.loading = false
        //             // @ts-ignore
        //             throw new Error(error.value)
        //         }
        //
        //         this.laravelData = data?.value?.data
        //         this.items = data?.value?.data?.data
        //         this.meta = data?.value?.data?.meta
        //     } catch (e) {
        //         console.log(e)
        //     }
        //
        //     this.loading = false
        // },

        async store(model: string, modelId: number, body: object): Promise<models.MediaResults> {
            this.loading = false

            try {
                for (var pair of body.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]);
                }
                const {data, error} = await useApi(`admin/model/${model}/id/${modelId}/media`, {
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

                if (data.value && data.value.message) {
                    const { $toast } = useNuxtApp()
                    $toast.success(data.value.message)

                    return data.value
                    this.loading = false
                }
            } catch (e) {
                console.log(e)
            }
        },

        async destroy(model: string, modelId: number, mediaId: number) {
            this.loading = true

            try  {
                const {data, error} = await useApi(`admin/model/${model}/id/${modelId}/media/${mediaId}`, {
                    method: 'delete',
                })

                if (error.value) {
                    this.loading = false
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value && data.value.message) {
                    const { $toast } = useNuxtApp()
                    $toast.success(data.value.message)

                    this.loading = false
                    return data.value
                }
            } catch (e) {
                console.log(e)
            }
        },

        async changeOrder(model: string, modelId: number, data: models.ManyMedia)
        {
            await useApi(`admin/model/${model}/id/${modelId}/media/change_order`, {
                method: 'put',
                body: {
                    items: data.reduce((c: any, v, i) => {
                        c[v.id] = i
                        return c
                    }, {})
                }
            })
        },
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAdminMedia, import.meta.hot))
}

