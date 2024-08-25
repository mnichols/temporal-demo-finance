<script lang="ts">
    import type {CaptureResponse, CurrentPaymentState, PaymentAuthorizationResponse} from '$gql'
    import StateItem from '$lib/components/workflow/StateItem.svelte'

    export let workflowState: CurrentPaymentState

    function calcApprovalState(auth: PaymentAuthorizationResponse | undefined) {
        if (!auth) {
            return 0
        }
        if (auth.approved) {
            return 1
        }

        return -1
    }

    function calcCaptureState(capture: CaptureResponse | undefined) {
        if (!capture) {
            return 0
        }
        if (capture.value > workflowState.value) {
            return -1
        }
        return 1
    }
</script>

<div class='card card-body w-120'>
    {#if workflowState}
        <p><span class='font-extrabold mr-8'>Account ID:</span><span>{workflowState.accountId}</span></p>
        <p><span class='font-extrabold mr-8'>Amount:</span><span>{workflowState.value}</span></p>
        <ul class="max-w-md space-y-1 list-inside">
            <li class="flex">
                <StateItem state={calcApprovalState(workflowState?.authorization)}
                           value={`token is ${workflowState?.authorization?.token}`} label='authorization'/>
            </li>
            {#if workflowState?.authorization?.approved}
                <li class='flex'>
                    <StateItem state={calcCaptureState(workflowState?.capture)}
                               value={`captured amount is ${workflowState?.capture?.value}`} label='capture funds'/>
                </li>
            {/if}
        </ul>
    {/if}

</div>