<template>
    <div class="app-container">
        <el-row :gutter="20" type="flex" justify="center" style="margin-top: 30px">
            <el-autocomplete
                    style="width: 80%"
                    prefix-icon="iconfont el-icon-third-search"
                    v-model="keyword"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    clearable>
            </el-autocomplete>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center" style="margin-top: 30px" >
            <el-col :span="20">
                <el-card>
                    <el-tabs v-model="activeTab" @tab-click="handleClick">
                        <el-tab-pane label="最新" name="last"/>
                        <el-tab-pane label="最热" name="hot"/>
                    </el-tabs>
                    <div v-for="item in this.tableData" :key="item" class="text item">
                        <div style="margin: 20px 0px;">
                            <span class="title"
                                  @click="beforeTo(item)">
                                <span v-dompurify-html="item.name"/>
                            </span>
                            <el-divider direction="vertical"></el-divider>
                            <span class="userName" v-dompurify-html="item.userName" @click="toUserInfo(item.userId)"/>
                            <p class="content markdown-body" v-dompurify-html="item.subContent"></p>
                        </div>
                        <div class="data">
                            {{ item.time }}
                            <el-divider direction="vertical"></el-divider>
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
                        <el-divider/>
                    </div>
                    <div class="pagination-container" style="float: right; margin-bottom: 15px">
                        <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="esAllQueryParam.pageNum"
                                :page-sizes="[5,10,15]"
                                :page-size="esAllQueryParam.pageSize"
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
    import {listBlogHot} from '@/network/api/blog'
    import {searchEsReport, searchHitEsReport} from "../../network/api/es";

    const defaultEsBlogQueryParam = {
        keyword: '',
        pageNum: 1,
        pageSize: 5,
        lastFlag: 0,
        hotFlag: 0
    };

    export default {
        name: "CompetitionProblemTypeSearch",
        data() {
            return {
                keyword: '',
                //默认记过tab
                activeTab: 'last',
                //查询全部
                esAllQueryParam: {
                    keyword: '',
                    problemTypeName: '',
                    pageNum: 1,
                    pageSize: 5,
                    lastFlag: 1,
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
                blogHotList: []
            }
        },
        created() {
            this.init();
        },
        methods: {
            //初始化方法
            init() {
                const loading = this.$loading({
                    lock: true,
                    text: '正在加载',
                });
                this.getList()
                this.getBlogHotList()
                loading.close()
            },
            //获取表单信息
            getList() {
                this.listLoading = true;
                const esAllQueryParam = {
                    problemTypeName: this.$route.query.problemTypeName,
                    pageNum: this.esAllQueryParam.pageNum,
                    pageSize: this.esAllQueryParam.pageSize,
                    lastFlag: this.esAllQueryParam.lastFlag,
                    hotFlag: this.esAllQueryParam.hotFlag,
                }
                if (this.keyword != '') {
                    esAllQueryParam.keyword = this.keyword
                }
                searchEsReport(esAllQueryParam).then(res => {
                    if (res.code !== 200) {
                        this.listLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    this.esAllQueryParam.pageNum = res.data.pageNum;
                    this.esAllQueryParam.pageSize = res.data.pageSize;
                    if (this.total > this.esAllQueryParam.pageSize) {
                        this.isHide = false;
                    } else {
                        this.isHide = true;
                    }
                    this.listLoading = false;
                })
            },
            getBlogHotList() {
                listBlogHot().then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.blogHotList = res.data
                })
            },
            //处理页面大小变化
            handleSizeChange(val) {
                this.esAllQueryParam.pageNum = 1;
                this.esAllQueryParam.pageSize = val;
                this.getList();
            },
            //处理当前页面数量变化
            handleCurrentChange(val) {
                this.esAllQueryParam.pageNum = val;
                this.getList();
            },
            //切换tab
            handleClick(tab) {
                this.esAllQueryParam = Object.assign({}, defaultEsBlogQueryParam);
                if (tab.name == 'last') {
                    this.esAllQueryParam.lastFlag = 1
                    this.esAllQueryParam.hotFlag = 0
                }
                if (tab.name == 'hot') {
                    this.esAllQueryParam.lastFlag = 0
                    this.esAllQueryParam.hotFlag = 1
                }
                this.getList();
            },
            toUserInfo(userId) {
                this.$router.push({name: 'userInfo', query: {userId}})
            },
            querySearchAsync(queryString, cb) {
                if (queryString != "") {
                    const esAllQueryParam = {
                        keyword: queryString,
                        problemTypeName: this.$route.query.problemTypeName,
                    }
                    searchHitEsReport(esAllQueryParam).then(res => {
                        if (res.code != 200) {
                            return this.$message.error(res.message);
                        }
                        this.blogList = res.data
                        const results = queryString ? this.blogList : [];
                        cb(results);
                        this.getList()
                    })
                }
            },
            handleSelect(item) {
                this.beforeTo(item)
            },
            beforeTo(item) {
                if (item.blogId != null) {
                    this.toBlog(item.blogId)
                } else if (item.reportId != null) {
                    this.toReport(item.reportId)
                }
            },
            toReport(reportId) {
                this.$router.push({
                    name: 'reportInfo',
                    query: {reportId}
                })
            },
            toBlog(blogId) {
                this.$router.push({
                    name: 'blogInfo',
                    query: {blogId}
                })
            },
        }
    }
</script>

<style scoped>
    .data {
        color: #909399;
    }

    .title {
        font-size: 24px;
    }

    .title:hover {
        color: #409eff;
    }

    .userName {
        font-size: 16px;
    }

    .userName:hover {
        color: #409eff;
    }

    .content {
        color: #909399;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .name {
        font-size: 16px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .name:hover {
        color: #409EFF;
    }
</style>