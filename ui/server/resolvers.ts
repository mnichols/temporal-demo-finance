import {Pong, QueryPongArgs, Resolvers, Subscription, SubscriptionSubPingArgs} from './generated.js'
import {GraphQLResolveInfo} from 'graphql'

function delay(t: any) {
    return new Promise(resolve => setTimeout(resolve, t))
}

async function* interval(t: any) {
    while (true) {
        let now = Date.now()
        yield now + ''
        await delay(now - Date.now() + t)
    }
}

// subPingSubscription yields the current time prepended by the input `value` for the subscription every 1000ms
const subPingSubscription = {
    subscribe: async function* (parent: Subscription, args: Partial<SubscriptionSubPingArgs>, context: any, info: GraphQLResolveInfo) {
        for await (const time of interval(1000)) {
            yield `server reply: ${args.input?.value} @ ${time}`
        }
    },
    resolve: (payload: any): Pong => {
        console.log('returning payload', payload)
        return {value: payload}
    }
}
export const resolvers: Resolvers = {
    Query: {
        pong: (args: QueryPongArgs) => {
            return {value: args.input?.value}
        }
    },
    Subscription: {
        subPing: subPingSubscription,
    }
}