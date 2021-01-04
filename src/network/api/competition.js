import {request} from "@/network/request";


//创建班级
export function createCompetition(competition) {
    return request({
        url: '/competition/create',
        method: 'post',
        data: {
            name: competition.name,
            description: competition.description,
            startTime: competition.startTime,
            endTime: competition.endTime,
            registrationTime: competition.registrationTime,
            position: competition.position,
            teamFlag: competition.teamFlag,
            personFlag: competition.personFlag,
            showFlag: competition.showFlag,
            userId: competition.userId,
            userName: competition.userName,
        }
    })
}