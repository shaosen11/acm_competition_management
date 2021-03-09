import {request} from '../request'

//获取队伍分页信息
export function getOrganizationList(organizationQuery) {
    return request({
        url: '/organization/list',
        method: 'post',
        data: {
            year: organizationQuery.year,
            name: organizationQuery.name,
            visitFlag: organizationQuery.visitFlag,
            pageNum: organizationQuery.pageNum,
            pageSize: organizationQuery.pageSize,
        }
    })
}

//获取班级信息
export function getOrganizationByUserId(userId) {
    return request({
        url: '/organization/getByUserId',
        method: 'post',
        data: {
            userId
        }
    })
}

//获取年级
export function getOrganizationYearList() {
    return request({
        url: '/organization/listYear',
        method: 'get'
    })
}

//获取班级信息
export function getOrganizationByYearAndName(organization) {
    return request({
        url: '/organization/getByYearAndName',
        method: 'post',
        data: {
            year: organization.year,
            name: organization.name
        }
    })
}

//获取班级学生信息
export function listOrganizationUserByPage(OrganizationUserQueryParam) {
    return request({
        url: '/organizationUserRelation/listByPage',
        method: 'post',
        data: {
            year: OrganizationUserQueryParam.year,
            name: OrganizationUserQueryParam.name,
            pageNum: OrganizationUserQueryParam.pageNum,
            pageSize: OrganizationUserQueryParam.pageSize,
        }
    })
}

//获取班级学生信息
export function listOrganizationUser(OrganizationUserQueryParam) {
    return request({
        url: '/organizationUserRelation/list',
        method: 'post',
        data: {
            year: OrganizationUserQueryParam.year,
            name: OrganizationUserQueryParam.name,
            pageNum: OrganizationUserQueryParam.pageNum,
            pageSize: OrganizationUserQueryParam.pageSize,
        }
    })
}

//申请加入班级
export function applyJoinOrganization(organizationUserCooperation) {
    return request({
        url: '/organizationUserCooperation/applyJoinOrganization',
        method: 'post',
        data: {
            organizationId: organizationUserCooperation.organizationId,
            userId: organizationUserCooperation.userId,
        }
    })
}

//获取申请加入班级列表
export function getOrganizationUserCooperationList(OrganizationUserCooperationQueryParam) {
    return request({
        url: '/organizationUserCooperation/getByYearAndName',
        method: 'post',
        data: {
            year: OrganizationUserCooperationQueryParam.year,
            name: OrganizationUserCooperationQueryParam.name,
            pageNum: OrganizationUserCooperationQueryParam.pageNum,
            pageSize: OrganizationUserCooperationQueryParam.pageSize,
        }
    })
}

//批处理同意
export function organizationUserCooperationBatchAgree(ids) {
    return request({
        url: '/organizationUserCooperation/batchAgree',
        method: 'post',
        data: {
            ids
        }
    })
}

//批处理同意
export function refuseOrganizationUserCooperation(id) {
    return request({
        url: '/organizationUserCooperation/refuse',
        method: 'post',
        data: {
            id
        }
    })
}


//获取学院信息
export function collegeList() {
    return request({
        url: '/college/list',
        method: 'get',
    })
}

//获取班级信息
export function getByOrganizationId(organizationId) {
    return request({
        url: '/organization/getByOrganizationId',
        method: 'post',
        data: {
            organizationId
        }
    })
}

//创建班级
export function createOrganization(organization) {
    return request({
        url: '/organization/create',
        method: 'post',
        data: {
            organizationId: organization.organizationId,
            name: organization.name,
            year: organization.year,
            collegeId: organization.collegeId,
            userId: organization.userId,
            userName: organization.userName
        }
    })
}

//更新班级信息
export function updateOrganization(organization) {
    return request({
        url: '/organization/update',
        method: 'post',
        data: {
            id: organization.id,
            organizationId: organization.organizationId,
            name: organization.name,
            year: organization.year,
            collegeId: organization.collegeId,
            visitFlag: organization.visitFlag,
            joinFlag: organization.joinFlag
        }
    })
}

//更新班级信息
export function deleteOrganization(organizationId) {
    return request({
        url: '/organization/delete',
        method: 'post',
        data: {
            organizationId
        }
    })
}

//更新班级信息
export function outOrganization(organization) {
    return request({
        url: '/organizationUserRelation/out',
        method: 'post',
        data: {
            organizationId: organization.organizationId,
            userId: organization.userId,
        }
    })
}