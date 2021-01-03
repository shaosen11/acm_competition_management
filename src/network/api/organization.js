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
export function getUserListByYearAndName(OrganizationUserQueryParam) {
    return request({
        url: '/organization/getUserListByYearAndName',
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
