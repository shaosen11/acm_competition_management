<template>
    <div>
        <!--        <el-card>-->
        <!--            <div slot="header" class="clearfix">-->
        <!--                <span>收藏夹</span>-->
        <!--                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        <!--            </div>-->
        <!--            <el-tabs tab-position="left" style="height: 200px;">-->
        <!--                <el-tab-pane :label="userStoreFolder.name" v-for="userStoreFolder in this.userStoreFolder"-->
        <!--                             :key="userStoreFolder">-->
        <!--                    <h3>{{ userStoreFolder.name }}</h3>-->
        <!--                    <h3>{{ userStoreFolder.description }}</h3>-->
        <!--                    <el-divider></el-divider>-->
        <!--                </el-tab-pane>-->
        <!--                <el-tab-pane label="用户管理">用户管理</el-tab-pane>-->
        <!--                <el-tab-pane label="配置管理">配置管理</el-tab-pane>-->
        <!--                <el-tab-pane label="角色管理">角色管理</el-tab-pane>-->
        <!--                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>-->
        <!--            </el-tabs>-->
        <!--        </el-card>-->

        <el-row>
            <el-col :span="4">
                <el-menu class="el-menu-vertical-demo" style="text-align: center">
                    <el-menu-item index="1" @click="createStoreDialogVisibleTure">
                        <i class="iconfont el-icon-third-folder-add" style="font-size: 20px; margin-right: 5px"></i>
                        <span slot="title">新建文件夹</span>
                    </el-menu-item>
                    <el-menu-item v-for="(userStoreFolder, index) in this.userStoreFolder" :key="userStoreFolder"
                                  :index="index">
                        <i class="iconfont el-icon-third-folder-open"
                           style="font-size: 20px; margin-right: 5px"></i>
                        <span slot="title">{{ userStoreFolder.name }}</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <el-card style="width: 1000px">
                    <p class="name">默认文件夹</p>
                    <p class="description">这是默认文件夹</p>
                </el-card>
            </el-col>
        </el-row>

        <CreateStore :create-store-dialog-visible="this.createStoreDialogVisible"
                     @createStoreDialogVisibleFalse="createStoreDialogVisibleFalse"
                     @createStore="createStore"/>
    </div>
</template>

<script>
import CreateStore from "@/views/user/components/CreateStore";
import {getUserStoreFolder, createUserStore} from "@/network/api/user"

export default {
    name: "Store",
    components: {
        CreateStore
    },
    data() {
        return {
            createStoreDialogVisible: false,
            userStoreFolder: []
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.getUserStoreFolder()
        },
        //获取收藏夹
        getUserStoreFolder() {
            const userStore = {
                userId: this.$store.state.user.userId,
                folderFlag: 0,
            }
            getUserStoreFolder(userStore).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.userStoreFolder = res.data
            })
        },
        createStoreDialogVisibleTure() {
            this.createStoreDialogVisible = true;
        },
        createStoreDialogVisibleFalse() {
            this.createStoreDialogVisible = false;
        },
        createStore(userStore) {
            createUserStore(userStore).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.getUserStoreFolder()
                this.createStoreDialogVisible = false;
            })

        },
    }
}
</script>

<style scoped>
.name {
    margin: 10px 0px
}

.description {
    margin: 5px 0px;
    color: #909399;
}
</style>