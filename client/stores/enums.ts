import { acceptHMRUpdate, defineStore } from 'pinia'

interface State {
}

export const useEnum = defineStore('enum', {
    state: (): State => ({
        loading: false,
        userRoles: [],
        userStatuses: [],
    }),

    getters: {

    },

    actions: {
        async getUserRoles() {
            this.loading = true

            try {
                const { data, error } = await useApi(`enums/user_roles`)

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.userRoles = data?.value?.data
            } catch(e) {
                console.log(e)
            }

            this.loading = false
        },

        async getUserStatuses() {
            this.loading = true

            try {
                const { data, error } = await useApi(`enums/user_statuses`)

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.userStatuses = data?.value?.data
            } catch(e) {
                console.log(e)
            }

            this.loading = false
        },
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot?.accept(acceptHMRUpdate(useEnum, import.meta.hot))
}

