<script lang="ts">
    import {getContextClient, subscriptionStore} from "@urql/svelte";
    import {SubPingDocument} from '../../../../../gql/index.js'
    import Status from '$lib/components/connection/Status.svelte'

    let vals: string[] = []
    $: showVals = vals
    let client = getContextClient()
    // see here for subscriptionStore docs: https://commerce.nearform.com/open-source/urql/docs/api/svelte/
    let messages = subscriptionStore({client, query: SubPingDocument, variables: {input: {value: 'foo'}}})

</script>

<div class='prose'>
    <header>
        <h1>Subscription Diagnostics (Simple)</h1>
    </header>
    <p class='italic'>Click <a class='link' href='/diag'>here to see a more complex example of using
        subscriptions</a></p>
    <div>
        <p>This <span>&#128071;</span> is a reusable component you can use to pause/resume subscriptions.</p>
        <Status store={messages}/>
    </div>
    <p class='italic'>Default retry options for SSE Client found <a
            class='link'
            about='_blank'
            href='https://the-guild.dev/graphql/sse/docs/interfaces/client.ClientOptions#retry'>here</a>
    </p>

    <div>
        <h2>This is a demonstration of how to show an event received from a subscription.</h2>
        {#if $messages.error}
            <p class='text-error'>Error... {$messages.error.message}</p>
        {:else if !$messages.data}
            <p class='text-secondary'>No Data</p>
        {:else}
            <p>Current Value: {$messages.data.subPing.value}</p>
        {/if}
    </div>
</div>