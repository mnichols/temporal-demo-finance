import type * as activities from './activities.js'
import {
    AuthorizePaymentRequest,
    AuthorizePaymentResponse,
    CurrentPaymentState,
    QueryQueryWorkflowArgs
} from '../../gql/index.js'
import {
    defineQuery,
    ParentClosePolicy,
    proxyActivities,
    setHandler,
    startChild,
    workflowInfo
} from '@temporalio/workflow'
import {ERR_ISSUER_SERVICE_FAILURE} from './errors.js'
import {completePayment} from './completePayment.js'


const {
    authorizePayment: doAuthorizePayment,
    getAuthorization,
    compensate,
} = proxyActivities<typeof activities>({
    startToCloseTimeout: '10 seconds',
    retry: {
        nonRetryableErrorTypes: [ERR_ISSUER_SERVICE_FAILURE]
    }
})

const queryCurrentWorkflowState = 'currentState'
const currentWorkflowStateQueryDef =
    defineQuery<CurrentPaymentState, [QueryQueryWorkflowArgs]>(queryCurrentWorkflowState)

// authorizePayment rapidly gets an authorization for UX and then continues asynchronously thru settlement
export async function authorizePayment(params: AuthorizePaymentRequest): Promise<AuthorizePaymentResponse> {
    // initialize business state we can use to track during progress
    const currentState: CurrentPaymentState = {
        accountId: params.accountId,
        value: params.value,
        authorizationToken: undefined,
        authorization: undefined,
        capture: undefined,
        applicationMutation2: undefined,
        compensation: undefined,
        beginning: undefined,
        finalization: undefined,
        finalizable: undefined,
        paymentId: workflowInfo().workflowId,
        // mint the identifier to be used for the workflow for checking in on payment completion progress
        paymentCompletionId: `comp_${params.paymentId}`,
    }

    // expose this state to the outside via Query
    setHandler(currentWorkflowStateQueryDef, (params: QueryQueryWorkflowArgs) => currentState)

    // Saga pattern is merely a try...catch statement
    try {
        currentState.authorizationToken = await doAuthorizePayment(params)
        currentState.authorization = await getAuthorization(currentState.authorizationToken)
    } catch (err) {
        currentState.compensation = await compensate(params)
        throw err
    }

    // continue async process for capture and settlement but
    // support synchronous response for UX
    await startChild(completePayment, {
        workflowId: currentState.paymentCompletionId,
        args: [currentState],
        parentClosePolicy: ParentClosePolicy.PARENT_CLOSE_POLICY_ABANDON,
    })
    return {
        token: currentState.authorizationToken,
        value: currentState.value,
        paymentId: currentState.paymentId,
        approved: currentState.authorization?.approved
    }
}