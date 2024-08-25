<script>
    import HolyGrail from "$lib/components/layouts/HolyGrail.svelte";
</script>

<HolyGrail>
    <div slot='header'>
        <header class='bg-neutral text-center text-neutral-content '>
            <h1>Diagnostics Page</h1>
        </header>
    </div>
    <div slot='left-col'></div>

    <div slot='main'>
        <slot/>
    </div>
    <div slot='footer'>
    </div>
</HolyGrail>
