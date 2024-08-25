<script lang="ts">
    import {page} from '$app/stores'
    import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'
    import {getContextClient, queryStore, subscriptionStore} from '@urql/svelte'
    import {type CurrentPaymentState, QueryWorkflowDocument, SubCurrentPaymentStateDocument} from '$gql'
    import {onDestroy} from 'svelte'
    import WorkflowStateCard from '$lib/components/workflow/WorkflowStateCard.svelte'
    import {Logger} from '$lib/log/index.js'
    import SignalMarkFinalizable from '$lib/components/workflow/SignalMarkFinalizable.svelte'

    let client = getContextClient()
    let workflowId = $page.params.workflowId


    let unsubscribe = () => {
    }
    let componentDestroy = () => {
    }

    let workflowState: CurrentPaymentState
    let logger = Logger.child({component: 'app[workflowId]'})
    // actual data handler for each event from a subscription
    const handleData = (previousData: any | undefined, data: any) => {
        console.log('handleData', data)
        if (previousData) {
            logger.debug('previousData = %s', JSON.stringify(previousData))
        }
        if (!data) {
            return
        }
        workflowState = data.workflowState
        workflowId = workflowState.paymentCompletionId
    }

    const stateStore = queryStore({
        client,
        query: QueryWorkflowDocument,
        variables: {
            input: {
                workflowId,
                value: 'f'
            }
        }
    })
    const subscribe = (workflowId: string) => {
        unsubscribe()
        let messages = subscriptionStore({
            client,
            query: SubCurrentPaymentStateDocument,
            variables: {input: {workflowId}}
        }, handleData)
        unsubscribe = messages.subscribe(arg => {
            return () => {
            }
        })
    }
    if (stateStore && stateStore.subscribe) {
        stateStore.subscribe(arg => {
            if (arg?.data && arg?.data?.queryWorkflow) {
                workflowState = arg?.data?.queryWorkflow
                if (!workflowState.finalization && workflowState.paymentCompletionId) {
                    subscribe(workflowState.paymentCompletionId)
                }
            }
        })

    }

    onDestroy(unsubscribe)
</script>
<header class='flex'>
    <h1 class='flex'>
        <WorkflowLink workflowId={workflowId} label='Workflow {workflowId}'/>
    </h1>
</header>
<div class='flex flex-col'>
    <WorkflowStateCard workflowState={workflowState}/>
</div>
{#if workflowState && !workflowState.finalization && workflowState.authorization?.approved}
    <div class='flex flex-col border-2 border-slate-800 rounded-2xl w-96 p-4'>
        <SignalMarkFinalizable workflowState={workflowState}/>
    </div>
{/if}


