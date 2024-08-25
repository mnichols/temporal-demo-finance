<script>
    import HolyGrail from "$lib/components/layouts/HolyGrail.svelte";
</script>

<HolyGrail>
    <div slot='header' class='bg-yellow-200 w-full h-full text-center flex items-center align-middle'>
        <h1 class='bg-orange-300 w-full'>THIS IS A HEADER</h1>
    </div>
    <div slot='left-col' class='w-full h-full'>
        <nav class='flex flex-col w-full h-full bg-blue-300'>
            <ul class='flex flex-col w-full h-full'>
                <li>Link 1</li>
                <li>Link 2</li>
            </ul>
        </nav>
    </div>
    <div slot='right-col' class='w-full h-full bg-green-300'>
        <ul class='flex flex-col w-full h-full'>
            <li>Link 1</li>
            <li>Link 2</li>
        </ul>
    </div>

    <div slot='main' class='w-full h-full bg-gray-300'>
        <slot/>
    </div>
    <div slot='footer' class='w-full h-full bg-gray-900 text-white'>
        <ul class='flex flex-col w-full h-full'>
            <li>Link 1</li>
            <li>Link 2</li>
        </ul>
    </div>
</HolyGrail>
