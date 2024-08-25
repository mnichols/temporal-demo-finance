<script lang='ts'>
    import StartWorkflow from '$lib/components/workflow/StartWorkflow.svelte'
</script>

<StartWorkflow/>

<!--{#if $workflow && $workflow.data}-->
<!--    <a href='{$workflow.data.executeWorkflow.workflowId}' class='link'>{$workflow.data.executeWorkflow.workflowId}</a>-->
<!--{/if}-->
