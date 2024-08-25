<script lang="ts">
    import {themeChange} from 'theme-change'
    import {onMount} from 'svelte'

    import '../app.css'
    import {setContextClient} from "@urql/svelte";
    import {createClient} from '$lib/http/urql/index.js'
    import {createSettings, getContextSettings, setContextSettings} from '$lib/stores/settings.js'

    onMount(() => themeChange())
    const client = createClient()
    setContextClient(client)

    let settings = setContextSettings(createSettings(client))
    // redundant usage but shown here to get settings in nested components
    settings = getContextSettings()

</script>

{#if $settings.ready}
    <div data-theme={$settings.ui.theme} class='h-screen w-screen'>
        <slot/>
    </div>
{/if}