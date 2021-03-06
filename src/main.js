// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {
  Row,
  Col,
  Input,
  Button,
  Tabs,
  TabPane,
  Tag,
  Message
} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'
import Login from './components/Login'
import TodoList from './components/TodoList'
import Register from './components/Register'

Vue.prototype.$http = axios // 类似于vue-resource的调用方法

// 在调用 Vue.use 前，给 Message 添加 install 方法
// Reference: <http://www.yukapril.com/2017/07/12/vue-elementui-message.html>
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}

Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Message)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/todolist',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('demo-token')
  if (to.path === '/') { // 如果是跳转到登录页的
    if (token !== 'null' && token !== null) {
      next('/todolist') // 如果有token就转向todolist不返回登录页
    }
    next() // 否则跳转回登录页
  } else if (to.path === '/register') {
    if (token !== 'null' && token !== null) {
      next('/todolist') // 如果有token就转向todolist
    } else {
      next()
    }
  } else {
    if (token !== 'null' && token !== null) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token // 注意Bearer后有个空格
      next() // 如果有token就正常转向
    } else {
      next('/') // 否则跳转回登录页
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
