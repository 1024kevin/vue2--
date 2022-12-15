<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.display"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  data() {
    return {
      searchParams: {
        pageNo: 6,
        pageSize: 3,
      },
    };
  },
  mounted() {
    //为避免路由间跳转频发发送数据请求，故将派发的请求放在根组件app上，因为不管怎么跳转，根组件只会挂载一次
    this.$store.dispatch('categoryList')
  },
}
</script>

<style lang="css" scoped>

</style>
