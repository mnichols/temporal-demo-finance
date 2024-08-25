<script lang="ts">
    import {getContextClient, subscriptionStore} from "@urql/svelte";
    import {Logger} from '$lib/log/index.js'
    import {SubPingDocument} from '$gql'
    import {serializeError} from 'serialize-error'
    import Status from '$lib/components/connection/Status.svelte'
    import {onDestroy} from 'svelte'

    let logger = Logger.child({component: 'tools'})
    let vals: string[] = []
    $: showVals = vals
    let client = getContextClient()

    const MAX_ITEM_COUNT = 50
    // actual data handler for each event from a subscription
    const handleData = (previousData: any | undefined, data: any) => {
        if (previousData) {
            logger.debug('previousData = %s', JSON.stringify(previousData))
        }
        if (!data) {
            return
        }
        logger.debug('current data = %s', JSON.stringify(data))

        // just keep the last 50 replies
        if (vals.length == MAX_ITEM_COUNT) {
            vals = [data.subPing.value]
        } else {
            vals = [data.subPing.value, ...vals]
        }

    }
    // see here for subscriptionStore docs: https://commerce.nearform.com/open-source/urql/docs/api/svelte/
    let messages = subscriptionStore({client, query: SubPingDocument, variables: {input: {value: 'ping'}}}, handleData)
    let unsubscribe = messages.subscribe(arg2 => {
        if (arg2.error) {
            logger.error({
                error: serializeError(arg2.error)
            }, 'subscriptionStore errored')
            return
        }

        if (arg2.fetching) {
            logger.debug('fetching')
        }
        if (arg2.stale) {
            logger.debug('stale')
        }
        return () => {
            logger.debug('ss.unsubscribing')
        }
    })
    onDestroy(unsubscribe)
</script>

<div class='prose'>
    <header>
        <h1>Subscription Diagnostics</h1>
    </header>
    <p class='italic'>Click <a class='link' href='/diag/subscriptions/simple'>here to see a simpler example of using
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
        <h2>This is a demonstration of how to accumulate events from a subscription and list them.</h2>
        {#if $messages.error}
            <p class='text-error'>Error... {$messages.error.message}</p>
        {:else if showVals.length < 1}
            <p class='text-secondary'>No Data</p>
        {:else}
            <div class='overflow-y-scroll h-80 border-2 border-neutral overscroll-auto'>
                <ul class='m-4'>
                    {#each showVals as sub, index}
                        <li>
                            <div class='pl-4 pr-4 bg-gray-100 text-black-content'>{showVals.length - index}/{sub}</div>
                            <div class="divider">--</div>
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</div>