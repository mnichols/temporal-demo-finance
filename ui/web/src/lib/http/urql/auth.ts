import type {CombinedError, Exchange, Operation} from "@urql/svelte";
import {authExchange} from "@urql/exchange-auth";
import {get} from "svelte/store";
import {doLogout, goLogin, tokenStore} from "$lib/stores/auth-user";
import {makeOperation} from "@urql/core";

export const createAuthExchange = (): Exchange => {
    return authExchange(async utils => {
        return {
            addAuthToOperation,
            didAuthError,
            refreshAuth,
        }
    })
}
const didAuthError = (error: CombinedError, _operation: Operation) => {
    return error.graphQLErrors.some(e => e.extensions?.code === 'FORBIDDEN') ||
        error.graphQLErrors.some(e => e.extensions?.code === 'UNAUTHORIZED') ||
        (error.response && error.response.status === 401)
}
const addAuthToOperation = (operation: Operation) => {
    let token = get(tokenStore)
    if (!token) {
        return operation
    }

    const fetchOptions =
        typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {}

    return makeOperation(operation.kind, operation, {
        ...operation.context,
        fetchOptions: {
            ...fetchOptions,
            headers: {
                ...fetchOptions.headers,
                Authorization: `Bearer ${token}`,
            },
        },
    })
}
const refreshAuth = async (): Promise<void> => {
    await doLogout()
    return await goLogin()
}