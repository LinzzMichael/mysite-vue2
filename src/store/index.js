import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
        }
    },
    mutations: {
        //登录函数，写入本地
        login (state, user) {
            state.user = user //目前认为是将目前状态的种存储的user更新
            //然后将session中的更新
            console.log(user.email)
            window.localStorage.setItem('user', JSON.stringify(user))
        },
        //登出
        logout(state) {
            localStorage.clear();
            state.user = {};
        }

    }
})

