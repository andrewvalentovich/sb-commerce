<script>
</script>
<template>
    <admin.header/>
    <div class="admin-wrapper">
        <admin.sidebar/>
        <div id="main-content" class="relative h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
            <slot/>
        </div>
    </div>
</template>
