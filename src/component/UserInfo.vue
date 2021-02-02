<template>
    <div class="info" @click="toUserInfo(user.userId)">
        <el-avatar
            :size="36"
            :src="user.icon"
            icon="el-icon-user-solid"/>
        <div class="right">
            <div class="name">{{ user.userName }}</div>
            <div class="userId">{{ user.userId }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserInfo",
    props: {
        user: {},
    },
    methods: {
        toUserInfo(userId) {
            this.$router.push({name: 'userInfo', query: {userId: userId}});
        }
    }
}
</script>

<style scoped lang="scss">
.info {
    display: flex;
    align-items: center;

    .right {
        display: flex;
        flex-direction: column;
        margin-left: 15px;

        .name {
            font-size: 16px;
            font-weight: 500;
        }

        .name:hover{
            color: #409EFF;
        }

        .userId {
            font-size: 14px;
        }
    }
}
</style>