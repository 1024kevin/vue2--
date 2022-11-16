<template>
            <div class="floorBanner">
              <div class="swiper-container" ref="cur" >
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in List" :key="item.id" >
                    <img :src="item.imgUrl" />
                  </div>
<!--                   <div class="swiper-slide">
                    <img src="./images/floor-1-b02.png" />
                  </div>
                  <div class="swiper-slide">
                    <img src="./images/floor-1-b03.png" />
                  </div> -->
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
            </div>
</template>

<script>
import Swiper from 'swiper';
export default {
name:'Carousel',
props:['List'],
watch:{
   List:{
    immediate:true,
    handler(){
      this.$nextTick(()=>{var banner= new Swiper(this.$refs.cur, {
          //设置轮播图防线
          direction: "horizontal",
          //开启循环模式
          loop: true,
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            //分页器类型
            type: "bullets",
            //点击分页器，切换轮播
            clickable: true,
          },
          autoplay: {
                delay: 1000,
                //新版本的写法：目前是5版本
                // pauseOnMouseEnter: true,
                //如果设置为true，当切换到最后一个slide时停止自动切换
                // stopOnLastSlide: true,
                //用户操作swiper之后，是否禁止autoplay
                disableOnInteraction: false,
              },
          navigation:{
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev"
          }
  })})
    }
   }
}

}
</script>

<style>

</style>