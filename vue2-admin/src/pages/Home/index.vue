<template>
  <div>
    <!-- 因为该组件已经全局注册，不需要再引入 -->
   <TypeNav></TypeNav>
   <ListContainer></ListContainer>
   <Recommend></Recommend>
   <Rank></Rank>
   <Like></Like>
   <Floor v-for="(floor,index) in floorList" :key="floor.id" :floorList="floor"></Floor>
   <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/brand'
import { mapState } from 'vuex'
export default {
name:'Home',
components:{
  ListContainer,
  Recommend,
  Rank,
  Like,
  Floor,
  Brand
},
mounted() {
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList:state=>state.home.floorList
    })
  },
}
</script>

<style>

</style>