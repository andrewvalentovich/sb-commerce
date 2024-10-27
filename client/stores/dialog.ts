import { acceptHMRUpdate, defineStore } from 'pinia'
import { Router } from 'vue-router'

interface Dialogs {
    dialogAuth: Dialog
    adminUser: Dialog
    adminCategory: Dialog
    adminTag: Dialog
    adminProduct: Dialog
}

interface Dialog {
    active: boolean
    opened: number
    closed: number
}

interface State {
    dialogs: Dialogs,
}

export const useDialog = defineStore('dialog', {
    state: (): State => ({
        dialogs: {
            dialogAuth: {
                active: false,
                opened: 0,
                closed: 0,
            },
            adminUser: {
                active: false,
                opened: 0,
                closed: 0,
            },
            adminCategory: {
                active: false,
                opened: 0,
                closed: 0,
            },
            adminTag: {
                active: false,
                opened: 0,
                closed: 0,
            },
            adminProduct: {
                active: false,
                opened: 0,
                closed: 0,
            },
        }
    }),

    getters: {
        //
    },

    actions: {
        d(dialog: string): Dialog {
            return this.dialogs[dialog]
        },

        has(dialog: string): boolean {
            return !! this.dialogs[dialog].active
        },

        open(dialog: string): void {
            this.dialogs[dialog].active = true
            this.dialogs[dialog].opened++
        },

        close(dialog: string): void {
            this.dialogs[dialog].active = false
            this.dialogs[dialog].closed++
        },

        toggle(dialog: string, force: void | boolean): void {
            let newStatus: boolean = typeof force === 'boolean'
                ? force
                : ! this.dialogs[dialog]

            newStatus ? this.open(dialog) : this.close(dialog)
        },

        eatOpen(): boolean {
            return !! Object.keys(this.dialogs).filter((dialog: string) => !! this.dialogs[dialog].active).length
        },

        closeAll(): void {
            Object.keys(this.dialogs).forEach((dialog: string) => {
                // this.dialogs[dialog].active = false
                this.close(dialog)
            })
        },

        opened(dialog: string): boolean {
            return this.dialogs[dialog].opened
        },

        closed(dialog: string): boolean {
            return this.dialogs[dialog].closed
        }
    },
})

export const useDialogAuth = defineStore('dialogAuth', {
    state: () => ({
        active: {
            login: false,
            register: false,
            recovery: false
        }
    }),

    getters: {
        //
    },

    actions: {
        setActive(dialog, bool) {
            this.active[dialog] = typeof bool === 'boolean'
                ? bool
                : ! this.active[dialog]
        },

        activateLogin() {
            // this.setActive('register', false)
            this.deactivateAll()
            this.setActive('login', true)
        },

        activateRegister() {
            // this.setActive('login', false)
            this.deactivateAll()
            this.setActive('register', true)
        },

        activateRecovery() {
            // this.setActive('login', false)
            this.deactivateAll()
            this.setActive('recovery', true)
        },

        deactivateAll() {
            Object.keys(this.active).forEach((key) => {
                this.active[key] = false
            })
        }
    },
})
