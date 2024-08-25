import {derived, get, type Readable, type Updater, type Writable, writable} from 'svelte/store'
import {type AppInfo, AppInfoDocument} from '$gql'
import type {Client} from '@urql/core'
import {getContextClient, queryStore} from '@urql/svelte'
import {getContext, setContext} from 'svelte'

const _contextKey = '$$_settings'

export interface UISettings {
    theme: string
}

export interface Settings {
    ui: UISettings,
    appInfo: AppInfo,
    ready: Boolean,
}

export interface SettingsStore extends Writable<Settings> {
}

export const themes = [
    'light',
    'dark',
    'corporate',
    'business',
    'wireframe',
    'cmyk',
    'coffee',
    'winter',
    // 'cupcake',
    // 'bumblebee',
    // 'emerald',
    // 'synthwave',
    // 'retro',
    // 'cyberpunk',
    // 'valentine',
    // 'halloween',
    // 'garden',
    // 'forest',
    // 'aqua',
    // 'lofi',
    // 'pastel',
    // 'fantasy',
    // 'black',
    // 'luxury',
    // 'dracula',
    // 'autumn',
    // 'acid',
    // 'lemonade',
    // 'night',
    // 'dim',
    // 'nord',
    // 'sunset',
]

export const getContextSettings = (): SettingsStore => {
    const out = getContext(_contextKey)

    return out as SettingsStore
}
export const setContextSettings = (settings: SettingsStore): SettingsStore => {
    setContext(_contextKey, settings)
    return settings
}
export const createSettings = (client: Client): SettingsStore => {
    if (!client) {
        client = getContextClient()
    }
    const appInfo = queryStore({
        client,
        query: AppInfoDocument,

    })

    const uiSettings: Writable<UISettings> = writable({
        theme: themes[0],
    })

    // internal "bridge: store to force a http request with urql (appInfo store)
    // this allows subsequent reads to our api to update this derived store below
    const appInfoBridge: Writable<AppInfo> = writable()
    appInfo.subscribe(arg => {
        if (arg.data?.appInfo) {
            appInfoBridge.set(arg.data?.appInfo)
        }
    })
    const store: Readable<Settings> = derived([uiSettings, appInfoBridge], ([$ui, $appInfo], set) => {
        set({ui: $ui, appInfo: $appInfo, ready: !!$ui && !!$appInfo})
    })

    return {
        update(updater: Updater<Settings>): void {
            updater(get(store))
        },
        set: value => {
            uiSettings.set(value.ui)
        },
        subscribe: store.subscribe,
    }
}