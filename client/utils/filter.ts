import _ from 'lodash';

export class Filter {
    private filter = ref<object>(null);
    private router = ref<object>(null);

    constructor(filter: object, router: object) {
        this.filter = filter
        this.router = router
    }

    public getCloneFilterParams(): object
    {
        return this.parseFilterParams(_.cloneDeep(this.filter))
    }

    public updateUrlQuery(filterParams: object, routeName: string, routeParams: object = {}): void
    {
        const query = this.parseFilterParams(filterParams)
        this.router.replace({ name: routeName, params: routeParams, query: query })
    }

    public parseFilterParams(filter: object): object
    {
        let params = {};

        for (const key in filter) {
            if (typeof filter[key] === 'object') {
                if (filter[key] instanceof Array) {
                    let arr = [];

                    for (const index in filter[key]) {
                        arr.push(filter[key][index])
                    }

                    params[`${key}[]`] = arr
                } else {
                    for (const index in filter[key]) {
                        if (filter[key][index]) params[`${key}[${index}]`] = filter[key][index]
                    }
                }
            } else {
                if (filter[key] != null && filter[key] != undefined && filter[key] != '') {
                    params[key] = filter[key]
                }
            }
        }

        return params
    }

    public async parseUrlQuery(): void
    {
        const query = useRoute().query;

        for (const key in query) {
            let isArray: boolean = false
            let name: string = key

            if (key.indexOf('[]') !== -1) {
                name = key.replace(/[\[\]']+/g, '')
                isArray = true;
            }

            if (this.filter.hasOwnProperty(name)) {
                if (isArray) {
                    this.setProperty(name, query[key] instanceof Array ? query[key] : [query[key]])
                } else {
                    this.setProperty(name, query[key])
                }
            }
        }
    }

    public toggleProperty(propertyName: string, value: string): void
    {
        if (this.filter.hasOwnProperty(propertyName)) {
            const index = this.filter[propertyName].indexOf(value)

            if (index === -1) {
                this.filter[propertyName].push(value)
            } else {
                this.filter[propertyName].splice(index, 1)
            }
        }
    }

    public setProperty(propertyName: string, value: string): void
    {
        if (this.filter.hasOwnProperty(propertyName)) {
            this.filter[propertyName] = value;
        }
    }

    public compareProperty(propertyName: string, value: string): boolean
    {
        return this.filter.hasOwnProperty(propertyName) ? this.filter[propertyName] == value : false
    }
}
