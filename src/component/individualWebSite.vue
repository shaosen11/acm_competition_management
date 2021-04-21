<template>
    <el-card>
        <b>个人站点</b>
        <div class="onePxDivider"></div>
        <div>
            <div class="webSite">
                <span class="webSiteLink">
                    <i class="iconfont el-icon-third-github-fill webSiteIcon"/>
                    <span style="margin-right: 5px">github:</span>
                    <el-link type="primary" :underline="false">
                        <span @click="toGitHub">{{this.userExt.githubLink|ellipsis}}</span>
                    </el-link>
                </span>
            </div>
            <div class="webSite">
                <span class="webSiteLink">
                    <i class="iconfont el-icon-third-gitee-fill-round webSiteIcon"/>
                    <span style="margin-right: 5px">gitee:</span>
                    <el-link type="primary" :underline="false">
                        <span @click="toGitee">{{this.userExt.giteeLink|ellipsis}}</span>
                    </el-link>
                </span>
            </div>
            <div class="webSite">
                <span class="webSiteLink">
                    <i class="iconfont el-icon-third-csdn webSiteIcon"/>
                    <span style="margin-right: 5px">csdn:</span>
                    <el-link type="primary" :underline="false">
                        <span @click="toCsdn">{{this.userExt.csdnLink|ellipsis}}</span>
                    </el-link>
                </span>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "individualWebSite",
        props: {
            userExt: {}
        },
        methods: {
            toGitHub(){
                this.toUrl(this.userExt.githubLink, "_blank");
            },
            toGitee(){
                this.toUrl(this.userExt.giteeLink, "_blank");
            },
            toCsdn(){
                this.toUrl(this.userExt.csdnLink, "_blank");
            },
            toUrl(url) {
                window.open(url, "_blank");
            }
        },
        filters: {
            ellipsis(value) {
                if (!value) return ''
                if (value.length > 20) {
                    return value.slice(0, 20) + '...'
                }
                return value
            },
        }
    }
</script>

<style scoped>
    .webSite {
        display: block;
        width: 100%;
        margin: 10px 10px;
    }

    .webSiteIcon {
        margin-right: 10px;
    }

    .webSiteLink {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
</style>