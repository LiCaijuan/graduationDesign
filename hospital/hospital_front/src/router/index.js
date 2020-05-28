import Vue from 'vue'
import Router from 'vue-router'
import Login from './login'
import Register from './register'
import Home from './home'
import Doctor from './doctor'
import Department from './department'
import DoctorOrder from './doctorOrder'
import DepartmentOrder from './DepartmentOrder'
// import Record from './record'
import Report from './report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        isLogin: true
      }
    }, {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isLogin: false
      }
    }, {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        isLogin: false
      }
    }, {
      path: '/doctor',
      name: 'doctor',
      component: Doctor,
      meta: {
        isLogin: true
      }
    }, {
      path: '/department',
      name: 'department',
      component: Department,
      meta: {
        isLogin: true
      }

    }, {
      path: '/doctorOrder',
      name: 'doctorOrder',
      component: DoctorOrder,
      meta: {
        isLogin: true
      }
    }, {
      path: '/departmentOrder',
      name: 'departmentOrder',
      component: DepartmentOrder,
      meta: {
        isLogin: true
      }
    }, {
      path: '/report',
      name: 'report',
      component: Report,
      meta: {
        isLogin: true
      }
    }
  ]
})
