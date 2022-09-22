import Vue from "vue";
import Vuex from "vuex";
import { login, getUser, logout } from "../api/user"
import { setToken, getToken, setUserInfo, getUserInfo, removeTokenAddUserInfo } from '../utils/auth'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken() || '',
    userInfo: getUserInfo() || '',
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    SET_USER_INFO(state, user) {
      state.userInfo = user
      setUserInfo(user)
    }
  },
  actions: {
    //登录接口
    async login({ commit }, loginForm) {
      try {
        const res = await login(loginForm)
        commit('SET_TOKEN', res.token)
        return res.token
      } catch (err) {
        console.log(err.message);
      }
    },
    //用户信息接口
    async user({ commit }) {
      try {
        const user = await getUser()
        commit('SET_USER_INFO', user)
        return user
      } catch (error) {
        console.log(error.message);
      }
    },
    //用户退出账号接口
    async Logout({ commit }) {
      const response = await logout()
      removeTokenAddUserInfo()
      return response
    }









    // DIS_SET_TOKEN({ commit }, token) {
    //   commit('SET_TOKEN', token)
    // },
    // DIS_SET_USER_INFO({ commit }, user) {
    //   commit('SET_USER_INFO', user)
    // }
  },
  modules: {},
});
