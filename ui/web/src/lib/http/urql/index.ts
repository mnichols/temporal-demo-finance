import {Client, createClient as createURQLClient, debugExchange, fetchExchange,} from '@urql/svelte'
import {PUBLIC_GRAPHQL_URL, PUBLIC_SUBSCRIPTIONS_URL} from "$env/static/public";
// import { createAuthExchange } from "./auth";
import {createCacheExchange} from './cache.js'
import {devtoolsExchange} from '@urql/devtools';

import {fetchParams} from "../api-fetch.js";
import {createSubscriptionExchange} from '$lib/http/urql/subscription.js'


export const createClient = (): Client => {
    return createURQLClient({
        url: PUBLIC_GRAPHQL_URL,
        // fetchSubscriptions: true,
        exchanges: [
            devtoolsExchange,
            debugExchange,
            createCacheExchange(), // use the normalized caching  (https://formidable.com/blog/2020/normalized-cache/ to get behavior https://github.com/urql-graphql/urql/discussions/2809)
            // createAuthExchange(),
            createSubscriptionExchange(PUBLIC_SUBSCRIPTIONS_URL),
            fetchExchange,
        ],
        fetchOptions: () => {
            let params = fetchParams({})
            return params
        },
    })
}
export const createTestClient = (): Client => {
    return createURQLClient({
        url: PUBLIC_GRAPHQL_URL,
        exchanges: [
            debugExchange,
            fetchExchange,
        ],
        fetchOptions: () => {
            let params = fetchParams({})
            return params
        },
    })
}
