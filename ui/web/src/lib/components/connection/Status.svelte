<script lang="ts">
    export let store = undefined
    $: paused = store.isPaused$
</script>
{#if $store?.error}
    <div class='badge badge-error tooltip' data-tip={$store.error?.message}>disconnected</div>
{:else if !$store.error && !$paused}
    <button class='badge badge-accent tooltip' data-tip='click to pause' on:click={store.pause()}>connected</button>
{:else if $paused}
    <button class='badge badge-warning tooltip' data-tip='click to resume' on:click={store.resume()}>paused</button>
{:else if !$store.fetching}
    <div class='badge badge-neutral'>disconnected</div>
{/if}