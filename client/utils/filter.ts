export class Filter {
    private filter: any = {};

    constructor(private store: object, private filterName: string) {
        this.filter = this.store[this.filterName]
    }

    public getCloneFilterParams(): object
    {
        return this.parseFilterParams(JSON.parse(JSON.stringify(this.filter)))
    }

    public updateUrlQuery(filterParams: object, routeName: string, routeParams: object = {}): void
    {
        const query = this.parseFilterParams(filterParams)

        useRouter().replace({ name: routeName, params: routeParams, query: query })
    }

    public parseFilterParams(obj: object): object
    {
        let params = {};

        for (const key in obj) {
            if (obj[key] instanceof Array) {
                let arr = [];

                for (const index in obj[key]) {
                    arr.push(obj[key][index])
                }

                params[`${key}[]`] = arr
            } else {
                if (obj[key] != null && obj[key] != undefined && obj[key] != '') {
                    params[key] = obj[key]
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

    public changePage(page: number): void
    {
        this.filter.page = page;
    }
}
