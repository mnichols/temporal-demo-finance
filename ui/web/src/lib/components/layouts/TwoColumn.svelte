<div class="grid grid-cols-5 h-screen w-screen">
    <div class="bg-slate-200">
        <slot name='left-col'/>
    </div>
    <div class="bg-teal-200 col-span-4">
        <slot name='main'/>
    </div>
</div>
<!--<div class='container mx-auto h-full w-full'>-->
<!--    <div class='flex flex-row flex-wrap py-4'>-->
<!--        <aside class='w-full sm:w-1/3 md:w-1/4 px-2'>-->
<!--            <div class='sticky top-0 p-4 w-full'>-->
<!--                <slot name='left-col'/>-->
<!--                &lt;!&ndash; navigation &ndash;&gt;-->
<!--                &lt;!&ndash;                <ul class='flex flex-col overflow-hidden'>&ndash;&gt;-->
<!--                &lt;!&ndash;                    ...&ndash;&gt;-->
<!--                &lt;!&ndash;                </ul>&ndash;&gt;-->
<!--            </div>-->
<!--        </aside>-->
<!--        <main role='main' class='w-full sm:w-2/3 md:w-3/4 pt-1 px-2'>-->
<!--            <slot name='main'/>-->
<!--            &lt;!&ndash; content area &ndash;&gt;-->
<!--        </main>-->
<!--    </div>-->
<!--</div>-->
<!--<footer class='footer footer-center p-4 bg-base-300 text-base-content'>-->
<!--    <slot name='footer'/>-->
<!--</footer>-->