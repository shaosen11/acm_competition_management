import {login, getUserInfo} from '@/network/api/user'
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

        SetUserInfo({commit}, userId){
            return new Promise((resolve, reject) => {
                getUserInfo(userId).then(response => {
                    const data = response.data
                    commit('SET_USERID', data.userId);
                    commit('SET_NAME', data.name);
                    commit('SET_ICON', data.icon);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            });
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
        // // 登出
        // LogOut({ commit, state }) {
        //     return new Promise((resolve, reject) => {
        //         logout(state.token).then(() => {
        //             commit('SET_TOKEN', '')
        //             removeToken()
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },
        //
        // // 前端 登出
        // FedLogOut({ commit }) {
        //     return new Promise(resolve => {
        //         commit('SET_TOKEN', '')
        //         removeToken()
        //         resolve()
        //     })
        // }
    }
}

export default user