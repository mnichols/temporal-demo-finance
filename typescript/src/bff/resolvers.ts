import {
    AppInfo,
    AuthorizePaymentResponse,
    CurrentPaymentState,
    FinalizeResponse,
    MutationAuthorizePaymentArgs,
    MutationCaptureArgs,
    QueryQueryWorkflowArgs,
    Resolvers,
} from '../gql/index.js'
import {Client} from '@temporalio/client'
import {authorizePayment} from '../domain/workflows/authorizePayment.js'
import {cfg} from '../config/index.js'

export const createResolvers = (client: Client): Resolvers => {
    const res: Resolvers = {
        Mutation: {
            authorizePayment: async (_, args: Required<MutationAuthorizePaymentArgs>): Promise<AuthorizePaymentResponse> => {
                let res = await client.workflow.execute(authorizePayment, {
                    args: [args.input],
                    taskQueue: cfg.Temporal.worker.taskQueue,
                    workflowId: args.input.paymentId,
                })
                return res
            },
            capture: async (_, args: Required<MutationCaptureArgs>): Promise<FinalizeResponse> => {
                let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
                await wf.signal('capture', args.input)
                return args.input
            }
        },
        Query: {
            queryWorkflow: async (_, args: QueryQueryWorkflowArgs): Promise<CurrentPaymentState> => {

                let wf = client.workflow.getHandle(args.input?.workflowId || 'notfound')
                return wf.query('currentState')
            },
            appInfo: async (_: {}): Promise<AppInfo> => {
                return {
                    name: 'Temporal Application',
                    temporal: {
                        namespace: cfg.Temporal.connection.namespace,
                    }
                }
            }

        },
    }
    return res
}