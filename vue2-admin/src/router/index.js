import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '@/store'
import routes from './routes'
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
const router = new VueRouter({
    routes,
    scrollBehavior() {
        //滚动行为这个函数,需要有返回值,返回值为一个对象。
        //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
        return { y: 0 };
    }
});
export default router;

//全局守卫:只要项目中有任何路由变化，全局守卫都会进行拦截【符合条件走你，不符合条件不能访问】

//全局守卫:全局前置守卫【访问之前进行触发】

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //to:去的那个路由的信息
    //from:从那个路由而来的信息
    //next:放行函数!!!!!! 
    //第一种：next(),放行函数，放行到它想去的路由！！！
    //第二种:next(path),守卫指定放行到那个路由去?

    //用户是否登录:取决于仓库里面是否有token！！！
    //每一次路由跳转之前需要用有用户信息在跳转,没有发请求获取用户信息在跳转！！！！
    //token
    let hasToken = store.state.user.token;
    //用户信息
    let hasNickName = store.state.user.nickName;
    //用户登录
    if (hasToken) {
        //用户登录了,不能去login
        if (to.path == "/login") {
            next('/home');
        } else {
            //用户登陆了,而且还有用户信息【去的并非是login】
            if (hasNickName) {
                next();
            } else {
                //用户登陆了,但是没有用户信息 
                try {
                    //发请求获取用户信息以后在放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //用户没有信息，还携带token发请求获取用户信息【失败】
                    //token【学生证失效了】
                    //token失效:本地清空数据、服务器的token通知服务器清除
                    await store.dispatch('logout');
                    //回到登录页，重新获取一个新的学生证
                    next('/login');
                }
            }
        }
    } else {
        //用户未登录||目前的判断都是放行.将来这里会'回手掏'增加一些判断
        //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/Login?redirect=' + toPath);
        } else {
            next();
        }
    }
});