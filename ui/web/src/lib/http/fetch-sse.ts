import type {RequestOpts, RequiredTemplatableURL, APIResponse, ErrorCallback} from '$lib/http/api-fetch'
import { fetchEventSource} from "@microsoft/fetch-event-source"
import type {EventSourceMessage,  FetchEventSourceInit} from "@microsoft/fetch-event-source"
import {PUBLIC_API_ROOT_HOST, PUBLIC_API_ROOT_SCHEME} from "$env/static/public";
import { parse } from 'uri-template'
import {noop} from "svelte/internal";
import {browser} from "$app/environment";
import {withSecurityOptions} from "$lib/http/api-fetch";
import { Logger } from '$log'
const HEADER_CONTENT_TYPE='content-type'


export interface SSEReqInit extends FetchEventSourceInit {
    body?: BodyInit
    method?: string
    request?: typeof fetch
    isBrowser?: boolean,
    signal?: AbortSignal | null,
}
export type SSERequestOpts = {
    body?: BodyInit
    method?: string
    headers?: Headers
    request?: typeof fetch
    isBrowser?: boolean,
    onMessage?: (ev: EventSourceMessage) => void | undefined,
    onError?:  (err: any) => (number | void | null | undefined) | undefined,
    onClose?: () => void | undefined,
    onOpen?: (response: any) => void | undefined,
    signal?: AbortSignal | null,
}
export const fetchSSE = async<T>(
    url: RequiredTemplatableURL,
    opts: SSEReqInit,
): Promise<void> => {
    let actualURL = ''
    let defaultParams = {
        scheme: PUBLIC_API_ROOT_SCHEME,
        host: PUBLIC_API_ROOT_HOST,
    }
    url.params = { ...defaultParams, ...url.params || {} }
    if(url.url) {
        let tmp = parse(url.url)
        actualURL = decodeURIComponent(tmp.expand(url.params || {}))
    } else if (url.tpl) {
        actualURL = decodeURIComponent(url.tpl.expand(url.params || {}))
    }
    Logger.debug('fetching sse from %s', actualURL)
    const {
        request = fetch,
        onerror = noop(),
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
    requestOpts = withSecurityOptions(requestOpts, browser)
    requestOpts.headers = Object.fromEntries(new Headers(requestOpts.headers).entries())

    let fetchSourceInit : FetchEventSourceInit = {
        body,
        method,
        headers:requestOpts.headers,
        onmessage: opts?.onmessage,
        onerror: opts?.onerror,
        onclose: opts?.onclose,
        onopen: opts?.onopen,
        signal: opts?.signal,
    }
    await fetchEventSource(actualURL, fetchSourceInit)
}