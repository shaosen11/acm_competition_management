<template> 
    <div>
        <el-upload
                :action="minioUploadUrl"
                list-type="picture"
                :multiple="false" :show-file-list="showFileList"
                :file-list="fileList"
                :on-remove="handleRemove"
                :on-success="handleUploadSuccess"
                :on-preview="handlePreview">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB，请尽量选择正方形图片</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <el-row type="flex" class="row-bg" justify="center">
                <el-avatar :size="100" :src="fileList[0].url" style="text-align: center"></el-avatar>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'singleUpload',
        props: {
            value: String
        },
        computed: {
            imageUrl() {
                return this.value;
            },
            imageName() {
                if (this.value != null && this.value !== '') {
                    return this.value.substr(this.value.lastIndexOf("/") + 1);
                } else {
                    return null;
                }
            },
            fileList() {
                return [{
                    name: this.imageName,
                    url: this.imageUrl,
                }]
            },
            showFileList: {
                get: function () {
                    return this.value !== null && this.value !== '' && this.value !== undefined;
                },
                set: function (newValue) {
                }
            }
        },
        data() {
            return {
                dialogVisible: false,
                minioUploadUrl:'http://47.115.59.65:7777/minio/upload',
                // minioUploadUrl: 'http://localhost:8080/minio/upload',
            };
        },
        methods: {
            iconUrl(val) {
                this.$emit('iconUrl', val)
            },
            handleRemove() {

            },
            handlePreview() {
                this.dialogVisible = true;
            },
            handleUploadSuccess(res, file) {
                this.fileList.pop();
                this.fileList.push({name: file.name, url: res.data.url});
                this.showFileList = true;
                this.iconUrl(this.fileList[0].url);
                this.$message.success("上传完成后，需要点击修改才能改变头像");
            }
        }
    }
</script>
<style>

</style>


