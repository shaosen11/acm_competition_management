
const organization = {
    state: {
        myOrganizationFlag: false,
        organizationName: '',
        year: '',
    },

    mutations: {
        SET_MY_ORGANIZATION_FLAG: (state, myOrganizationFlag) => {
            state.myOrganizationFlag = myOrganizationFlag
        },
        SET_ORGANIZATION_NAME: (state, organizationName) => {
            state.organizationName = organizationName
        },
        SET_YEAR: (state, year) => {
            state.year = year
        }
    },

    actions: {
        deleteOrganizationInfo({commit}){
            commit('SET_MY_ORGANIZATION_FLAG', false);
            commit('SET_ORGANIZATION_NAME', '');
            commit('SET_YEAR', '');
        },
    }
}

export default organization;