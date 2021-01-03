
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

    }
}

export default organization;