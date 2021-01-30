<template>
    <el-col :span="20">
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8" v-for="(user, index) in this.users" :key="index">
                <user-info :user="user"/>
            </el-col>
        </el-row>
    </el-col>

</template>

<script>
import UserInfo from "@/component/UserInfo";

export default {
    name: "TeamInfo",
    components: {UserInfo},
    props: {
        users: {
            type: Array
        }
    }
}
</script>

<style scoped>
</style>