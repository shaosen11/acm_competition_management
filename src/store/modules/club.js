
const club = {
    state: {
        clubFlag: '',
    },

    mutations: {
        SET_CLUB_FLAG: (state, clubFlag) => {
            state.clubFlag = clubFlag
        },
    },

    actions: {
        deleteClubFlag({commit}){
            commit('SET_CLUB_FLAG', '');
        },
    }
}

export default club;