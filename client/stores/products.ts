import { acceptHMRUpdate, defineStore } from 'pinia'
import { useCartStore } from "./cart";

export const useProducts = defineStore('products', {
    state: () => ({
        loading: false,
        items: <models.ProductResults>[],
        laravelData: <models.ProductsResults>[],
        meta: <api.MetApiPaginate | undefined>[],
        filter: null,
        filterParams: {
            tags: [],
            categories: [],
            price: {
                min: null,
                max: null
            },
            sort: '',
            active_dialog_slug: '',
            per_page: 20,
            page: 1
        },
        perPageList: [
            20, 50, 100
        ],
        sortParams: [
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
                name: 'Время добавления (по возрастанию)',
                value: 'id-asc',
            },
            {
                name: 'Время добавления (по убыванию)',
                value: 'id-desc',
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
        defaultFilter() {
            return {
                tags: [],
                categories: [],
                price: {
                    min: null,
                    max: null
                },
                sort: '',
                per_page: 20,
                page: 1
            }
        }

    },

    actions: {
        setFilterDefault(): void
        {
            for (let name in this.defaultFilter) {
                if (this.filterParams.hasOwnProperty(name)) {
                    this.filterParams[name] = this.defaultFilter[name]
                }
            }
        },

        async get(params: object): Promise<models.ProductsResults>
        {
            try {
                this.loading = true

                const {data, error} = await useApi('products', {
                    params
                })

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value && data.value.success && data.value.data.data) {
                    this.laravelData = data?.value?.data

                    const nextIndex = this.laravelData.meta.links.findIndex(el => el.label == '&laquo; Назад')
                    await this.laravelData.meta.links.splice(nextIndex, 1)
                    const prevIndex = this.laravelData.meta.links.findIndex(el => el.label == 'Вперёд &raquo;')
                    await this.laravelData.meta.links.splice(prevIndex, 1)
                    console.log(this.laravelData.meta.links)

                    this.meta = data?.value?.data?.meta
                    this.items = data?.value?.data?.data
                    console.log('this.items')
                    console.log(this.items)
                }
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },

        async getCart(): Promise<models.ProductsResults>
        {
            this.loading = true

            try {
                const cartStore = useCartStore()

                const {data, error} = await useApi('products/cart', {
                    params: {
                        'ids[]': cartStore.getItemIds()
                    }
                })

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                if (data.value.success && data.value.data) {
                    for (const index in cartStore.cart) {
                        const item = data.value.data.find(el => el.id == cartStore.cart[index].id)

                        if (item) {
                            for (let name in item) {
                                if (cartStore.cart[index].hasOwnProperty(name)) {
                                    cartStore.cart[index][name] = item[name]
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },

        findInCardById(id: number): Promise<models.Product>
        {
            return this.cartItems.find(el => el.id == id)
        },

        async show(param: string|number): Promise<models.ProductResults>
        {
            try {
                const { data, error } = await useApi(`products/${param}`)

                if (error.value) {
                    // @ts-ignore
                    throw new Error(error.value)
                }

                return data.value
            } catch (e) {
                console.log(e)
            }
        },
    }
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProducts, import.meta.hot))
}

