<template>
    <div class="main-container">
        <section class="app-main">
            <transition name="el-fade-in-linear" mode="out-in">
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
    .main-container {
        width: 100%;
        margin: 0px auto;
    }
</style>