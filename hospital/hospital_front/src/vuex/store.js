import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  doctorDate: '',
  departmentDate: '',
  doctorId: 0,
  departmentId: 0
}
const mutations = {
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
  }
}
export default new Vuex.Store({
  state,
  mutations
})