import {request} from '../request'

//获取OJ
export function listOnlineJudgeSystem(onlineJudgeSystem) {
    return request({
        url: '/onlineJudgeSystem/list',
        method: 'post',
        data: {
            showFlag: onlineJudgeSystem.showFlag,
        }
    })
}

//获取OJ分页信息
export function listOnlineJudgeSystemPage(onlineJudgeSystem) {
    return request({
        url: '/onlineJudgeSystem/listByPage',
        method: 'post',
        data: {
            pageNum: onlineJudgeSystem.pageNum,
            pageSize: onlineJudgeSystem.pageSize,
        }
    })
}

//修改OJ
export function updateOnlineJudgeSystem(onlineJudgeSystem) {
    return request({
        url: '/onlineJudgeSystem/update',
        method: 'post',
        data: {
            id: onlineJudgeSystem.id,
            name: onlineJudgeSystem.name,
            description: onlineJudgeSystem.description,
            url: onlineJudgeSystem.url,
            showFlag: onlineJudgeSystem.showFlag,
        }
    })
}
//创建OJ
export function createOnlineJudgeSystem(onlineJudgeSystem) {
    return request({
        url: '/onlineJudgeSystem/create',
        method: 'post',
        data: {
            name: onlineJudgeSystem.name,
            description: onlineJudgeSystem.description,
            showFlag: onlineJudgeSystem.showFlag,
            url: onlineJudgeSystem.url,
            userId: onlineJudgeSystem.userId,
        }
    })
}

//根据OJ名称获取OJ
export function getByOnlineJudgeSystemName(name) {
    return request({
        url: '/onlineJudgeSystem/getByName',
        method: 'post',
        data: {
            name
        }
    })
}

//新增报告
export function saveReport(report) {
    return request({
        url: '/report/save',
        method: 'post',
        data: {
            userId: report.userId,
            reportId: report.reportId,
            name: report.name,
            problemName: report.problemName,
            ojId: report.ojId,
            problemLink: report.problemLink,
            problemTypeId: report.problemTypeId,
            problemDescribe: report.problemDescribe,
            problemDescribeMd: report.problemDescribeMd,
            input: report.input,
            inputMd: report.inputMd,
            output: report.output,
            outputMd: report.outputMd,
            inputExamples: report.inputExamples,
            inputExamplesMd: report.inputExamplesMd,
            outputExamples: report.outputExamples,
            outputExamplesMd: report.outputExamplesMd,
            analysis: report.analysis,
            analysisMd: report.analysisMd,
            program: report.program,
            programMd: report.programMd,
            testExamples: report.testExamples,
            testExamplesMd: report.testExamplesMd,
            resultPicture: report.resultPicture,
            resultPictureMd: report.resultPictureMd,
            resultComment: report.resultComment,
            resultCommentMd: report.resultCommentMd,
        }
    })
}


//根据reportId获取report
export function getReportByReportId(reportId) {
    return request({
        url: '/report/getByReportId',
        method: 'post',
        data: {
            reportId
        }
    })
}

//发布解题报告
export function releaseReport(report) {
    return request({
        url: '/report/release',
        method: 'post',
        data: {
            userId: report.userId,
            reportId: report.reportId,
            name: report.name,
            problemName: report.problemName,
            ojId: report.ojId,
            problemLink: report.problemLink,
            problemTypeId: report.problemTypeId,
            problemDescribe: report.problemDescribe,
            problemDescribeMd: report.problemDescribeMd,
            input: report.input,
            inputMd: report.inputMd,
            output: report.output,
            outputMd: report.outputMd,
            inputExamples: report.inputExamples,
            inputExamplesMd: report.inputExamplesMd,
            outputExamples: report.outputExamples,
            outputExamplesMd: report.outputExamplesMd,
            analysis: report.analysis,
            analysisMd: report.analysisMd,
            program: report.program,
            programMd: report.programMd,
            testExamples: report.testExamples,
            testExamplesMd: report.testExamplesMd,
            resultPicture: report.resultPicture,
            resultPictureMd: report.resultPictureMd,
            resultComment: report.resultComment,
            resultCommentMd: report.resultCommentMd,
        }
    })
}

//获取博客数据
export function getStatisticsByReportId(reportId) {
    return request({
        url: '/report/getStatisticsByReportId',
        method: 'post',
        data: {
            reportId
        }
    })
}

//获取博客内容
export function getContentByReportId(reportId) {
    return request({
        url: '/report/getContentByReportId',
        method: 'post',
        data: {
            reportId,
        }
    })
}

//点赞/取消博客
export function click(reportUserClick) {
    return request({
        url: '/reportUserClick/click',
        method: 'post',
        data: {
            reportId: reportUserClick.reportId,
            userId: reportUserClick.userId
        }
    })
}

//查询点赞
export function getClickByReportIdAndUserId(reportUserClick) {
    return request({
        url: '/reportUserClick/getByReportIdAndUserId',
        method: 'post',
        data: {
            reportId: reportUserClick.reportId,
            userId: reportUserClick.userId
        }
    })
}

//插入浏览记录
export function insertReportUserView(reportUserView) {
    return request({
        url: '/reportUserView/insert',
        method: 'post',
        data: {
            reportId: reportUserView.reportId,
            userId: reportUserView.userId
        }
    })
}


//添加评论
export function insertReportComment(reportComment) {
    return request({
        url: '/reportComment/insert',
        method: 'post',
        data: {
            parentId: reportComment.parentId,
            reportId: reportComment.reportId,
            fromUserId: reportComment.fromUserId,
            toUserId: reportComment.toUserId,
            comment: reportComment.comment,
        }
    })
}

//获取blogId
export function getReportCommentByReportId(reportId) {
    return request({
        url: '/reportComment/getByReportId',
        method: 'post',
        data: {
            reportId
        }
    })
}