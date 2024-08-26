<script lang="ts">

import WorkflowLink from '$lib/components/workflow/WorkflowLink.svelte'

const onboardMerchant = async () => {

}
</script>


<div class='prose'>
    <header>
        <h1>Onboard Merchant</h1>
    </header>
    <form on:submit|preventDefault={onboardMerchant} class='flex flex-col prose border-2 border-primary rounded-2xl p-4'>
        <label for='name' class='flex justify-between align-middle items-center'>
            <span class='label label-text'>Merchant Name</span>
            <input type='text' name='name' required class='input w-full max-w-xs'/>
        </label>
        <label for='address-1' class='flex justify-between align-middle items-center'>
            <span class='label label-text'>Address 1</span>
            <input type='text' name='address-1' required class='input w-full max-w-xs'/>
        </label>
        <label for='address-2' class='flex justify-between align-middle items-center'>
            <span class='label label-text'>Address 2</span>
            <input type='text' name='account-id' required class='input w-full max-w-xs'/>
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
</div>
