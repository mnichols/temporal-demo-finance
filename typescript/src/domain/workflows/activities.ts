import {
    AuthorizePaymentRequest,
    BeginRequest,
    BeginResponse,
    CaptureRequest,
    CaptureResponse,
    CompensateRequest,
    CompensateResponse,
    FinalizeRequest,
    FinalizeResponse,
    MutateApplicationRequest,
    MutateApplicationResponse,
    PaymentAuthorizationResponse,
    QueryRequest,
    QueryResponse,
    ValidateRequest,
    ValidateResponse
} from '../../gql/index.js'
import {Context} from '@temporalio/activity'
import {ApplicationFailure} from '@temporalio/workflow'
import {ERR_ISSUER_SERVICE_FAILURE} from './errors.js'

export async function validate(params: ValidateRequest): Promise<ValidateResponse> {
    return {value: params.value}
}

export async function authorizePayment(params: AuthorizePaymentRequest): Promise<string> {
    return `${params.accountId}__${params.paymentId}__${params.value}`
}

export async function getAuthorization(token: string): Promise<PaymentAuthorizationResponse> {
    const parts = token.split('__')

    // Simulate a service outage that will never recover
    if (token.includes('!issuer')) {
        throw ApplicationFailure.create({
            nonRetryable: true,
            type: ERR_ISSUER_SERVICE_FAILURE, message: 'Simulated issuer API 5xx response timeout'
        })
    }
    // Simulate a bug that can be fixed and redeployed
    if (token.includes('!bug')) {
        throw Error('Simulated bug in activity code')
    }
    return {
        token,
        approved: !token.includes('!declined'),
        value: parts[2]
    }
}

export async function capture(params: CaptureRequest): Promise<CaptureResponse> {
    return {value: params.value}
}

export async function mutateApplication(params: MutateApplicationRequest): Promise<MutateApplicationResponse> {
    return {value: params.value}
}

export async function compensate(params: CompensateRequest): Promise<CompensateResponse> {
    console.log('compensation performed for ', params.value)
    return {value: params.value}
}

export async function query(params: QueryRequest): Promise<QueryResponse> {
    return {value: params.value || 'no value specified'}
}

export async function begin(params: BeginRequest): Promise<BeginResponse> {
    return {value: params.value}
}

export async function finalize(params: FinalizeRequest): Promise<FinalizeResponse> {
    return {value: params.value, workflowId: Context.current().info.workflowExecution?.workflowId}
}
