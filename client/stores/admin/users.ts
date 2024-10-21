import { acceptHMRUpdate, defineStore } from 'pinia'
import { paramsToString, parseFilterParams } from "../../utils/filter";

export const useAdminUsers = defineStore('adminUsers', {
    state: () => ({
        loading: false,
        items: <models.User>[],
        laravelData: <models.UsersResults>[],
        meta: <api.MetApiPaginate | undefined>[],
        current: null,
        filterParams: {
            roles: [],
            statuses: [],
            sort: '',
            per_page: null,
            page: 1
        },
        sortParams: [
            {
                name: 'ID (по возрастанию)',
                value: 'id-asc',
            },
            {
                name: 'ID (по убыванию)',
                value: 'id-desc',
            },
            {
                name: 'ФИО (по возрастанию)',
                value: 'name-asc',
            },
            {
                name: 'ФИО (по убыванию)',
                value: 'name-desc',
            },
            {
                name: 'Скидка (по возрастанию)',
                value: 'discount_percentage-asc',
            },
            {
                name: 'Скидка (по убыванию)',
                value: 'discount_percentage-desc',
            }
        ]
    }),

    getters: {

    },

    actions: {
        async get(params: object): Promise<models.UsersResults> {
            this.loading = true

            try {
                const {data, error} = await useApi('admin/users', {
                    params
                })

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                this.laravelData = data?.value?.data;
                this.items = data?.value?.data?.data;
                this.meta = data?.value?.data?.meta
            } catch (e) {
                console.log(e)
            }

            this.loading = false
        },

        async update(id: number, body: object|FormData) {
            this.loading = true

            try {
                if (body instanceof FormData) {
                    body.append('_method', 'put')
                } else {
                    // @ts-ignore
                    body._method = 'put'
                }

                const {data, error} = await useApi(`admin/users/${id}`, {
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

                const { $toast } = useNuxtApp()
                $toast.success('Данные о пользователе успешно обновлены')

                this.loading = false
                return data.value
            } catch (e) {
                console.log(e)
            }
        },

        async store(body: object): Promise<models.UserResults> {
            this.loading = false

            try {
                const {data, error} = await useApi(`admin/users`, {
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

                const { $toast } = useNuxtApp()
                $toast.success('Создан новый пользователь')

                this.loading = false
                return data.value
            } catch (e) {
                console.log(e)
            }
        },

        async destroy(id: number) {
            this.loading = true

            try  {
                await useApi(`admin/users/${id}`, {
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
    import.meta.hot.accept(acceptHMRUpdate(useAdminUsers, import.meta.hot))
}

