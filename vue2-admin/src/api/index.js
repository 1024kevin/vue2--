//api进行统一管理模块
import requests from './request'
import mockRequests from './mockAjax'
//三级联动接口
///api/product/getBaseCategoryList GET请求  无参数
export const reqCategory = () => {
    //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
    //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
    //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
    return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}
//获取轮播图的mock数据
export const reqGetBannerList = () => {
    return mockRequests({ method: 'get', url: '/banner' });
}
export const reqGetFloorList = () => {
    return mockRequests({ method: 'get', url: '/floor' });
}