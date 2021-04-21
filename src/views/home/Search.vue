<template>
    <div class="app-container">
        <el-row :gutter="20" type="flex" justify="center" style="margin-top: 30px">
            <el-autocomplete
                style="width: 80%"
                prefix-icon="iconfont el-icon-third-search"
                v-model="keyword"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入关键字"
                @select="handleSelect"
                clearable>
            </el-autocomplete>
        </el-row>
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
                                  @click="beforeTo(item)">
                                <span>{{ item.name|ellipsis }}</span>
                            </span>
                            <el-divider direction="vertical"></el-divider>
                            <el-tag v-if="item.blogId!=null">博客</el-tag>
                            <el-tag type="danger" v-if="item.reportId!=null">报告</el-tag>
                        </div>
                        <div class="data">
                            <span>编辑于 </span>
                            {{ item.time }}
                            <el-divider direction="vertical"></el-divider>
                            <span>by </span>
                            <span class="userName" v-dompurify-html="item.userName" @click="toUserInfo(item.userId)"/>
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
            <el-col :span="6">
                <el-card>
                    热门博客
                    <div v-for="(blogHot,index) in this.blogHotList" :key="blogHot" class="text item">
                        <el-row style="margin: 15px auto;">
                            <el-col :span="2">
                                <span>{{ index + 1 }}</span>
                            </el-col>
                            <el-col :span="20">
                                <div class="name" @click="toBlog(blogHot.blogId)">{{ blogHot.name }}</div>
                                <el-col :span="16">
                                    <div class="userName" @click="toUserInfo(blogHot.userId)">{{ blogHot.userName }}
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <i class="iconfont el-icon-third-fire"></i>
                                    {{ blogHot.score }}
                                </el-col>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {listBlogHot} from '@/network/api/blog'
import {searchEsAll, searchHitEsAll, beforeSearch} from '@/network/api/es'

const defaultEsBlogQueryParam = {
    keyword: '',
    pageNum: 1,
    pageSize: 5,
    lastFlag: 0,
    hotFlag: 0
};

export default {
    name: "Search",
    data() {
        return {
            keyword: '',
            //默认记过tab
            activeTab: 'last',
            //查询全部
            esAllQueryParam: {
                keyword: '',
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
            this.beforeSearch();
            this.getList();
            this.getBlogHotList()
            loading.close()
        },
        beforeSearch() {
            beforeSearch().then(res => {
                if (res.code != 200) {
                    return this.$message.error("系统出bug了，请重新刷新页面");
                }
            })
        },
        //获取表单信息
        getList() {
            this.listLoading = true;
            const esAllQueryParam = {
                pageNum: this.esAllQueryParam.pageNum,
                pageSize: this.esAllQueryParam.pageSize,
                lastFlag: this.esAllQueryParam.lastFlag,
                hotFlag: this.esAllQueryParam.hotFlag,
            }
            if (this.keyword != '') {
                esAllQueryParam.keyword = this.keyword
            }
            searchEsAll(esAllQueryParam).then(res => {
                if (res.code != null && res.code != 200) {
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
                searchHitEsAll(queryString).then(res => {
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