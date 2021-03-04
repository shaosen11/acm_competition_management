<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-page-header @back="toOrganizationList" content="创建班级">
                </el-page-header>
            </div>
            <el-row :gutter="10">
                <el-col :span="10">
                    <el-form
                        ref="createOrganizationForm"
                        v-loading="isLoading"
                        :rules="rules"
                        :model="form"
                        label-width="100px">
                        <el-form-item label="选择学院">
                            <el-select
                                v-model="form.collegeId"
                                placeholder="请选择">
                                <el-option
                                    v-for="item in this.collegeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择年级">
                            <el-select
                                v-model="form.year"
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请选择或输入">
                                <el-option
                                    v-for="item in this.yearOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="唯一标识" prop="organizationId">
                            <el-input
                                v-model="form.organizationId"
                                placeholder="唯一标识，推荐使用学号前n-2位"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="班级名称">
                            <el-input
                                v-model="form.name"
                                placeholder="班级名称，推荐使用全称"
                                autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="create"
                                :loading="this.buttonLoading"
                                round>创建
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import {collegeList, getByOrganizationId, getOrganizationYearList, createOrganization} from "@/network/api/organization"

export default {
    name: "CreateOrganization",
    data() {
        var validateOrganizationId = (rule, value, callback) => {
            this.validateOrganizationId(this.form.organizationId).then(res => {
                if (res) {
                    callback(new Error('唯一标识已存在!'))
                } else {
                    callback()
                }
            })
        }
        return {
            form: {
                organizationId: '',
                year: '',
                name: '',
                collegeId: '',
                userId: this.$store.state.user.userId,
                userName: this.$store.state.user.name
            },
            isLoading: false,
            buttonLoading: false,
            collegeOptions: [],
            yearOptions: [],
            rules: {
                organizationId: [
                    {
                        required: true, validator: validateOrganizationId, trigger: 'blur'
                    }
                ],
                name: [
                    {required: true, message: '请输入班级名称', trigger: 'blur'},
                ],
            }
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.isLoading = true;
            this.getCollegeList();
            this.getYearList();
            this.isLoading = false;
            this.$notify({
                title: '提示',
                message: '1、不存在年级可直接输入年级即可\n 2、创建完成之后去班级列表核对信息是否正确再开放申请',
                type: 'info'
            });
        },
        //异步验证用户账号
        async validateOrganizationId(organizationId) {
            return await getByOrganizationId(organizationId).then(res => {
                if (res.code != 200) {
                    this.$message.error(res.message);
                    return false;
                }
                if (res.data != null) {
                    if (res.data.organizationId != null) {
                        return true;
                    }
                }
                return false
            })
        },
        create() {
            this.buttonLoading = true;
            this.$refs.createOrganizationForm.validate(async (valid) => {
                if (!valid) {
                    this.buttonLoading = false;
                    return false;
                }
                const res = await createOrganization(this.form);
                if (res.code != 200) {
                    this.$message.error(res.message);
                    this.buttonLoading = false;
                    return false
                }
                this.buttonLoading = false;
                await this.$router.push("/admin/organizationList")
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