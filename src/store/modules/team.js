import {getTeamInfoByUserId} from "@/network/api/team";

const team = {
    state: {
        myTeamFlag: false,
        teamName: ''
    },

    mutations: {
        SET_MY_TEAM_FALG: (state, myTeamFalg) => {
            state.myTeamFlag = myTeamFalg
        },
        SET_TEAM_NAME: (state, teamName) => {
            state.teamName = teamName
        }
    },

    actions: {
        SetTeamInfo({commit}, userId) {
            return new Promise((resolve, reject) => {
                getTeamInfoByUserId(userId).then(response => {
                    if (response.code != 200) {
                        this.$message.success(response.message);
                    }
                    if (response.data.name != null) {
                        commit('SET_MY_TEAM_FALG', true)
                        commit('SET_TEAM_NAME', response.data.name)
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            });
        },

        deleteTeamInfo({commit}){
            console.log("删除队伍信息")
            commit('SET_MY_TEAM_FALG', false);
            commit('SET_TEAM_NAME', '');
        }
    }
}

export default team;