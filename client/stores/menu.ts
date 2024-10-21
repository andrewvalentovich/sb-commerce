import { acceptHMRUpdate, defineStore } from 'pinia'
import { Router } from 'vue-router'

interface Menus {
    'header', 'headerMobile', 'footer', 'adminSidebar'
}

export const useMenu = defineStore('menu', {
    state: (): Menus => ({
        header: [
            {
                text: 'Главная',
                route: 'index',
            },
            {
                text: 'Каталог',
                route: 'catalog',
            },
            {
                text: 'Прайс-лист',
                route: 'price-list',
            },
            {
                text: 'Новинки',
                route: 'new',
            },
            {
                text: 'Партнёры',
                route: 'partners',
            },
            {
                text: 'Декларации',
                route: 'declarations',
            },
            {
                text: 'Контакты',
                route: 'contacts',
            },
        ],
        headerMobile: [
            {
                text: 'Главная',
                route: 'index',
            },
            {
                text: 'Каталог',
                route: 'catalog',
            },
            {
                text: 'Прайс-лист',
                route: 'price-list',
            },
            {
                text: 'Новинки',
                route: 'new',
            },
            {
                text: 'Партнёры',
                route: 'partners',
            },
            {
                text: 'Декларации',
                route: 'declarations',
            },
            {
                text: 'Контакты',
                route: 'contacts',
            },
        ],
        footer: [
            {
                text: 'Главная',
                route: 'index',
            },
            {
                text: 'Каталог',
                route: 'catalog',
            },
            {
                text: 'Прайс-лист',
                route: 'price-list',
            },
            {
                text: 'Новинки',
                route: 'new',
            },
            {
                text: 'Партнёры',
                route: 'partners',
            },
            {
                text: 'Декларации',
                route: 'declarations',
            },
            {
                text: 'Контакты',
                route: 'contacts',
            },
        ],

        drawerMobile: false,
        drawerAdminSidebar: false,
    }),

    getters: {
        //
    },

    actions: {
        get(name: Menus) {
            // @ts-ignore
            const data = this[name]
            // @ts-ignore
            const router = useRouter<Router>()

            return data.map(v => {
                let link = v.href || v.route
                const valueRoute = typeof v.route === 'string' ? { name: v.route } : v.route

                if (router.hasRoute(valueRoute.name)) {
                    v._route = router.resolve(valueRoute)
                    link = v._route.href
                }

                return {
                    ...v,
                    link
                }
            })
        },

        toggleDrawerMobile() {
            this.drawerMobile = ! this.drawerMobile
        }
    },
})

// @ts-ignore
if (import.meta.hot) {
    import.meta.hot?.accept(acceptHMRUpdate(useMenu, import.meta.hot))
}

