import {request} from '../request'

//获取队伍分页信息
export function getOrganizationList(organizationQuery) {
    return request({
        url: '/organization/list',
        method: 'post',
        data: {
            year: organizationQuery.year,
            name: organizationQuery.name,
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
export function getOrganizationYearlist() {
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
export function getUserListByOrganizationId(OrganizationUserQueryParam) {
    return request({
        url: '/organization/getUserListByOrganizationId',
        method: 'post',
        data: {
            organizationId: OrganizationUserQueryParam.organizationId,
            pageNum: OrganizationUserQueryParam.pageNum,
            pageSize: OrganizationUserQueryParam.pageSize,
        }
    })
}