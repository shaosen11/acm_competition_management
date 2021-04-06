<template>
    <div class="app-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>队伍</el-breadcrumb-item>
            <el-breadcrumb-item>我的队伍</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="10" type="flex" justify="center">
            <el-col :span="24">
                <h3>
                    <span>{{ this.team.name }}</span>
                    <span> ({{ this.team.englishName }})</span>
                    <div style="float: right; margin-left: 15px" v-if="this.teamUserFlag">
                        <el-button
                                style="float: right; padding: 3px 0"
                                v-if="this.teamUserFlag"
                                @click="toSetting"
                                type="text">
                            设置
                        </el-button>
                    </div>
                </h3>
                <p>队长：{{ this.team.userName }}</p>
                <p>队伍人数：{{ this.team.userCount }}</p>
                <el-divider/>
                <el-row :gutter="20" type="flex" justify="center">
                    <el-col :span="8" v-for="(user, index) in this.users" :key="index">
                        <el-card>
                            <div class="info">
                                <el-avatar
                                        :size="36"
                                        :src="user.icon"
                                        icon="el-icon-user-solid"/>
                                <div class="name" @click="toUserInfo(user.userId)">{{ user.userName }}</div>
                                <el-divider direction="vertical"></el-divider>
                                <span class="organization" @click="toOrganizationInfo(user)">
                                    {{ user.year + user.organizationName|ellipsis }}
                                </span>
                            </div>
                            <UserRadar
                                    :user-radar="userRadar[index]"
                                    ref="userRadar"/>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import TeamInfo from "@/component/TeamInfo";
    import UserInfo from "@/component/UserInfo";
    import UserRadar from "@/component/UserRadar";
    import {getTeamAllInfoByTeamName} from "@/network/api/team";

    export default {
        name: "Info",
        components: {
            TeamInfo,
            UserInfo,
            UserRadar
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
                radarSet: {
                    label: {
                        show: true,
                    },
                    labelMap: {
                        problemTypeOne: "数论",
                        problemTypeTwo: "字符串",
                        problemTypeThree: "图论",
                        problemTypeFour: "网络流",
                        problemTypeFive: "数据结构",
                        problemTypeSix: "计算几何",
                        problemTypeSeven: "STL",
                        problemTypeEight: "其他",
                    },
                    areaStyle: {
                        opacity: 0.6,
                    },
                },
                columns: [
                    "problemTypeOne",
                    "problemTypeTwo",
                    "problemTypeThree",
                    "problemTypeFour",
                    "problemTypeFive",
                    "problemTypeSix",
                    "problemTypeSeven",
                    "problemTypeEight",
                ],
                userRadar: [[],[],[]],
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
                        this.userRadar[i].push(this.users[i]);
                    }
                    this.isLoading = false;
                })
            },
            // getUserRadarByUserId(userId) {
            //     getUserRadarByUserId(userId).then(res => {
            //         if (res.code !== 200) {
            //             return this.$message.error(res.message);
            //         }
            //         this.userRadar.push({
            //             problemTypeOne: res.data.problemTypeOne,
            //             problemTypeTwo: res.data.problemTypeTwo,
            //             problemTypeThree: res.data.problemTypeThree,
            //             problemTypeFour: res.data.problemTypeFour,
            //             problemTypeFive: res.data.problemTypeFive,
            //             problemTypeSix: res.data.problemTypeSix,
            //             problemTypeSeven: res.data.problemTypeSeven,
            //             problemTypeEight: res.data.problemTypeEight,
            //         });
            //     })
            // },
            //跳转申请列表
            toSetting() {
                this.$router.push('/team/setting');
            },
            toUserInfo(userId) {
                if (userId != "") {
                    this.$router.push({name: 'userInfo', query: {userId: userId}});
                }
            },
            //跳转班级信息
            toOrganizationInfo(user) {
                this.$router.push({
                    name: 'organizationInfo',
                    query: {
                        year: user.year,
                        name: user.organizationName
                    }
                })
            },
        },
        filters: {
            ellipsis(value) {
                if (!value) return ''
                if (value.length > 15) {
                    return value.slice(0, 15) + '...'
                }
                return value
            },
        }
    }
</script>

<style scoped lang="scss">
    .info {
        display: flex;
        align-items: center;

        .name {
            margin-left: 15px;
            font-size: 16px;
            font-weight: 500;
        }

        .name:hover {
            color: #409EFF;
        }

        .organization {
            font-size: 16px;
        }

        .organization:hover {
            color: #409EFF;
        }
    }
</style>