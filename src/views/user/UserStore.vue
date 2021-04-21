<template>
    <div>
        <el-row>
            <el-col :span="4">
                <el-menu class="el-menu-vertical-demo" style="text-align: center">
                    <el-menu-item index="1" @click="createStoreDialogVisibleTure">
                        <i class="iconfont el-icon-third-folder-add" style="font-size: 20px; margin-right: 5px"></i>
                        <span slot="title">新建收藏夹</span>
                    </el-menu-item>
                    <el-menu-item v-for="(userStoreFolder, index) in this.userStoreFolder"
                                  :key="userStoreFolder"
                                  :index="index"
                                  @click="selectUserStoreFolder(index)">
                        <span slot="title">
                            <i class="iconfont el-icon-third-folder-open"
                               style="font-size: 20px; margin-right: 5px"/>
                             <span v-if="userStoreFolder.sort==0">
                                (默认)
                            </span>
                            <span>
                                 {{ userStoreFolder.name|ellipsis }}
                            </span>
                        </span>
                    </el-menu-item>
                </el-menu>
            </el-col>

            <el-col :span="20">
                <el-card style="width: 800px">
                    <div>
                        <span class="name" v-if="this.userStoreFolderNameEditFlag == false">
                            <b>{{ this.userStoreFolderItem.name }}</b>
                            <i class="iconfont el-icon-third-edit icon"
                               @click="userStoreFolderNameEditFlagTrue"/>
                        </span>
                        <span v-else>
                            <el-input v-model="userStoreFolderNameCopy" style="width: 30%"
                                      placeholder="请输入收藏夹名称"></el-input>
                            <el-button icon="el-icon-close"
                                       size="small"
                                       style="margin-left: 15px"
                                       @click="userStoreFolderNameEditFlagFalse"
                                       circle/>
                            <el-button type="primary"
                                       icon="el-icon-check"
                                       size="small"
                                       @click="updateUserStoreFolderName"
                                       circle/>
                        </span>
                        <span style="float: right;">
                            <span>仅自己可见：
                                <el-switch
                                    @change="handleShowFlagStatusChange(userStoreFolderItem)"
                                    :active-value="1"
                                    :inactive-value="0"
                                    v-model="userStoreFolderItem.showFlag">
                                </el-switch>
                                <el-divider direction="vertical"></el-divider>
                                        <i class="iconfont el-icon-third-delete"
                                           style="font-size: 20px;"
                                           @click="deleteStore(userStoreFolderItem)"/>
                            </span>
                        </span>
                    </div>
                    <p class="description" v-if="this.userStoreFolderDescriptionEditFlag == false">
                        {{ this.userStoreFolderItem.description }}
                        <i class="iconfont el-icon-third-edit icon"
                           @click="userStoreFolderDescriptionEditFlagTrue"/>
                    </p>
                    <p v-else>
                        <el-input v-model="userStoreFolderDescriptionCopy" style="width: 30%"
                                  placeholder="请输入收藏夹描述"></el-input>
                        <el-button icon="el-icon-close"
                                   size="small"
                                   style="margin-left: 15px"
                                   @click="userStoreFolderDescriptionEditFlagFalse"
                                   circle/>
                        <el-button type="primary"
                                   icon="el-icon-check"
                                   size="small"
                                   @click="updateUserStoreFolderDescription"
                                   circle/>
                    </p>
                    <!--收藏夹内容-->
                    <el-row :gutter="10">
                        <el-col :span="24" v-if="this.userStore==''">
                            <el-card shadow="hover" style="margin-top: 10px">
                                收藏夹为空
                            </el-card>
                        </el-col>
                        <el-col v-el
                                :span="24"
                                style="margin-top: 10px"
                                v-for="userStore in this.userStore"
                                :key="userStore">
                            <el-card shadow="hover">
                                <div>
                                    <span v-if="userStore.blogFlag == 1">
                                        <el-tag>博客</el-tag>
                                        <span class="userStoreName"
                                              @click="toBlog(userStore.blogId)">{{
                                                userStore.blogName|ellipsisBlogName
                                            }}</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <span>by </span>
                                        <span class="userName" v-dompurify-html="userStore.userName"/>
                                    </span>
                                    <span v-if="userStore.reportFlag == 1">
                                        <el-tag type="danger">报告</el-tag>
                                        <span class="userStoreName"
                                              @click="toReport(userStore.reportId)">{{
                                                userStore.reportName|ellipsisBlogName
                                            }}</span>
                                        <el-divider direction="vertical"></el-divider>
                                        <span>by </span>
                                        <span class="userName" v-dompurify-html="userStore.userName"/>
                                    </span>
                                    <span style="float: right;">
                                        <span v-if="userStore.status==0">
                                            （博客已被博主删除）
                                            <el-divider direction="vertical"></el-divider>
                                        </span>
                                        <span>仅自己可见：
                                            <el-switch
                                                @change="handleShowFlagStatusChange(userStore)"
                                                :active-value="1"
                                                :inactive-value="0"
                                                v-model="userStore.showFlag">
                                            </el-switch>
                                        </span>
                                        <el-divider direction="vertical"></el-divider>
                                        <i class="iconfont el-icon-third-heart"
                                           style="font-size: 20px; color: #F56C6C;"
                                           @click="cancelStore(userStore)"/>
                                    </span>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
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
import {
    getUserStoreFolder,
    createUserStore,
    listUserStoreByParentId,
    deleteUserStore,
    updateUserStore
} from "@/network/api/user"

