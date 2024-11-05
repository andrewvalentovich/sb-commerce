import { acceptHMRUpdate, defineStore } from 'pinia'
import { expandNested, recursiveSearch } from "~/utils/nested";

export const useCategories = defineStore('category', {
    state: () => ({
        loading: false,
        tree: <models.Category>[],
        list: <models.Category>[],
    }),

    getters: {

    },

    actions: {
        async getTree(): Promise<models.CategoriesResults>
        {
            this.loading = true

            try {
                const { data, error } = await useApi('categories/tree')

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.tree = data.value.data
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },

        async getList(): Promise<models.CategoriesResults>
        {
            this.loading = true

            try {
                const { data, error } = await useApi('categories/list')

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.list = data?.value?.data
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
    import.meta.hot.accept(acceptHMRUpdate(useCategories, import.meta.hot))
}

