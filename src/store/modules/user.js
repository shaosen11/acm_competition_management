import {getUserInfo, getUserAllInfoByUserId} from '@/network/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        userId: '',
        name: '',
        icon: '',
        isLogin: false
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERID: (state, userId) => {
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
                    //设置用户信息
                    commit('SET_USERID', data.userId);
                    commit('SET_NAME', data.userName);
                    commit('SET_ICON', data.icon);
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
            commit('SET_USERID', '');
            commit('SET_NAME', '');
            commit('SET_ICON', '');
            commit('SET_MY_TEAM_FLAG', false);
            commit('SET_TEAM_NAME', '');
            commit('SET_MY_ORGANIZATION_FLAG', false);
            commit('SET_ORGANIZATION_NAME', '');
            commit('SET_YEAR', '');
            removeToken();
        }
    }
}

export default user