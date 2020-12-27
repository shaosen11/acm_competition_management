<template>
    <el-col :span="20">
        <el-form-item label="队伍名称">
            <el-link type="primary" :underline="false" @click="toTeamInfo(teamName)">{{teamName}}</el-link>
        </el-form-item>
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
                                <el-button type="text" class="button" @click="toUserInfo(item.userId)">{{item.name}}
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

    export default {
        name: "TeamInfo",
        props: {
            userId: {
                type: String
            },
            teamUserAllInfo: {
                type: Object
            }
        },
        data() {
            return {
                teamName: '',
                users: ''
            }
        },
        computed: {},
        created() {
            this.getTeamAllInfoByUserId(this.$route.query.userId);
        },
        mounted() {
        },
        methods: {
            getTeamAllInfoByUserId(userId) {
                getTeamAllInfoByUserId(userId).then(res => {
                    if (res.code != 200) {
                        this.dialogUpdateFormVisible = false;
                        return this.$message.success(res.message);
                    }
                    if (res.data.team != null){
                        const team = res.data.team;
                        this.teamName = team.name;
                        this.users = res.data.users;
                    }
                })
            },
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId: userId}});
            },
            toTeamInfo(teamName) {
                this.$router.push({name: 'team', query: {teamName: teamName}})
            }
        },
        filter: {},
        watch: {}
    }
</script>

<style scoped>

</style>