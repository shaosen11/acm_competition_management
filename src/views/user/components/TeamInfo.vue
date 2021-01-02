<template>
    <el-col :span="20">
        <el-form-item label="队伍名称">
            <el-link
                type="primary"
                :underline="false"
                @click="toTeamInfo(teamName)">{{ teamName }}
            </el-link>
        </el-form-item>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8" v-for="(user, index) in this.users" :key="index">
                <el-row :gutter="20" type="flex" justify="center">
                    <el-col :span="8">
                        <el-avatar :size="60"
                                   :src="user.icon"/>
                    </el-col>
                    <el-col :span="16">
                        <div class="bottom clearfix">
                            <el-button
                                type="text"
                                class="button"
                                @click="toUserInfo(user.userId)">{{ user.name }}
                            </el-button>
                        </div>
                        <span>{{ user.userId }}</span>
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
    created() {
        this.getTeamAllInfoByUserId(this.userId);
    },
    methods: {
        getTeamAllInfoByUserId(userId) {
            getTeamAllInfoByUserId(userId).then(res => {
                if (res.code != 200) {
                    this.dialogUpdateFormVisible = false;
                    return this.$message.error(res.message);
                }
                if (res.data.team != null) {
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
            this.$router.push({name: 'teamInfo', query: {teamName: teamName}})
        }
    }
}
</script>

<style scoped>

</style>