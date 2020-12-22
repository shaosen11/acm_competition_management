<template>
    <div class="app-wrapper">
        <div class="main-container">
            <navbar></navbar>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    import AppMain from "./components/AppMain";

    export default {
        name: "Layout",
        components:{
            Navbar,
            AppMain
        }
    }
</script>

<style scoped>
    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>