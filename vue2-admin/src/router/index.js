import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, rejcet) {
    if (resolve && rejcet) {
        //call || apply区别：相同点：都可以调用函数一次，都可以篡改函数上下文
        //                   不同点：call传入多个参数用逗号隔开，apply用数组传参
        originPush.call(this, location, resolve, rejcet)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, rejcet) {
    if (resolve && rejcet) {
        //call || apply区别：相同点：都可以调用函数一次，都可以篡改函数上下文
        //                   不同点：call传入多个参数用逗号隔开，apply用数组传参
        originReplace.call(this, location, resolve, rejcet)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
export default new VueRouter({
    routes: [
        {
            path: '/Home',
            component: Home,
            meta: {
                display: true
            }
        },
        {
            path: '/Login',
            component: Login
        },
        {
            path: '/Register',
            component: Register
        },
        {
            path: '/Search/:keyword?',
            component: Search,
            meta: {
                display: true
            },
            //props传参
            name: 'Search',
            // props($route) {
            //     return { keyword: $route.params.keyword }
            // }
        },
        {
            path: '*',
            redirect: '/Home'
        }
    ]
})