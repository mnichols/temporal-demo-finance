import {vi} from "vitest"

export type MockResponse<T = unknown> = {
    body: Promise<T>
    ok: boolean
    status: number
    statusText: string
}
export const waitForResponse = async (timeoutMs: number = 10) => {
    return new Promise(r => setTimeout(r, timeoutMs))
}

export const createFetchMock = (res: MockResponse) => {
    return vi.fn(async () => {
        return Promise.resolve({
            json: () => Promise.resolve(res.body),
            ...res,
        })
    }) as unknown as typeof fetch
}
export const withCookie = async (cookie: string, fn: () => void) => {
    const currentCookie = document.cookie

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: cookie,
    })

    fn()

    Object.defineProperty(document, 'cookie', {
        writable: true,
        value: currentCookie,
    })
}