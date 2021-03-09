<template>
    <div class="container">
        <div v-if="this.$store.state.user.isLogin==1">
            <el-row :gutter="20">
                <el-col :span="2" style="text-align:center;">
                    <el-avatar :size="40"
                               :src="this.$store.state.user.icon"/>
                </el-col>
                <el-col :span="22">
                    <el-input
                            v-model="comment"
                            type="textarea"
                            :rows="3"
                            @focus="focusComment"
                            placeholder="写下你的评论">
                    </el-input>
                </el-col>
            </el-row>
            <transition name="el-zoom-in-top">
                <div class="btn-control" v-if="this.showCommit">
                    <span class="cancel" @click="cancelFocusComment">取消</span>
                    <el-button class="btn" type="primary" round @click="submitComment">确定</el-button>
                </div>
            </transition>
        </div>
        <el-divider></el-divider>

        <h3>全部评论</h3>
        <div class="comment" v-for="item in comments">
            <div class="info">
                <img class="avatar" :src="item.fromUserIcon" width="36" height="36"/>
                <div class="right">
                    <div class="name">{{item.fromUserName}}</div>
                    <div class="date">{{item.time}}</div>
                </div>
            </div>
            <div class="content" v-dompurify-html="item.comment"></div>
            <div class="control">
                <span class="comment-reply" @click="showCommentInput(item)">
                    <i class="iconfont el-icon-third-comment-copy"></i>
                    <span>回复</span>
                </span>
            </div>

            <div class="reply">
                <div class="item" v-for="reply in item.reply">
                    <div class="reply-content">
                        <span class="from-name">{{reply.fromUserName}}</span>
                        <span>:</span>
                        <span class="to-name">@{{reply.toUserName}}</span>
                        <span v-dompurify-html="reply.comment"></span>
                    </div>
                    <div class="reply-bottom">
                        <span>{{reply.time}}</span>
                        <span class="reply-text" @click="showCommentInput(item, reply)">
                            <i class="iconfont el-icon-third-comment-copy"></i>
                            <span>回复</span>
                        </span>
                    </div>
                </div>
                <div class="write-reply" v-if="item.reply.length > 0" @click="showCommentInput(item)">
                    <i class="el-icon-edit"></i>
                    <span class="add-comment">添加新评论</span>
                </div>
                <transition name="fade">
                    <div class="input-wrapper" v-if="showItemId === item.commentId">
                        <el-input class="gray-bg-input"
                                  v-model="inputComment"
                                  type="textarea"
                                  :rows="3"
                                  autofocus
                                  placeholder="写下你的评论">
                        </el-input>
                        <div class="btn-control">
                            <span class="cancel" @click="cancel">取消</span>
                            <el-button class="btn" type="primary" round @click="commitComment">确定</el-button>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import {insertReportComment} from '@/network/api/report'

    export default {
        props: {
            reportId: {},
            comments: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                inputComment: '',
                showItemId: '',
                showCommit: false,
                toUserId: '',
                comment: '',
            }
        },
        methods: {

            /**
             * 点击取消按钮
             */
            cancel() {
                this.showItemId = ''
            },

            /**
             * 提交评论
             */
            commitComment() {
                let space = this.inputComment.indexOf(" ");
                let comment = this.inputComment.substring(space + 1)
                const reportComment = {
                    parentId: this.showItemId,
                    reportId: this.reportId,
                    fromUserId: this.$store.state.user.userId,
                    toUserId: this.toUserId,
                    comment: comment
                }
                this.insertReportComment(reportComment)
                this.inputComment = ''
            },
            submitComment() {
                if (this.$store.state.user.userId == "") {
                    return this.$message.info("请先登录");
                }
                const reportComment = {
                    reportId: this.reportId,
                    fromUserId: this.$store.state.user.userId,
                    comment: this.comment
                }
                this.insertReportComment(reportComment)
                this.comment = ''
            },

            insertReportComment(reportComment) {
                insertReportComment(reportComment).then(res => {
                    if (res.code != 200) {
                        return this.$message.error(res.message);
                    }
                    this.$emit('getReportCommentByReportId', this.reportId)
                    this.$message.success(res.message);
                })
            },


            /**
             * 点击评论按钮显示输入框
             * item: 当前大评论
             * reply: 当前回复的评论
             */
            showCommentInput(item, reply) {
                if (reply) {
                    this.inputComment = "@" + reply.fromUserName + " "
                    this.toUserId = reply.fromUserId
                } else {
                    this.inputComment = ''
                    this.toUserId = item.fromUserId
                }
                this.showItemId = item.commentId
            },

            focusComment() {
                this.showCommit = true
            },

            cancelFocusComment() {
                this.showCommit = false
            },

        },
    }
