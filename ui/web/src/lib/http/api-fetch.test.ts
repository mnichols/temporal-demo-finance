import {describe, expect, it} from 'vitest'
import {apiFetch, csrfCookie, csrfHeader, parse, withSecurityOptions} from './api-fetch'
import {createFetchMock, withCookie} from "$lib/http/testhelper.js";
import apiRootResponse from '$fixtures/api-root.json'

describe('withSecurityOptions', () => {
    it('should preserve passed in headers', async () => {
        let headers = {'x-foo': 'bar'}
        const actual = withSecurityOptions({headers}, true)

        let h = new Headers(actual.headers)

        expect(h.has('x-foo')).toBeTruthy()
        expect(h.get('x-foo')).toEqual('bar')
    })
})
describe('apiFetch', () => {
    const url = '/api'
    const tpl = 'https://demo.tmprl-sa.cloud/myapp/api{?options*}'
    const defaultOpts = {
        'body': undefined,
        'credentials': 'include',
        'method': 'GET',
        'headers': {
            'content-type': 'application/json',
        }
    }
    it('should fetch the url', async () => {
        const request = createFetchMock({
            body: apiRootResponse,
            ok: true,
            status: 200,
            statusText: 'ok',
        })
        await apiFetch({url}, {request})
        expect(request).toHaveBeenCalledWith(url, defaultOpts)
    })
    it('should expand uri templates', async () => {
        let params = {
            options: {
                opt1: 'foo',
                opt2: 'bar'
            }
        }
        const request = createFetchMock({
            body: apiRootResponse,
            ok: true,
            status: 200,
            statusText: 'ok',
        })
        console.log('defaultOpts', defaultOpts)
        await apiFetch({url: tpl, params}, {request})
        expect(request).toHaveBeenCalledWith('https://demo.tmprl-sa.cloud/myapp/api?opt1=foo&opt2=bar', defaultOpts)
    })
    it('should accept parsed templates', async () => {
        let params = {
            options: {
                opt1: 'foo',
                opt2: 'bar'
            }
        }
        const request = createFetchMock({
            body: apiRootResponse,
            ok: true,
            status: 200,
            statusText: 'ok',
        })
        await apiFetch({tpl: parse(tpl), params}, {request})
        expect(request).toHaveBeenCalledWith('https://demo.tmprl-sa.cloud/myapp/api?opt1=foo&opt2=bar', defaultOpts)
    })
    it('should support csrf', async () => {
        let token = 'token'
        let params = {
            options: {
                opt1: 'foo',
                opt2: 'bar'
            }
        }
        const request = createFetchMock({
            body: apiRootResponse,
            ok: true,
            status: 200,
            statusText: 'ok',
        })
        await withCookie(`${csrfCookie}=${token}`, async () => {
            await apiFetch({tpl: parse(tpl), params}, {request})
        })
        let csrfOpts: any = {
            headers: {
                'content-type': 'application/json',
            }
        }
        csrfOpts.headers[`${csrfHeader.toLowerCase()}`] = token

        expect(request).toHaveBeenCalledWith('https://demo.tmprl-sa.cloud/myapp/api?opt1=foo&opt2=bar', {...defaultOpts, ...csrfOpts})
    })
    it('should handle errors', async () => {
        let errd: Response
        const request = createFetchMock({
            body: Promise.resolve({
                code: 42,
                message: 'here is an error',
                details: ['bonk']
            }),
            ok: true,
            status: 400,
            statusText: 'ok',
        })
        await apiFetch({tpl: parse(tpl)}, {
            request,
            onError: (e) => {
                errd = e
            }
        })
        expect(errd).toBeTruthy()
        expect(errd.status).to.eql(400)
    })
    it('should return response', async () => {
        const request = createFetchMock({
            body: apiRootResponse,
            ok: true,
            status: 200,
            statusText: 'ok',
        })
        let actual = await apiFetch({url}, {request})
        expect(await actual.response.json()).toEqual(apiRootResponse)
        expect(actual.response.status).toEqual(200)
    })
})


