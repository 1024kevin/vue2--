import { reqGetSearchInfo } from '@/api';
const state = {
    searchList: {}
};
const mutations = {
    SEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {


    async getSearchList({ commit }, params = {}) {
        //params形参：当用户派发action时传递过来的第二个参数，至少是空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('SEARCHLIST', result.data);
        }
    }
};
//计算属性，简化数据
const getters = {
    //此处的state是当前store的state，并非大仓库中的state
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    //品牌的数据
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    //商品属性
    attrsList(state) {
        return state.searchList.attrsList;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}