</script>

<style scoped lang="scss">
    @import 'src/assets/scss/index';

    .btn-control {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;

        .cancel {
            font-size: 16px;
            color: #606266;
            margin-right: 20px;
            cursor: pointer;

            &:hover {
                color: #333;
            }
        }

        .confirm {
            font-size: 16px;
        }
    }

    .container {
        padding: 0 10px;
        box-sizing: border-box;

        .comment {
            display: flex;
            flex-direction: column;
            padding: 10px;
            border-bottom: 1px solid $border-fourth;

            .info {
                display: flex;
                align-items: center;

                .avatar {
                    border-radius: 50%;
                }

                .right {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;

                    .name {
                        font-size: 16px;
                        color: $text-main;
                        margin-bottom: 5px;
                        font-weight: 500;
                    }

                    .date {
                        font-size: 12px;
                        color: $text-minor;
                    }
                }
            }

            .content {
                font-size: 16px;
                color: $text-main;
                line-height: 20px;
                padding: 10px 0;
            }

            .control {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: $text-minor;

                .like {
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    cursor: pointer;

                    &.active, &:hover {
                        color: $color-main;
                    }

                    .iconfont {
                        font-size: 14px;
                        margin-right: 5px;
                    }
                }

                .comment-reply {
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    &:hover {
                        color: $text-333;
                    }

                    .iconfont {
                        font-size: 16px;
                        margin-right: 5px;
                    }
                }

            }

            .reply {
                margin: 10px 0;
                border-left: 2px solid $border-first;

                .item {
                    margin: 0 10px;
                    padding: 10px 0;
                    border-bottom: 1px dashed $border-third;

                    .reply-content {
                        display: flex;
                        align-items: center;
                        font-size: 14px;
                        color: $text-main;

                        .from-name {
                            color: $color-main;
                        }

                        .to-name {
                            color: $color-main;
                            margin-left: 5px;
                            margin-right: 5px;
                        }
                    }

                    .reply-bottom {
                        display: flex;
                        align-items: center;
                        margin-top: 6px;
                        font-size: 12px;
                        color: $text-minor;

                        .reply-text {
                            display: flex;
                            align-items: center;
                            margin-left: 10px;
                            cursor: pointer;

                            &:hover {
                                color: $text-333;
                            }

                            .icon-comment {
                                margin-right: 5px;
                            }
                        }
                    }
                }

                .write-reply {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: $text-minor;
                    padding: 10px;
                    cursor: pointer;

                    &:hover {
                        color: $text-main;
                    }

                    .el-icon-edit {
                        margin-right: 5px;
                    }
                }

                .fade-enter-active, fade-leave-active {
                    transition: opacity 0.5s;
                }

                .fade-enter, .fade-leave-to {
                    opacity: 0;
                }

                .input-wrapper {
                    padding: 10px;

                    .gray-bg-input, .el-input__inner {
                        /*background-color: #67C23A;*/
                    }

                    .btn-control {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        padding-top: 10px;

                        .cancel {
                            font-size: 16px;
                            color: $text-normal;
                            margin-right: 20px;
                            cursor: pointer;

                            &:hover {
                                color: $text-333;
                            }
                        }

                        .confirm {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
</style>