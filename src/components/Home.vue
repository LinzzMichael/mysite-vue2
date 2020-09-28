<template>
        <el-container>
            <el-header style="padding: 0; position: fixed; top:0; z-index: 999999; width: 100%; border-bottom:none;">
                <nav-menu></nav-menu>
            </el-header>

            <router-view/>

        </el-container>



</template>

<script>
    import NavMenu from "@/components/common/NavMenu";
    export default {
        name: "Home",
        components: {NavMenu}
    }
</script>

<style scoped>

</style>