export default {
    name: "Store",
    components: {
        CreateStore
    },
    data() {
        return {
            createStoreDialogVisible: false,
            userStoreFolder: [],
            userStoreFolderItem: {
                id: 0,
                showFlag: 0,
                sort: ''
            },
            userStoreFolderIndex: 0,
            oldUserStoreFolderIndex: '',
            userStoreFolderNameEditFlag: false,
            userStoreFolderNameCopy: '',
            userStoreFolderDescriptionEditFlag: false,
            userStoreFolderDescriptionCopy: '',
            userStore: [],
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const loading = this.$loading({
                lock: true,
                text: '正在加载',
            });
            this.getUserStoreFolder()
            loading.close()
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
                if (res.data != '') {
                    this.userStoreFolder = res.data;
                    this.userStoreFolderItem = this.userStoreFolder[this.userStoreFolderIndex];
                    this.selectUserStoreFolder(this.userStoreFolderIndex);
                }
            })
        },
        //选择收藏夹
        selectUserStoreFolder(index) {
            //关闭修改标签
            this.userStoreFolderNameEditFlagFalse();
            this.userStoreFolderDescriptionEditFlagFalse();
            if (index === this.oldUserStoreFolderIndex) {
                return;
            }
            this.userStore = [];
            this.userStoreFolderIndex = index;
            this.oldUserStoreFolderIndex = this.userStoreFolderIndex
            this.userStoreFolderItem = this.userStoreFolder[index];
            const userStore = {
                parentId: this.userStoreFolderItem.id,
            }
            listUserStoreByParentId(userStore).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.userStore = res.data
            })
        },
        //创建文件夹
        createStoreDialogVisibleTure() {
            if (this.$store.state.user.userId == '') {
                this.$message.error("请先登录");
                return false;
            }
            this.createStoreDialogVisible = true;
        },
        createStoreDialogVisibleFalse() {
            this.createStoreDialogVisible = false;
        },
        //创建收藏夹
        createStore(userStore) {
            createUserStore(userStore).then(res => {
                if (res.code !== 200) {
                    return this.$message.error(res.message);
                }
                this.getUserStoreFolder()
                this.createStoreDialogVisible = false;
            })
        },
        //跳转博客
        toBlog(blogId) {
            this.$router.push({
                name: 'blogInfo',
                query: {blogId}
            })
        },
        //跳转博客
        toReport(reportId) {
            this.$router.push({
                name: 'reportInfo',
                query: {reportId}
            })
        },
        //取消收藏
        cancelStore(userStore) {
            userStore.folderFlag = 1;
            deleteUserStore(userStore).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.selectUserStoreFolder(this.userStoreFolderIndex);
            })
        },
        //删除收藏夹
        deleteStore(userStoreFolder) {
            deleteUserStore(userStoreFolder).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.userStoreFolderIndex = 0
                this.getUserStoreFolder()
            })
        },
        //是否向大家展示收藏夹内容
        handleShowFlagStatusChange(userStore) {
            const userStoreBody = {
                id: userStore.id,
                showFlag: userStore.showFlag
            }
            updateUserStore(userStoreBody).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.selectUserStoreFolder(this.userStoreFolderIndex)
            })
        },
        //修改收藏夹名称
        userStoreFolderNameEditFlagTrue() {
            this.userStoreFolderNameCopy = this.userStoreFolderItem.name;
            this.userStoreFolderNameEditFlag = true
        },
        //修改收藏夹名称标记
        userStoreFolderNameEditFlagFalse() {
            this.userStoreFolderNameEditFlag = false
        },
        //修改收藏夹名称
        updateUserStoreFolderName() {
            const userStoreBody = {
                id: this.userStoreFolderItem.id,
                name: this.userStoreFolderNameCopy,
            }
            updateUserStore(userStoreBody).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.getUserStoreFolder()
                this.userStoreFolderNameEditFlagFalse()
            })
        },
        //修改收藏夹描述
        userStoreFolderDescriptionEditFlagTrue() {
            this.userStoreFolderDescriptionCopy = this.userStoreFolderItem.description
            this.userStoreFolderDescriptionEditFlag = true
        },
        //修改收藏夹描述标记
        userStoreFolderDescriptionEditFlagFalse() {
            this.userStoreFolderDescriptionEditFlag = false
        },
        //修改收藏夹描述
        updateUserStoreFolderDescription() {
            const userStoreBody = {
                id: this.userStoreFolderItem.id,
                description: this.userStoreFolderDescriptionCopy
            }
            updateUserStore(userStoreBody).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.getUserStoreFolder()
                this.userStoreFolderDescriptionEditFlagFalse()
            })
        },
    },
    filters: {
        ellipsis(value) {
            if (!value) return ''
            if (value.length > 5) {
                return value.slice(0, 5) + '...'
            }
            return value
        },
        ellipsisBlogName(value) {
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
.name {
    margin: 10px 0px;

    .icon {
        margin-left: 5px;
    }

    .icon:hover {
        color: #409EFF;
    }
}

.description {
    margin: 5px 0px;
    color: #909399;
}

.userStoreName {
    margin-left: 15px
}

.userStoreName:hover {
    color: #409EFF;
}

.folderName {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.folderDescription {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
</style>