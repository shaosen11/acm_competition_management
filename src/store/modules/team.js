const team = {
    state: {
        myTeamFlag: false,
        teamName: ''
    },

    mutations: {
        SET_MY_TEAM_FLAG: (state, myTeamFlag) => {
            state.myTeamFlag = myTeamFlag
        },
        SET_TEAM_NAME: (state, teamName) => {
            state.teamName = teamName
        }
    },

    actions: {
        deleteTeamInfo({commit}){
            commit('SET_MY_TEAM_FLAG', false);
            commit('SET_TEAM_NAME', '');
        },

        setTeamInfo({commit}, name){
            commit('SET_MY_TEAM_FLAG', true)
            commit('SET_TEAM_NAME', name)
        }
    }
}

export default team;