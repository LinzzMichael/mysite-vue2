import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Home from "@/components/Home";
import Registe from "@/components/Registe";
import Editor from "@/components/Editor";
import Blog from "@/components/home/Blog"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/login' },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            // home页面并不需要被访问
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'AppIndex',
                    component: AppIndex,
                    meta: {
                        requireAuth: true,
                    }
                },
                {
                    path: '/blog/getBlog',
                    name: 'Blog',
                    component: Blog,
                    meta: {
                        requireAuth: true,
                    }
                },

            ]
        },

        // 下面都是固定的写法
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        // 下面都是固定的写法
        {
            path: '/registe',
            name: 'Registe',
            component: Registe
        },
        {
            path:"/editor",
            name: 'Editor',
            component: Editor,
            meta: {
                requireAuth: true,
            }
        }
        // {
        //     path: '/index',
        //     name: 'AppIndex',
        //     component: AppIndex,
        //     meta: {
        //         requireAuth: true
        //     }
        // }
    ]
})


