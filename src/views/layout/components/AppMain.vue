<template>
    <div class="app-container">
        <section class="app-main">
            <transition name="fade" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </section>
    </div>

</template>

<script>
    export default {
        name: 'AppMain',
        computed: {}
    }
</script>

<style scoped>
    .app-container {
        width: 80%;
        margin: 30px auto;
    }
</style>