<template>
    <div>
        <el-row :gutter="10" type="flex" justify="center">
            <!--个人信息-->
            <el-col :span="16">
                <!--队伍信息-->
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>队伍信息</span>
                        <el-button
                            style="float: right; padding: 3px 0"
                            v-if="this.teamUserFlag"
                            @click="toSetting"
                            type="text">
                            设置
                        </el-button>
                    </div>

                    <el-form ref="form"
                             :model="team"
                             label-width="80px"
                             v-loading="isLoading"
                             element-loading-text="努力加载中...">
                        <!--个人信息-->
                        <el-row :gutter="10" type="flex" justify="center">
                            <el-col :span="20">
                                <el-form-item label="名称">
                                    <span>{{ this.team.name }}</span>
                                </el-form-item>
                                <el-form-item label="队长">
                                    <span>{{ this.team.userName }}</span>
                                </el-form-item>
                                <el-form-item label="座右铭">
                                    <span>{{ this.team.motto }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        <!--队伍信息-->
                        <el-row type="flex" justify="center">
                            <el-col :span="20">
                                <el-divider>队员信息</el-divider>
                            </el-col>
                        </el-row>
                        <el-row type="flex" justify="center">
                            <team-info ref="teamInfo" :users="this.users"/>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TeamInfo from "@/views/team/components/TeamInfo";
import {getTeamAllInfoByTeamName} from "@/network/api/team";

export default {
    name: "Info",
    components: {
        TeamInfo,
    },
    data() {
        return {
            // 是否正在加载
            isLoading: false,
            // 是否队长，修改标记
            updateFlag: false,
            // 是否队员，退出标记
            teamUserFlag: false,
            //队伍信息
            team: {},
            //用户信息
            users: [],
        }
    },
    created() {
        //初始化
        this.init()
    },
    methods: {
        //初始化方法
        init() {
            this.isLoading = true;
            getTeamAllInfoByTeamName(this.$route.query.teamName).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.team = res.data.team;
                this.users = res.data.users;
                //判断是否队长
                if (this.team.userId == this.$store.state.user.userId) {
                    this.updateFlag = true;
                }
                //判断是否队员
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].userId == this.$store.state.user.userId) {
                        this.teamUserFlag = true;
                    }
                }
                this.isLoading = false;
            })
        },
        //跳转申请列表
        toSetting() {
            this.$router.push('/team/setting');
        },
    },
}
</script>

<style scoped>

</style>