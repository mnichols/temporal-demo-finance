<script lang='ts'>
    // export let isCompleted: Boolean | undefined
    export let label: string
    export let value: any
    // export let item: any | undefined
    export let state: number
    // dynamic computation of class color with tailwind is different
    // https://tailwindcss.com/docs/content-configuration#dynamic-class-names
    $: kolor = 'text-gray-500'
    if (state < 0) {
        kolor = 'text-red-500'
    }
    if (state > 0) {
        kolor = 'text-green-500'
    }

</script>
<div class='state-item flex items-center'>
    <svg class='w-4 h-4 fill-current {state === 0 ? "text-gray-500" : state < 0 ? "text-red-500" : "text-green-500"}'
         aria-hidden='true' viewBox='0 0 20 20'>
        <path xmlns='http://www.w3.org/2000/svg'
              d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z'/>
    </svg>
    <span class='label label-text font-extrabold'>{label}</span>
    {#if value}
        <span class='label label-text'>{value}</span>
    {/if}
</div>
