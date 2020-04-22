import ajax from './ajax'
const BASE = '/api'

export const reqLogin = (username, password) => ajax('/api/adminLogin', {username, password}, 'POST')

// 添加用户
export const reqRegister = (user) => ajax('register', user, 'POST')
export const getDoctorList = () => ajax(BASE + '/getDoctorList', {}, 'POST')