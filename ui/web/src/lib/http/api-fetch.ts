import {browser} from '$app/environment'
import type {RequireAtLeastOne} from "type-fest"
import {parse} from 'uri-template'

import {PUBLIC_API_ROOT_HOST, PUBLIC_API_ROOT_SCHEME} from '$env/static/public'
import {Logger} from "$lib/log/index.js";

export {parse}
export const csrfCookie = '_csrf'
export const csrfHeader = 'X-CSRF-TOKEN'

const HEADER_CONTENT_TYPE = 'content-type'

interface Expandable {
    expand(values: Record<string, unknown>): string
}

export type TemplatableURL = {
    url?: string
    tpl?: Expandable
    params?: any
}

export type RequiredTemplatableURL = RequireAtLeastOne<TemplatableURL, 'url' | 'tpl'>

export type APIError = {
    code: number
    message: string
    details: unknown[]
}
export type APIErrorResponse = {
    status: number
    statusText: string
    body: APIError
}
export type ErrorCallback = (error: APIErrorResponse) => void

export interface RequestOpts {
    body?: BodyInit
    method?: string
    headers?: Headers
    request?: typeof fetch
    onError?: ErrorCallback,
    isBrowser?: boolean,
}

export type APIResponse = {
    response: Response,
}

export const apiFetch = async <T>(
    url: RequiredTemplatableURL,
    opts: RequestOpts
): Promise<APIResponse> => {
    let actualURL = ''
    let defaultParams = {
        scheme: PUBLIC_API_ROOT_SCHEME,
        host: PUBLIC_API_ROOT_HOST,
    }
    url.params = {...defaultParams, ...url.params || {}}
    if (url.url) {
        let tmp = parse(url.url)
        actualURL = decodeURIComponent(tmp.expand(url.params || {}))
    } else if (url.tpl) {
        actualURL = decodeURIComponent(url.tpl.expand(url.params || {}))
    }
    const {
        request = fetch,
        onError = null,
        isBrowser = browser,
        //headers,
        method = 'GET',
        body,
    } = opts
    let headers = new Headers(opts.headers || {})

    if (!headers.has(HEADER_CONTENT_TYPE)) {
        headers.set(HEADER_CONTENT_TYPE, 'application/json')
    }
    let requestOpts: RequestInit = {
        body,
        method,
        headers,
    }
    // requestOpts = withSecurityOptions(requestOpts, browser)
    requestOpts.headers = Object.fromEntries(new Headers(requestOpts.headers).entries())
    Logger.debug(requestOpts, 'making request to %s', actualURL)
    let res = await request(actualURL, requestOpts)
    Logger.debug('received response [%d] from %s', res?.status, actualURL)
    if ((res.status > 399 && res.status !== 401 && res.status !== 403) && onError) {
        onError({status: res.status, statusText: res.statusText, body: res.body})
    }
    return {
        response: res,
    }
}

export const withSecurityOptions = (
    options: RequestInit = {},
    isBrowser = browser,
): RequestInit => {
    options['credentials'] = 'include'
    options.headers = withCsrf(options?.headers || {}, isBrowser)
    return options
}

export const withCsrf = (headers: HeadersInit, isBrowser: boolean = browser): HeadersInit => {
    if (!isBrowser) {
        return headers || {}
    }
    const h = new Headers(headers)
    if (h.has(csrfHeader)) {
        return h
    }

    try {
        const cookies = document.cookie.split(';')
        let token = cookies.find((c) => c.includes(csrfCookie))
        if (!token) {
            return h
        }
        token = token.trim().slice(csrfCookie.length + 1)
        h.set(csrfHeader, token)
    } catch (err) {
        console.error(err)
    }

    return h
}
export const fetchParams = (opts: RequestOpts): RequestInit => {
    const {
        method = 'GET',
        body,
    } = opts
    let headers = new Headers(opts.headers || {})

    let requestOpts: RequestInit = {
        body,
        method,
        headers,
    }
    // requestOpts = withSecurityOptions(requestOpts, browser)
    requestOpts.headers = Object.fromEntries(new Headers(requestOpts.headers).entries())
    return requestOpts
}