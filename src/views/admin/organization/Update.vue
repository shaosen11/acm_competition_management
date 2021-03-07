<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toOrganizationList" content="修改班级信息">
                </el-page-header>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                            v-loading="isLoading"
                            :rules="rules"
                            :model="organization"
                            label-width="100px">
                        <el-form-item label="选择学院">
                            <el-select
                                    v-model="organization.collegeId"
                                    placeholder="请选择">
                                <el-option
                                        v-for="item in this.collegeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="organization.collegeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择年级">
                            <el-select
                                    v-model="organization.year"
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="请选择或输入">
                                <el-option
                                        v-for="item in this.yearOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.year">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="唯一标识" prop="organizationId">
                            <el-input
                                    v-model="organization.organizationId"
                                    placeholder="唯一标识，推荐使用学号前n-2位"
                                    autocomplete="off"
                                    :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="班级名称">
                            <el-input
                                    v-model="organization.name"
                                    placeholder="班级名称，推荐使用全称"
                                    autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                    type="primary"
                                    @click="update"
                                    :loading="this.buttonLoading"
                                    round>修改
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {collegeList, getByOrganizationId, getOrganizationYearList, updateOrganization} from "@/network/api/organization"

    export default {
        name: "Update",
        data() {
            return {
                organization: {
                    collegeId: '',
                    organizationId: '',
                    year: '',
                    name: '',
                },
                isLoading: false,
                buttonLoading: false,
                collegeOptions: [],
                yearOptions: [],
                rules: {
                    name: [
                        {required: true, message: '请输入班级名称', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
            this.init()
            this.getByOrganizationId(this.$route.query.organizationId)
        },
        methods: {
            init() {
                const loading = this.$loading({
                    lock: true,
                    text: '正在加载',
                });
                this.getCollegeList();
                this.getYearList();
                this.tipNotify()
                loading.close();
            },
            tipNotify() {
                this.$notify({
                    title: '提示',
                    message: '1、不存在年级可直接输入年级即可\n 2、创建完成之后去班级列表核对信息是否正确再开放申请',
                    type: 'warning'
                });
            },
            //获取班级信息
            getByOrganizationId(organizationId) {
                getByOrganizationId(organizationId).then(res => {
                    if (res.code !== 200) {
                        return this.$message.error(res.message);
                    }
                    this.organization = res.data
                })
            },
            update() {
                this.buttonLoading = true;
                const organization = {
                    collegeId: this.organization.collegeId,
                    organizationId: this.organization.organizationId,
                    year: this.organization.year,
                    name: this.organization.name,
                    userId: this.$store.state.user.userId,
                    userName: this.$store.state.user.name
                }
                updateOrganization(organization).then(res => {
                    if (res.code !== 200) {
                        this.buttonLoading = false;
                        return this.$message.error(res.message);
                    }
                    this.$message.success(res.message);
                    this.buttonLoading = false;
                })
            },
            //获取学院信息
            getCollegeList() {
                collegeList().then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                        return false;
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.collegeOptions.push({value: res.data[i].collegeId, label: res.data[i].name})
                    }
                })
            },
            //获取年级信息
            getYearList() {
                getOrganizationYearList().then(res => {
                    if (res.code !== 200) {
                        this.$message.error(res.message);
                        return false;
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        this.yearOptions.push({value: res.data[i].year, label: res.data[i].year})
                    }
                })
            },
            toOrganizationList() {
                this.$router.push("/admin/organizationList")
            },
        }
    }
</script>

<style scoped>
    .box-card {
        width: 1000px;
        margin: auto;
    }
</style>