<template>
    <el-col :span="20">
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8" v-for="item in this.users">
                <el-row :gutter="20" type="flex" justify="center">
                    <el-col :span="8">
                        <el-avatar :size="60"
                                   :src="item.icon"/>
                    </el-col>
                    <el-col :span="16">
                        <div>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="toUserInfo(item.userId)">{{item.userName}}
                                </el-button>
                            </div>
                            <span>{{item.userId}}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-col>

</template>

<script>
    import {getTeamAllInfoByUserId} from "@/network/api/team";
    import store from '@/store'

    export default {
        name: "TeamInfo",
        props: {
            users: {
                type: Array
            }
        },
        data() {
            return {}
        },
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId: userId}});
            }
        },
        filter: {},
        watch: {}
    }
</script>

<style scoped>

</style>