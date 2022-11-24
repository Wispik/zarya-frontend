import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      purchases: [],
      token: localStorage.getItem('token') || ''
    }
  },
  actions: {
    AUTH_LOGIN: ({ commit }, token) => {
      localStorage.setItem('token', token)
      commit('AUTH_TOKEN', token)
    },
    AUTH_LOGOUT: ({ commit }) => {
      localStorage.clear()
      commit('AUTH_TOKEN', '')
    }
  },
  mutations: {
    AUTH_TOKEN: (state, token) => { state.token = token },
    SET_PURCHASES: (state, data) => {
      state.purchases = [...data]
    }
  },
  getters: {
    token: state => state.token,
    purchases: state => state.purchases,
    puschasesAllCount: state => state.purchases.length,
    puschasesActiveCount: state => state.purchases.filter(item => item.active).length,
    puschasesDeactiveCount: state => state.purchases.filter(item => !item.active).length,
  }
})

export default store