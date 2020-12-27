import {getOrganizationByUserId} from '@/network/api/organization'

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
        SetOrganizationInfo({commit}, userId){
            return new Promise((resolve, reject) => {
                getOrganizationByUserId(userId).then(response => {
                    if (response.code != 200) {
                        this.$message.success(response.message);
                    }
                    if (response.data.name != null) {
                        commit('SET_MY_ORGANIZATION_FLAG', true)
                        commit('SET_ORGANIZATION_NAME', response.data.name)
                        commit('SET_YEAR', response.data.year)
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            });
        },

    }
}

export default organization;