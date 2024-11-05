import { acceptHMRUpdate, defineStore } from 'pinia'

export const useTags = defineStore('tags', {
    state: () => ({
        loading: false,
        list: <models.Tags>[],
        filterParams: {
            per_page: null,
            page: 1
        }
    }),

    getters: {

    },

    actions: {
        async getList(): Promise<models.TagsResults>
        {
            this.loading = true

            try {
                const { data, error } = await useApi('tags/list/')

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
        }
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTags, import.meta.hot))
}

