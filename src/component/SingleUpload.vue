<template> 
    <div>
        <el-upload
            ref="upload"
            action="string"
            list-type="picture-card"
            :before-upload="onBeforeUploadImage"
            :http-request="UploadImage"
            :file-list="fileList"
            :on-preview="handlePreview">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过1MB，请尽量选择正方形图片</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <img width="100%" :src="fileList[0].url">
        </el-dialog>
    </div>
</template>
<script>
import {upload} from "@/network/api/minio";

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
        };
    },
    methods: {
        iconUrl(val) {
            this.$emit('iconUrl', val)
        },
        handlePreview() {
            this.dialogVisible = true;
        },
        onBeforeUploadImage(file) {
            let isIMAGE = false
            if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
                isIMAGE = true
            }
            const isLt1M = file.size / 1024 / 1024 < 1
            if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!')
            }
            if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 10MB!')
            }
            return isIMAGE && isLt1M
        },
        UploadImage(param) {
            const formData = new FormData()
            formData.append('file', param.file)
            upload(formData).then(res => {
                if (res.code != 200) {
                    return this.$message.error(res.message);
                }
                this.fileList.pop();
                this.fileList.push({name: res.data.name, url: res.data.url});
                this.showFileList = true;
                this.iconUrl(this.fileList[0].url);
                this.$message.success("需要点击修改按钮才能改变头像");
            })
        },
    }
}
</script>
<style>

</style>


