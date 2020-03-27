import Vue from 'vue'
import Router from 'vue-router'
import Login from './login'
import Register from './register'
import Home from './home'
import Order from './order'
import Doctor from './doctor'
import Department from './department'
import DoctorOrder from './doctorOrder'
import DepartmentOrder from './DepartmentOrder'
import Record from './record'
import Report from './report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/order',
      name: 'order',
      component: Order
    }, {
      path: '/doctor',
      name: 'doctor',
      component: Doctor
    }, {
      path: '/department',
      name: 'department',
      component: Department
    }, {
      path: '/doctorOrder',
      name: 'doctorOrder',
      component: DoctorOrder
    }, {
      path: '/departmentOrder',
      name: 'departmentOrder',
      component: DepartmentOrder
    }, {
      path: '/record',
      name: 'record',
      component: Record
    }, {
      path: '/report',
      name: 'report',
      component: Report
    }
  ]
})
