<script lang="ts">
    import {getContextClient, mutationStore} from '@urql/svelte'
    import {CaptureDocument, type CurrentPaymentState} from '$gql'

    export let workflowState: CurrentPaymentState
    const client = getContextClient()

    async function markFinalizable(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        if (formData.get('value')) {
            let workflow = mutationStore({
                client,
                query: CaptureDocument,
                variables: {
                    input: {
                        workflowId: workflowState.paymentCompletionId,
                        value: formData.get('value'),
                    },
                }
            })
        }
    }
</script>
<form on:submit|preventDefault={markFinalizable} class='flex flex-col'>
    <h3 class='prose prose-slate prose-2xl'>Capture Funds</h3>
    <label for='value' class='label'>
        <span class='label-text prose prose-lg'>Value</span>
        <input type='text' name='value' placeholder='Enter value here' required class='input w-full max-w-xs'
               value={workflowState.value}/>
    </label>

    <button type='submit' class='btn btn-primary'>Submit</button>
</form>