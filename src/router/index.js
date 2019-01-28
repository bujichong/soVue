import Vue from 'vue'
import Router from 'vue-router'
const Login = r => require(['@/views/Login.vue'], r)
const Main = r => require(['@/components/Main.vue'], r)
const Dashboard = r => require(['@/views/Dashboard.vue'], r)
const Table = r => require(['@/views/table.vue'], r)
const ManyTable = r => require(['@/views/ManyTable.vue'], r)
const Form = r => require(['@/views/form.vue'], r)
const ManyForm = r => require(['@/views/ManyForm.vue'], r)
const Editor = r => require(['@/views/Editor.vue'], r)
// const Login = r => require(['@/views/login.vue'], r)
const Page404 = r => require(['@/views/404.vue'], r)
const Page403 = r => require(['@/views/403.vue'], r)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
              path: '/dashboard',
              component: Dashboard,
              meta: {
                  title: '系统首页'
              }
          },
          {
              path: '/table',
              component: Table,
              meta: {
                  title: '基础表格'
              }
          },
          {
              path: '/manyTable',
              component: ManyTable,
              meta: {
                  title: '其他表格'
              }
          },
          {
              path: '/form',
              component: Form,
              meta: {
                  title: '基本表单'
              }
          },
          {
              path: '/manyForm',
              component: ManyForm,
              meta: {
                  title: '其他表单'
              }
          },
          {
              path: '/editor',
              component: Editor,
              meta: {
                  title: '文本编辑器'
              }
          },
          {
              path: '/404',
              component: Page404,
              meta: {
                  title: '找不到页面'
              }
          },
          {
              path: '/403',
              component: Page403,
              meta: {
                  title: '没有权限',
                  hideInMenu : true,
              }
          },
      ]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
            hideInMenu : true,
        }
    },
    {
        path: '*',
        redirect: '/404'
    }
  ]
})
