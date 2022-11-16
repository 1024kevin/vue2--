import { reqGetSearchInfo } from '@/api';
let state = {
    searchList: {}
};
let mutations = {
    SEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
let actions = {


    async getSearchList({commit},params={}) {
        //params形参：当用户派发action时传递过来的第二个参数，至少是空对象
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('SEARCHLIST', result.data);
            console.log(result);
        }
    }
}
let getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}