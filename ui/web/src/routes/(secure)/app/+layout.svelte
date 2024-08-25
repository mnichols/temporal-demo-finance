<script lang='ts'>
    import HolyGrail from '$lib/components/layouts/HolyGrail.svelte'
    import temporalCloud from '$lib/images/temporal-cloud.png'
    import temporalLocal from '$lib/images/temporal-logo.png'

    import {getContextSettings} from '$lib/stores/settings.js';
    import DiagLink from '$lib/components/nav/ToolsLink.svelte'
    import SettingsLink from '$lib/components/nav/SettingsLink.svelte'
    import HomeLink from '$lib/components/nav/HomeLink.svelte'

    const settings = getContextSettings()
    settings.subscribe(s => {
        console.log('temporal value', s?.appInfo?.temporal)
    })
</script>

<HolyGrail>
    <header slot='header'>
        <div class='corner'>
            <a href='https://cloud.temporal.io/namespaces/{$settings?.appInfo?.temporal.namespace}' target='_blank'>
                <img src={temporalCloud} alt='Temporal Cloud'/>
            </a>
        </div>
        <h1 class='prose prose-2xl'>{$settings.appInfo.name}</h1>
        <div class='corner'>
            <a href='http://localhost:8233' target='_blank'>
                <img src={temporalLocal} alt='Temporal Local'/>
            </a>
        </div>
    </header>
    <div slot='left-col' class='flex flex-col w-full h-full'>
        <ul class='flex flex-col w-full h-full bg-neutral-200'>
            <li>
                <HomeLink/>
            </li>
            <li>
                <SettingsLink/>
            </li>
            <li>
                <DiagLink/>
            </li>
        </ul>
    </div>

    <div slot='main'>
        <slot/>
    </div>
    <div slot='footer'>
    </div>
</HolyGrail>

<style>
    header {
        display: flex;
        justify-content: space-between;
    }

    .corner {
        width: 3em;
        height: 3em;
    }

    .corner a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .corner img {
        width: 2em;
        height: 2em;
        object-fit: contain;
    }

    nav {
        display: flex;
        justify-content: center;
        --background: rgba(255, 255, 255, 0.7);
    }

    /*svg {*/
    /*    width: 2em;*/
    /*    height: 3em;*/
    /*    display: block;*/
    /*}*/

    /*path {*/
    /*    fill: var(--background);*/
    /*}*/

    /*ul {*/
    /*    position: relative;*/
    /*    padding: 0;*/
    /*    margin: 0;*/
    /*    height: 3em;*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*    align-items: center;*/
    /*    list-style: none;*/
    /*    background: var(--background);*/
    /*    background-size: contain;*/
    /*}*/

    /*li {*/
    /*    position: relative;*/
    /*    height: 100%;*/
    /*}*/

    /*li[aria-current='page']::before {*/
    /*    --size: 6px;*/
    /*    content: '';*/
    /*    width: 0;*/
    /*    height: 0;*/
    /*    position: absolute;*/
    /*    top: 0;*/
    /*    left: calc(50% - var(--size));*/
    /*    border: var(--size) solid transparent;*/
    /*    border-top: var(--size) solid var(--color-theme-1);*/
    /*}*/

    /*nav a {*/
    /*    display: flex;*/
    /*    height: 100%;*/
    /*    align-items: center;*/
    /*    padding: 0 0.5rem;*/
    /*    color: var(--color-text);*/
    /*    font-weight: 700;*/
    /*    font-size: 0.8rem;*/
    /*    text-transform: uppercase;*/
    /*    letter-spacing: 0.1em;*/
    /*    text-decoration: none;*/
    /*    transition: color 0.2s linear;*/
    /*}*/

    /*a:hover {*/
    /*    color: var(--color-theme-1);*/
    /*}*/
</style>
