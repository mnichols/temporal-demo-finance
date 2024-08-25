import type * as activities from './activities.js'
import {CaptureRequest, CurrentPaymentState, QueryQueryWorkflowArgs} from '../../gql/index.js'
import {
    ApplicationFailure,
    condition,
    defineQuery,
    defineSignal,
    proxyActivities,
    setHandler,
    workflowInfo
} from '@temporalio/workflow'


const {
    capture,
    finalize,
    compensate,
} = proxyActivities<typeof activities>({
    startToCloseTimeout: '10 seconds',
})

const signalMarkFinalizable = 'capture'
const queryCurrentWorkflowState = 'currentState'
const currentWorkflowStateQueryDef =
    defineQuery<CurrentPaymentState, [QueryQueryWorkflowArgs]>(queryCurrentWorkflowState)

const markFinalizableSignalDef = defineSignal<[CaptureRequest]>(signalMarkFinalizable)

const paymentCaptureTimeoutMs = 1000 * 180

// completePayment models the steps to capture and perhaps notify customer of payment completion
export async function completePayment(params: CurrentPaymentState): Promise<CurrentPaymentState> {
    const currentState: CurrentPaymentState = params
    let captureRequested: CaptureRequest | undefined

    setHandler(currentWorkflowStateQueryDef, (params: QueryQueryWorkflowArgs) => currentState)
    setHandler(markFinalizableSignalDef, (signalValue: CaptureRequest) => {
        captureRequested = signalValue
    })
    if (!params.authorization?.approved) {
        // here we could journal declined payments and track for fraud detection, audits, etc
        throw ApplicationFailure.create({
            message: "Only approved payments may be completed."
        })
    }

    // either receive a capture request or abandon the payment
    // this humble line of code wipes out Crons, reaper services, zombie payments, etc
    const conditionMet = await condition(() => !!captureRequested, paymentCaptureTimeoutMs)

    if (!conditionMet) {
        // payment was never captured so release the authorization
        // this is a form of compensation
        return currentState
    }

    // another Saga
    if (captureRequested) {
        try {
            currentState.capture = await capture(captureRequested)
        } catch (err) {
            currentState.compensation = await compensate(params)
            throw err
        }
    }

    currentState.finalization = await finalize({
        workflowId: workflowInfo().workflowId,
        value: currentState.capture?.value || currentState.value
    })
    return currentState
}