import { acceptHMRUpdate, defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
    state: () => ({
        loading: false,
    }),

    getters: {

    },

    actions: {
        async update(id: number, body: object|FormData) {
            this.loading = true

            try {
                if (body instanceof FormData) {
                    body.append('_method', 'put')
                } else {
                    // @ts-ignore
                    body._method = 'put'
                }

                const {data, error} = await useApi(`profile`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body
                })

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value && data.value.success) {
                    const { $toast } = useNuxtApp()
                    $toast.success(data.value.message)
                    return data.value
                }
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },

        async updatePassword(body: object): Promise<models.UserResults> {
            this.loading = false

            try {
                const {data, error} = await useApi(`profile/password`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body
                })

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value && data.value.success) {
                    const { $toast } = useNuxtApp()
                    $toast.success(data.value.message)
                    return data.value
                }
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        }
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}

