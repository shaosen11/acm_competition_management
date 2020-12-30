import {getUserInfo, getUserAllInfoByUserId} from '@/network/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        userId: '',
        name: '',
        icon: '',
        isLogin: false,
        passwordFlag: '',
        identityFlag: '',
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER_ID: (state, userId) => {
            state.userId = userId
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ICON: (state, icon) => {
            state.icon = icon
        },
        SET_IS_LOGIN: (state, isLogin) => {
            state.isLogin = isLogin
        },
        SET_PASSWORD_FLAG: (state, passwordFlag) => {
            state.passwordFlag = passwordFlag
        },
        SET_IDENTITY_FLAG: (state, identityFlag) => {
            state.identityFlag = identityFlag
        }
    },

    actions: {
        LoginSuccess({commit}, token) {
            setToken(token);
            commit('SET_TOKEN', token);
            commit('SET_IS_LOGIN', true);
        },

        SetUserAllInfo({commit}, userId) {
            return new Promise((resolve, reject) => {
                getUserAllInfoByUserId(userId).then(response => {
                    const data = response
                    console.log(data)
                    //设置用户信息
                    commit('SET_USER_ID', data.userId);
                    commit('SET_NAME', data.userName);
                    commit('SET_ICON', data.icon);
                    commit('SET_PASSWORD_FLAG', data.passwordFlag);
                    commit('SET_IDENTITY_FLAG', data.identityFlag);
                    //设置队伍信息
                    if (data.teamName != null) {
                        commit('SET_MY_TEAM_FLAG', true)
                        commit('SET_TEAM_NAME', data.teamName)
                    }
                    //设置班级
                    if (data.organizationName != null && data.year != null) {
                        commit('SET_MY_ORGANIZATION_FLAG', true)
                        commit('SET_ORGANIZATION_NAME', data.organizationName)
                        commit('SET_YEAR', data.year)
                    }
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        LoginOut({commit, state}) {
            commit('SET_TOKEN', '');
            commit('SET_IS_LOGIN', false);
            commit('SET_USER_ID', '');
            commit('SET_NAME', '');
            commit('SET_ICON', '');
            commit('SET_MY_TEAM_FLAG', false);
            commit('SET_TEAM_NAME', '');
            commit('SET_MY_ORGANIZATION_FLAG', false);
            commit('SET_ORGANIZATION_NAME', '');
            commit('SET_YEAR', '');
            commit('SET_PASSWORD_FLAG', '');
            commit('SET_IDENTITY_FLAG', '');
            removeToken();
        }
    }
}

export default user