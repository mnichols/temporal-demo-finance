import {CurrentPaymentState, Resolvers, SubscriptionWorkflowStateArgs} from '../gql/index.js'
import {Client} from '@temporalio/client'
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

export const createResolvers = (client: Client): Resolvers => {
    const res: Resolvers = {
        Subscription: {
            workflowState: {
                resolve(payload: CurrentPaymentState): Promise<Promise<CurrentPaymentState> | CurrentPaymentState> | Promise<CurrentPaymentState> | CurrentPaymentState {
                    return payload
                },
                subscribe: workflowStateSubscription(client)
            }
        },

    }
    return res
}

// workflowStateSubscription polls for the connected client with a Query...naively.
// ideally this will manage subscriptions that are PUT /sub/{requestId|workflowId} here soon
const workflowStateSubscription = (client: Client) => {
    return async function* (parent: {}, args: Omit<SubscriptionWorkflowStateArgs, "input"> & {
        input: NonNullable<SubscriptionWorkflowStateArgs["input"]>
    }, context: any, info: GraphQLResolveInfo) {
        for await (const time of interval(1000)) {
            let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
            try {
                let result = await wf.query('currentState')
                console.log('result', result)
                yield result
            } catch (e) {
                console.error('subscription error', e)
                throw e
            }
        }
    }
}