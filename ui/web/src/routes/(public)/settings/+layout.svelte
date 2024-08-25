<script>
    import HolyGrail from "$lib/components/layouts/HolyGrail.svelte"
    import {getContextSettings} from "$lib/stores/settings"

    const settings = getContextSettings()
</script>

<HolyGrail>
    <div slot='header'>
        <h1>public layout. current theme is {$settings.ui?.theme}</h1>
    </div>
    <div slot='left-col'></div>

    <div slot='main'>
        <slot/>
    </div>
    <div slot='footer'>
    </div>
</HolyGrail>
