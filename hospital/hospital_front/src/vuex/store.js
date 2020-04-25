import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  doctorDate: '',
  doctorId: 0
}
const mutations = {
  changeDoctorDate (state, payload) {
    state.doctorDate = payload.doctorDate
  },
  changeDoctorId (state, payload) {
    state.doctorId = payload.doctorId
  }
}
export default new Vuex.Store({
  state,
  mutations
})