/* OLD */
// import { URLSearchParams } from 'url'
// import { describe, expect, it, vi } from 'vitest'
// import { apiFetch } from './api-fetch'
// import { handleError } from './errors'
//
// import apiRootResponse from '$fixtures/api-root.json'
//
// type MockResponse<T = unknown> = {
//   body: Promise<T>
//   ok: boolean
//   status: number
//   statusText: string
// }
//
// type ErrorResponse = {
//   response: Response
//   statusCode: number
//   statusText: string
//   message: string
// }
//
// vi.mock('./handle-error', () => {
//   return { handleError: vi.fn() }
// })
//
// const withCookie = async (cookie: string, fn: () => void) => {
//   const currentCookie = document.cookie
//
//   Object.defineProperty(document, 'cookie', {
//     writable: true,
//     value: cookie,
//   })
//
//   fn()
//
//   Object.defineProperty(document, 'cookie', {
//     writable: true,
//     value: currentCookie,
//   })
// }
//
// describe('apiFetch', () => {
//   const endpoint = '/api/endpoint'
//   const responseBody = apiRootResponse
//
//   const options = {
//     credentials: 'include',
//     headers: {},
//   }
//
//   const fetchMock = <T = unknown>(
//     body: T = responseBody,
//     response: Partial<MockResponse> = {},
//   ) =>
//     vi.fn(async () => {
//       return Promise.resolve({
//         json: () => Promise.resolve(body),
//         status: 200,
//         statusText: 'OK',
//         ok: true,
//         ...response,
//       })
//     }) as unknown as typeof fetch
//
//   it('should fetch the endpoint', async () => {
//     const request = fetchMock()
//     await apiFetch(endpoint, { request })
//     expect(request).toHaveBeenCalledWith(endpoint + '?', options)
//   })
//
//   it('should add credentials to options', async () => {
//     const request = fetchMock()
//     await apiFetch(endpoint, { request, options: {} })
//     expect(request).toHaveBeenCalledWith(endpoint + '?', options)
//   })
//
//   it('should add csrf cookie to headers', async () => {
//     const token = 'token'
//
//     const request = fetchMock()
//     await withCookie(`_csrf=${token}`, async () => {
//       await apiFetch(endpoint, { request })
//     })
//
//     expect(request).toHaveBeenCalledWith(endpoint + '?', {
//       ...options,
//       headers: {
//         'X-CSRF-TOKEN': token,
//       },
//     })
//   })
//
//   it('should not add csrf cookie to headers if not present', async () => {
//     const token = 'token'
//
//     const request = fetchMock()
//     await withCookie(`_nope=${token}`, async () => {
//       await apiFetch(endpoint, { request })
//     })
//
//     expect(request).toHaveBeenCalledWith(endpoint + '?', options)
//   })
//
//   it('should not add csrf cookie to headers if not running in the browser', async () => {
//     const token = 'token'
//
//     const request = fetchMock()
//     await withCookie(`_csrf=${token}`, async () => {
//       await apiFetch(endpoint, { request, isBrowser: false })
//     })
//
//     expect(request).toHaveBeenCalledWith(endpoint + '?', options)
//   })
//
//   it('should not add csrf cookie to headers it already exists', async () => {
//     const token = 'token'
//     const headers = {
//       'X-CSRF-TOKEN': 'pre-existing',
//     }
//     const opts = { ...options, headers }
//
//     const request = fetchMock()
//     await withCookie(`_csrf=${token}`, async () => {
//       await apiFetch(endpoint, { request, options: opts as RequestInit })
//     })
//
//     expect(request).toHaveBeenCalledWith(endpoint + '?', opts)
//   })
//
//   it('should create an empty array of headers if not provided', async () => {
//     const request = fetchMock()
//     await apiFetch(endpoint, { request, options: undefined })
//     expect(request).toHaveBeenCalledWith(endpoint + '?', options)
//   })
//
//   it('should pass through search params', async () => {
//     const params = { query: 'WorkflowId="Test"' }
//     const encodedParams = new URLSearchParams(params).toString()
//     const request = fetchMock()
//
//     await apiFetch(endpoint, {
//       request,
//       params,
//     })
//
//     expect(request).toHaveBeenCalledWith(
//       endpoint + '?' + encodedParams,
//       options,
//     )
//   })
//
//   it('should add the next page token', async () => {
//     const params = { query: 'WorkflowId="Test"' }
//     const encodedParams = new URLSearchParams({
//       ...params,
//       next_page_token: 'nextPage',
//     }).toString()
//     const request = fetchMock()
//
//     await apiFetch(endpoint, {
//       request,
//       params,
//       token: 'nextPage',
//     })
//
//     expect(request).toHaveBeenCalledWith(
//       endpoint + '?' + encodedParams,
//       options,
//     )
//   })
//
//   it('should return the response', async () => {
//     const request = fetchMock()
//     const result = await apiFetch(endpoint, {
//       request,
//     })
//
//     expect(result).toEqual(responseBody)
//   })
//
//   it('should call on onError if the response is not ok', async () => {
//     const onError = vi.fn()
//     const status = 403
//     const statusText = 'Unauthorized'
//     const body = { error: statusText }
//     const ok = false
//
//     const request = fetchMock(body, { status, ok, statusText })
//
//     await apiFetch(endpoint, { request, onError })
//
//     expect(onError).toHaveBeenCalledWith({
//       body,
//       status,
//       statusText,
//     })
//   })
//
//   it('should throw if the response is not ok, no onError handler was provided, and notifyOnError is false', async () => {
//     const status = 403
//     const statusText = 'Unauthorized'
//     const body = { error: statusText }
//     const ok = false
//
//     const request = fetchMock(body, { status, ok, statusText })
//     const error = await apiFetch(endpoint, {
//       request,
//       notifyOnError: false,
//     }).catch((error) => error)
//
//     expect((error as unknown as ErrorResponse).statusCode).toBe(status)
//   })
//
//   it('should call handleError if onError is not provided', async () => {
//     const status = 403
//     const statusText = 'Unauthorized'
//     const body = { error: statusText }
//     const ok = false
//
//     const request = fetchMock(body, { status, ok, statusText })
//     await apiFetch(endpoint, {
//       request,
//     })
//
//     expect(handleError).toHaveBeenCalled()
//   })
//
//   it('should not retry if the shouldRetry is false', async () => {
//     const status = 403
//     const statusText = 'Unauthorized'
//     const body = { error: statusText }
//     const ok = false
//
//     const onRetry = vi.fn()
//
//     const request = fetchMock(body, { status, ok, statusText })
//     await apiFetch(endpoint, {
//       request,
//       shouldRetry: false,
//       onRetry,
//     })
//
//     expect(onRetry).not.toHaveBeenCalled()
//   })
//
//   it('should retry if shouldRetry is true and there are retries left', async () => {
//     const status = 403
//     const statusText = 'Unauthorized'
//     const body = { error: statusText }
//     const ok = false
//
//     const onRetry = vi.fn()
//
//     const request = fetchMock(body, { status, ok, statusText })
//     await apiFetch(
//       endpoint,
//       {
//         request,
//         shouldRetry: true,
//         retryInterval: 0,
//         onRetry,
//       },
//       2,
//     )
//
//     expect(onRetry).toHaveBeenCalled()
//   })
//
//   it('should not retry if there are no retries left', async () => {
//     const status = 403
//     const statusText = 'Unauthorized'
//     const body = { error: statusText }
//     const ok = false
//
//     const onRetry = vi.fn()
//
//     const request = fetchMock(body, { status, ok, statusText })
//     await apiFetch(
//       endpoint,
//       {
//         request,
//         shouldRetry: true,
//         onRetry,
//       },
//       0,
//     )
//
//     expect(onRetry).not.toHaveBeenCalled()
//   })
// })
