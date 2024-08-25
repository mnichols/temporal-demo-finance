<script lang='ts'>
    import {getContextClient, mutationStore} from '@urql/svelte'
    import {humanId} from 'human-id'
    import {AuthorizePaymentDocument} from '$gql'
    import {go} from '$lib/nav/index.js'
    import {Logger} from '$lib/log/index.js'
    import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'

    let logger = Logger.child({component: 'startWorkflow'})
    let defaultId = humanId({capitalize: false, separator: '-'})
    let client = getContextClient()
    let startedWorkflowId: string | undefined | null
    let error: string | undefined | null

    const clear = () => {
        if (error || startedWorkflowId) {
            defaultId = humanId({capitalize: false, separator: '-'})
        }
        error = undefined
        startedWorkflowId = undefined
    }

    async function startWorkflow(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        startedWorkflowId = formData.get('id')
        if (startedWorkflowId && formData.get('workflow-value')) {
            mutationStore({
                client,
                query: AuthorizePaymentDocument,
                variables: {
                    input: {
                        paymentId: formData.get('id'),
                        accountId: formData.get('account-id'),
                        value: formData.get('workflow-value'),
                    },
                }
            }).subscribe(arg => {
                if (arg?.data?.authorizePayment) {
                    console.log('redirecting', arg?.data?.authorizePayment)
                    go(`/app/${arg.data.authorizePayment.paymentId}`)
                } else if (arg?.error?.graphQLErrors) {
                    error = arg.error.graphQLErrors.reduce((msg, e) => msg + '\n' + e, 'Error:')
                }
            })

        }
    }
</script>

<form on:submit|preventDefault={startWorkflow} class='flex flex-col prose border-2 border-primary rounded-2xl p-4'>
    <header>
        <h1 class='prose prose-h1:prose-slate prose-2xl'>Make Payment</h1>
    </header>
    <label for='id' class='flex justify-between align-middle items-center'>
        <span class='label label-text'>Payment ID</span>
        <input type='text' name='id' placeholder='Enter id here' required
               class='input w-full max-w-xs'
               value={defaultId}/>
    </label>
    <label for='account-id' class='flex justify-between align-middle items-center'>
        <span class='label label-text'>Account ID</span>
        <input type='text' name='account-id' placeholder='Enter value here' required class='input w-full max-w-xs'
               on:change={clear}/>
    </label>

    <label for='workflow-value' class='flex justify-between align-middle items-center'>
        <span class='label label-text'>Amount</span>
        <input type='text' name='workflow-value' placeholder='Enter value here' required class='input w-full max-w-xs'/>
    </label>
    <button type='submit' class='btn btn-primary m-4' disabled={!!startedWorkflowId}>Submit</button>
    {#if startedWorkflowId}
        <div>
            <WorkflowLink workflowId={startedWorkflowId} label='Workflow {startedWorkflowId}'/>
        </div>
    {/if}
</form>
{#if error}
    <div class='text-error'>{error}</div>

{/if}