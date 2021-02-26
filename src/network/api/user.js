import {request} from '../request'

//登录
export function login(userId, password) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            userId,
            password
        }
    })
}

//注册用户
export function register(user) {
    return request({
        url: '/register',
        method: 'post',
        data: {
            userId: user.userId,
            email: user.email,
            name: user.name,
            password: user.password
        }
    })
}

//注册用户
export function insertTeacher(user) {
    return request({
        url: '/insertTeacher',
        method: 'post',
        data: {
            userId: user.userId,
            email: user.email,
            name: user.name,
            password: user.password
        }
    })
}

//获取用户信息
export function getUserInfo(userId) {
    return request({
        url: '/user/getByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//修改用户信息
export function updateUserInfo(user) {
    return request({
        url: '/user/update',
        method: 'post',
        data: {
            userId: user.userId,
            name: user.name,
            email: user.email,
            gender: user.gender,
            enableFlag: user.enableFlag
        }
    })
}

//修改密码
export function updatePassword(user) {
    return request({
        url: '/user/updatePassword',
        method: 'post',
        data: {
            userId: user.userId,
            password: user.password
        }
    })
}

//通过用户账号查询用户
export function getByUserId(userId){
    return request({
        url: '/user/getByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//通过邮箱查询用户
export function getByEmail(email){
    return request({
        url: '/user/getByEmail',
        method: 'post',
        data: {
            email
        }
    })
}

//获取用户信息，团队信息，班级信息
export function getUserAllInfoByUserId(userId){
    return request({
        url: '/user/getUserAllInfoByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//获取学生列表
export function ListUser(userQuery){
    return request({
        url: '/user/list',
        method: 'post',
        data: {
            userId: userQuery.userId,
            name: userQuery.name,
            identityFlag: userQuery.identityFlag,
            year: userQuery.year,
            organizationName: userQuery.organizationName,
            pageNum: userQuery.pageNum,
            pageSize: userQuery.pageSize,
        }
    })
}

//获取用户扩展信息
export function getUserExtByUserId(userId){
    return request({
        url: '/userExt/getByUserId',
        method: 'post',
        data: {
            userId,
        }
    })
}

//获取用户收藏夹
export function getUserStoreFolder(userStore){
    return request({
        url: '/userStore/listFolder',
        method: 'post',
        data: {
            userId: userStore.userId,
            folderFlag: userStore.folderFlag,
            showFlag: userStore.showFlag,
        }
    })
}


//获取用户收藏夹
export function createUserStore(userStore){
    return request({
        url: '/userStore/insert',
        method: 'post',
        data: {
            userId: userStore.userId,
            name: userStore.name,
            reportId: userStore.reportId,
            reportFlag: userStore.reportFlag,
            blogId: userStore.blogId,
            blogFlag: userStore.blogFlag,
            folderFlag: userStore.folderFlag,
            parentId: userStore.parentId,
            description: userStore.description,
            showFlag: userStore.showFlag,
        }
    })
}

//查询是否收藏博客
export function getUserStoreByBlogIdAndUserId(userStore) {
    return request({
        url: '/userStore/getByBlogIdAndUserId',
        method: 'post',
        data: {
            blogId: userStore.blogId,
            userId: userStore.userId
        }
    })
}

//查询是否收藏报告
export function getUserStoreByReportIdAndUserId(userStore) {
    return request({
        url: '/userStore/getByReportIdAndUserId',
        method: 'post',
        data: {
            reportId: userStore.reportId,
            userId: userStore.userId
        }
    })
}


//查询是否收藏博客
export function deleteUserStore(userStore) {
    return request({
        url: '/userStore/delete',
        method: 'post',
        data: {
            id: userStore.id,
            reportId: userStore.reportId,
            reportFlag: userStore.reportFlag,
            blogId: userStore.blogId,
            blogFlag: userStore.blogFlag,
            folderFlag: userStore.folderFlag,
        }
    })
}

//查询收藏夹内容
export function listUserStoreByParentId(parentId) {
    return request({
        url: '/userStore/listByParentId',
        method: 'post',
        data: {
            parentId
        }
    })
}

//修改收藏夹
export function updateUserStore(userStore) {
    return request({
        url: '/userStore/update',
        method: 'post',
        data: {
            id: userStore.id,
            name: userStore.name,
            description: userStore.description,
            showFlag: userStore.showFlag
        }
    })
}

//忘记密码
export function forgetPassword(user) {
    return request({
        url: '/user/forgetPassword',
        method: 'post',
        data: {
            userId: user.userId,
            email: user.email,
        }
    })
}

//检查重置连接
export function checkResetLink(userPasswordDto) {
    return request({
        url: '/user/checkResetLink',
        method: 'post',
        data: {
            sid: userPasswordDto.sid,
            userId: userPasswordDto.userId,
        }
    })
}

