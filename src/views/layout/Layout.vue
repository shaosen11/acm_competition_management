<template>
    <div class="app-wrapper">
        <div class="main-container">
            <navbar class="nav"></navbar>
            <app-main class="app-main"></app-main>
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
        min-width: 1500px;
        height: 100%;
        width: 100%;
        top:0;
        left:0;
    }

    .nav{
        width:100%;
        position:fixed;
        top:0;
        left:0;
        z-index: 2000;
    }

    .app-main{
        margin-top: 80px;
    }
</style>