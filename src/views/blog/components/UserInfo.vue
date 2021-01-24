<template>
    <div>
        <el-card>
            <el-row :gutter="20" type="flex" justify="center">
                <el-col :span="8">
                    <el-avatar :size="60"
                               :src="this.user.icon"/>
                </el-col>
                <el-col :span="16">
                    <div class="bottom clearfix">
                        <el-button
                            type="text"
                            class="button"
                            @click="toUserInfo()">
                            {{ this.user.name }}
                        </el-button>
                    </div>
                    <span>{{ this.user.userId }}</span>
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
            <el-divider></el-divider>
            <el-row :gutter="20" type="flex" justify="center">
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
    name: "UserInfo",
    props: {
        userId: '',
        user: {},
        userExt: {}
    },
    methods: {
        toUserInfo() {
            this.$router.push({name: 'userInfo', query: {userId:this.userId}});
        },
    }
}
</script>

<style scoped>

</style>