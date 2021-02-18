<template>
    <div class="app-container">
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="18">
                <el-card>
                    <el-tabs v-model="activeTab" @tab-click="handleClick">
                        <el-tab-pane label="最新" name="last"/>
                        <el-tab-pane label="最热" name="hot"/>
                    </el-tabs>
                    <div v-for="item in this.tableData" :key="item" class="text item">
                        <div style="margin: 20px 0px;">
                            <span class="title"
                                  @click="toBlog(item.blogId)">
                                <span v-dompurify-html="item.name"/>
                            </span>
                            <el-divider direction="vertical"></el-divider>
                            <span>
                                <span>作者：</span>
                                <span class="userName" v-dompurify-html="item.userName" @click="toUserInfo(item.userId)"/>
                            </span>
                        </div>
                        <div class="data">
                            {{ item.time }}

                            <span style="margin-left: 10px">
                            <i class="iconfont el-icon-third-eye"/>
                            {{ item.visitCounter }}
                            </span>
                            <span style="margin-left: 10px">
                                <i class="iconfont el-icon-third-like"/>
                                {{ item.clickCounter }}
                            </span>
                            <span style="margin-left: 10px">
                                <i class="iconfont el-icon-third-heart"/>
                                {{ item.storeCounter }}
                            </span>
                        </div>
                        <div class="divider"></div>
                    </div>
                    <div class="pagination-container" style="float: right; margin-bottom: 15px">
                        <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="esBlogQueryParam.pageNum"
                                :page-sizes="[5,10,15]"
                                :page-size="esBlogQueryParam.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total"
                                :hide-on-single-page="isHide">
                        </el-pagination>
                    </div>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {searchEsBlog} from '@/network/api/blog'

    const defaultEsBlogQueryParam = {
        keyword: '',
        pageNum: 1,
        pageSize: 5,
        lastFlag: 0,
        hotFlag: 0
    };

    export default {
        name: "Blog",
        data() {
            return {
                //默认记过tab
                activeTab: 'last',
                //查询全部
                esBlogQueryParam: {
                    keyword: '',
                    pageNum: 1,
                    pageSize: 5,
                    lastFlag: 0,
                    hotFlag: 0
                },
                //表单信息
                tableData: [],
                //表单总数
                total: null,
                //是否正在加载
                listLoading: false,
                //是否分页隐藏
                isHide: true,
                userExt: {}
            }
        },
        created() {
            this.init();
        },
        methods: {
            //初始化方法
            init() {
                this.getList()
            },
            //获取表单信息
            getList() {
                this.listLoading = true;
                this.esBlogQueryParam.keyword = this.$route.query.keyword
                searchEsBlog(this.esBlogQueryParam).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.esBlogQueryParam.pageNum = res.data.pageNum;
                    this.esBlogQueryParam.pageSize = res.data.pageSize;
                    if (this.total > this.esBlogQueryParam.pageSize) {
                        this.isHide = false;
                    } else {
                        this.isHide = true;
                    }
                    this.listLoading = false;
                })
            },
            toBlog(blogId) {
                this.$router.push({
                    name: 'blogInfo',
                    query: {blogId}
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.esBlogQueryParam.pageNum = 1;
                this.esBlogQueryParam.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.esBlogQueryParam.pageNum = val;
                this.getList();
            },
            //切换tab
            handleClick(tab) {
                this.esBlogQueryParam = Object.assign({}, defaultEsBlogQueryParam);
                if (tab.name == 'last') {
                    this.esBlogQueryParam.lastFlag = 1
                    this.esBlogQueryParam.hotFlag = 0
                }
                if (tab.name == 'hot') {
                    this.esBlogQueryParam.lastFlag = 0
                    this.esBlogQueryParam.hotFlag = 1
                }
                this.getList();
            },
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId}})
            },
        }
    }
</script>

<style scoped>
    .data {
        color: #909399;
    }

    .title:hover {
        color: #409eff;
        font-size: 16px;
    }

    .userName:hover {
        color: #409eff;
        font-size: 16px;
    }
</style>