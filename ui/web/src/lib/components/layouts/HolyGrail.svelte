<div class='grid grid-rows-6 grid-cols-12 gap-2 h-screen'>
    <header class='row-auto col-span-12'>
        <slot name='header'/>
    </header>

    <nav class='col-span-2 row-span-4'>
        <slot name='left-col'/>
        <!-- Navigation -->
    </nav>

    <main class='col-span-7 row-span-4'>
        <!-- Main content -->
        <slot name='main'/>
    </main>

    <aside class='col-span-3 row-span-4'>
        <slot name='right-col'/>
        <!-- Sidebar / Ads -->
    </aside>

    <footer class='row-auto col-span-12'>
        <slot name='footer'/>
        <!-- Footer content -->
    </footer>
</div>