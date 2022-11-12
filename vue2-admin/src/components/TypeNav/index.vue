<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @click="getSearch">
                <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    methods: {
        /*  changeIndex(index){
             this.currentIndex=index
         }, */

        //给链接直接加router-link的话会循环多次导致减速
        //为此可以添加点击事件委派给最近的父元素
        //先给一级、二级、三级相对应的连接加上自定义属性，以此区分是否为所需要的连接a标签
        changeShow() {
            if (this.$route.path != '/Home') {
                this.show = true;
            }
        },
        getSearch(event) {
            let element = event.target;
            //节点有一个dataset属性，可以获取节点的自定义属性和值
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            //如果该节点有categoryname属性，那么一定是a标签
            if (categoryname) {
                let location = {
                    name: 'Search',
                    query: { categoryName: categoryname },
                };
                if (category1id) {
                    location.query.category1Id = category1id;
                } else if (category2id) {
                    location.query.category2Id = category2id;
                } else if (category3id) {
                    location.query.category3Id = category3id;
                }
                //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
                if (this.$route.params.keyword) {
                    location.params = this.$route.params;
                }
                //目前商品分类这里携带参数只有query参数
                this.$router.push(location);
            }
        },
        changeIndex: throttle(function (index) {

            //鼠标进入事件,假如用户的行为过快,会导致项目业务丢失【里面业务有很多，可能出现卡顿现象】。
            //一句话：用户行为过快,浏览器反应不过来,导致业务丢失!!!!
            this.currentIndex = index
        }, 50),
        leaveIndex() {
            this.currentIndex = -1;
            if (this.$route.path != "/Home") {
                this.show = false;
            }
        }
    },
    mounted() {
        if (this.$route.path != '/Home') {
            this.show = false;
        }
        this.$store.dispatch('categoryList')
    },
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList


        })
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }


                }

                .cur {
                    background: skyblue;
                }
            }
        }
        //过渡动画样式
        //过渡动画开始
        .sort-enter{
            height: 0px;
        }
        .sort-enter-to{
            height: 461px;
        }
        .sort-enter-active{
            transition: all .3s ;
        }
    }
}
</style>