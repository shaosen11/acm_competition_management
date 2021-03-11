import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import team from './modules/team';
import organization from './modules/organization'
import club from './modules/club'
import getters from "./getters";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        user,
        team,
        organization,
        club
    },
    getters,
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})
