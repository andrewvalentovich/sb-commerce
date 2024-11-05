import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAdminProducts = defineStore('adminProducts', {
    state: () => ({
        loading: false,
        items: <models.ProductResults>[],
        laravelData: <models.ProductsResults>[],
        meta: <api.MetApiPaginate | undefined>[],
        filter: null,
        current: null,
        filterParams: {
            tags: [],
            categories: [],
            sort: '',
            per_page: 20,
            page: 1
        },
        perPageList: [
            20, 50, 100
        ],
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
                name: 'Название (по возрастанию)',
                value: 'name-asc',
            },
            {
                name: 'Название (по убыванию)',
                value: 'name-desc',
            },
            {
                name: 'Артикул (по возрастанию)',
                value: 'isbn-asc',
            },
            {
                name: 'Артикул (по убыванию)',
                value: 'isbn-desc',
            },
            {
                name: 'Год издания (по возрастанию)',
                value: 'year_of_production-asc',
            },
            {
                name: 'Год издания (по убыванию)',
                value: 'year_of_production-desc',
            },
            {
                name: 'Цена (по возрастанию)',
                value: 'price-asc',
            },
            {
                name: 'Цена (по убыванию)',
                value: 'price-desc',
            }
        ]
    }),

    getters: {

    },

    actions: {
        async get(params: object): Promise<models.ProductsResults> {
            this.loading = true

            try {
                const {data, error} = await useApi('admin/products', {
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

                if (this.current) {
                    const current = this.items.find(el => el.id == this.current.id)
                    if (current) this.current = current
                }
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

                const {data, error} = await useApi(`admin/products/${id}`, {
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

        async store(body: object): Promise<models.UserResults> {
            this.loading = false

            try {
                for (var pair of body.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]);
                }
                const {data, error} = await useApi(`admin/products`, {
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

        async destroy(id: number) {
            this.loading = true

            try  {
                await useApi(`admin/products/${id}`, {
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
    import.meta.hot.accept(acceptHMRUpdate(useAdminProducts, import.meta.hot))
}

