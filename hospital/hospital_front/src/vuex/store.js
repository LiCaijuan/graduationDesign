import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  doctorDate: '',
  departmentDate: '',
  doctorId: 0,
  departmentId: 0,
  isLogin: false,
  backDate: ''
}
const getters = {
  isLogin: state => state.isLogin
}
const mutations = {
  userStatus (state, flag) {
    state.isLogin = flag
  },
  changeDoctorDate (state, payload) {
    state.doctorDate = payload.doctorDate
  },
  changeDepartmentDate (state, payload) {
    state.departmentDate = payload.departmentDate
  },
  changeDoctorId (state, payload) {
    state.doctorId = payload.doctorId
  },
  changeDepartmentId (state, payload) {
    state.departmentId = payload.departmentId
  },
  changeBackDate (state, payload) {
    state.backDate = payload.backDate
  }
}
const actions = {
  // 获取登录状态
  userLogin ({commit}, flag) {
    commit('userStatus', flag)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
