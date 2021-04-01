<template>
    <div>
        <el-card>
            <el-row :gutter="10" type="flex" justify="center">
                <el-col :span="8" style="text-align: center">
                    <div style="text-align: center; margin: 5px auto">
                        <el-avatar :size="50"
                                   :src="this.userExt.icon"/>
                    </div>
                </el-col>
                <el-col :span="9">
                    <div class="bottom clearfix">
                        <el-button
                            type="text"
                            class="button"
                            @click="toUserInfo()"
                            style="font-size: 16px">
                            {{ this.userExt.userName }}
                        </el-button>
                    </div>
                    <span>{{ this.userExt.userId }}</span>
                </el-col>
                <el-col :span="7">
                    <div style="text-align: center; margin: 15px auto" v-if="this.followShowFlag">
                        <el-button
                            v-if="this.followFlag"
                            type="primary"
                            size="mini"
                            @mouseenter.native="enter"
                            @mouseleave.native="leave"
                            plain>
                            <span v-if="this.mouseFlag" @click="cancelFollow">取消关注</span>
                            <span v-else>已关注</span>
                        </el-button>
                        <el-button
                            v-else
                            type="primary"
                            size="mini"
                            @click="follow"
                            plain>
                            关注
                        </el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" type="flex" justify="center" style="margin-top: 20px">
                <el-col :span="12" style="text-align:center;">
                    <i class="iconfont el-icon-third-file-text"></i>
                    {{ this.userExt.reportCounter }}
                </el-col>
                <el-col :span="12" style="text-align:center;">
                    <i class="iconfont el-icon-third-blog"></i>
                    {{ this.userExt.blogCounter }}
                </el-col>
            </el-row>
            <el-divider/>
            <el-row :gutter="5" type="flex" justify="center" class="statistic">
                <el-col :span="6">
                    <i class="iconfont el-icon-third-follow"/>
                    {{ this.userExt.followCounter }}
                </el-col>
                <el-col :span="6">
                    <i class="iconfont el-icon-third-eye"/>
                    {{ this.userExt.visitCounter }}
                </el-col>
                <el-col :span="6">
                    <i class="iconfont el-icon-third-like"/>
                    {{ this.userExt.clickCounter }}
                </el-col>
                <el-col :span="6">
                    <i class="iconfont el-icon-third-heart"/>
                    {{ this.userExt.storeCounter }}
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>

export default {
    name: "UserStatisticsInfo",
    props: {
        userExt: {},
        followFlag: {},
        followShowFlag: {}
    },
    data() {
        return {
            mouseFlag: false
        }
    },
    methods: {
        toUserInfo() {
            this.$router.push({name: 'userInfo', query: {userId: this.userExt.userId}});
        },
        follow() {
            if (this.userExt.userId == this.$store.state.user.userId){
                return this.$message.info("自己不可以关注自己哦");
            }
            const userFollow = {
                followUserId: this.userExt.userId,
                userId: this.$store.state.user.userId,
            }
            this.$emit('follow', userFollow)
        },
        cancelFollow(){
            const userFollow = {
                followUserId: this.userExt.userId,
                userId: this.$store.state.user.userId,
            }
            this.$emit('cancelFollow', userFollow);
        },
        enter() {
            if (this.followFlag) {
                this.mouseFlag = true;
            }
        },
        leave(){
            this.mouseFlag = false;
        }
    }
};
</script>

<style scoped>
.statistic {
    font-size: 14px;
}
</style>