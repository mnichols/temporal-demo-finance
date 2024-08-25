import {goto} from '$app/navigation'
import {base} from '$app/paths'

export const go = async (url: string | URL, opts?: {
    replaceState?: boolean | undefined,
    noScroll?: boolean | undefined,
    keepFocus?: boolean | undefined,
    state?: any,
    invalidateAll?: boolean | undefined
} | undefined): Promise<void> => {
    if (typeof url == 'string' && url.toString().startsWith('/')) {
        return goto(`${base}${url}`, opts)
    }
    return goto(url, opts)
}