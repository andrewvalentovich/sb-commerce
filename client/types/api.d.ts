export { }
declare global {
    export namespace api {
        interface MetApiData {
            data: unknown
        }

        type MetApiMeta = {
            [key: string]: any
        } & Partial<MetApiPaginate>

        export interface MetApiResponse {
            data: MetApiData
        }
        export type Me = Modify<api.MetApiResponse, { data: models.User }>

        export interface MetApiResults {
            data: unknown
            links?: MetApiSimplyLinks
            meta?: MetApiMeta
        }

        export interface MetApiSimplyLinks {
            first: string|null
            last: string|null
            prev: string|null
            next: string|null
        }

        export interface MetApiPaginate {
            current_page: number
            from: number
            to: number
            last_page: number
            per_page: number
            total: number
            path: string
            links: MetApiMetaLink[]
        }

        export interface MetApiMetaLink {
            url: string|null
            label: string|null
            active: boolean
        }
    }
}