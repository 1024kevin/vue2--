import axios from 'axios';
import nprogress from 'nprogress';
//网页加载进度条
import "nprogress/nprogress.css";


const request = axios.create({
    //配置对象
    //基础路径，发请求的时候都会给带上/api的路径
    baseURL: "/api",
    //请求时间限制
    timeout: 5000,
});
//请求拦截器：在发送请求之前，请求拦截器可以检测到，然后在发送请求之前可以先处理一些事件
request.interceptors.request.use((config) => {
    //config:配置对象，其中Header请求头很重要！！！
    nprogress.start()
    return config
})
request.interceptors.response.use((res) => {
    //请求成功后所作的处理
    nprogress.done()
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))
})
export default request;
