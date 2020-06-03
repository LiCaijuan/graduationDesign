import ajax from './ajax'
const BASE = '/api'

export const reqLogin = (username, password) => ajax('/api/queryByUsername', {username, password}, 'POST')

// 添加用户
export const reqRegister = (user) => ajax('register', user, 'POST')
export const getDoctorList = () => ajax(BASE + '/getDoctorList', {}, 'POST')