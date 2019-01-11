<template>
  <div class="index">
    <!-- 搜索 -->
     <seek></seek>
    <!-- 轮播图 -->
    <swiper class="swiper"
  indicator-dots
  autoplay
  interval="3000"
  duration="500"
>
  <block v-for="(item,index) in imglist" :key="index">
    <swiper-item>
      <image :src="item.image_src" class="slide-image" mode="aspectFill"/>
    </swiper-item>
  </block>
</swiper>
 <!-- 标签 -->
<div class="classify">
  <a :href="item.Newurl" 
  v-for="(item,index) in classify" 
  :key="index" 
  :open-type="item.type"
  >
  <img :src="item.image_src">
  </a>
</div>
<!-- 楼层 -->
    <div class="main" v-for="(item,index) in crty" :key="index">
      <div class="mian-content ">
        <div class="mian-top">
          <img :src="item.floor_title.image_src" mode="aspectFill">
        </div>
        <div class="mian-button">
          <div class="mian-left">
            <img :src="item.product_list[0].image_src" alt="">
          </div>
          <div class="mian-right" >
            <img 
            v-for="(subitem,subindex) in item.product_list" :key="subindex"
            :src="subitem.image_src"
            v-if="subindex!==0"
              mode="aspectFill">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "../../utils/request.js";
  import seek from "../../components/seek";
  export default {
    components: {
      seek
    },
    data() {
      return {
        imglist: {},
        classify: [],
        crty: {}
      };
    },
    methods: {
      // async  await解决异步问题
      async getData() {
        // try catch捕获程序代码错误
        try {
          wx.showLoading({
            title: "加载中"
          });

          const res = await request(
            "https://itjustfun.cn/api/public/v1/home/swiperdata"
          );
          const { data } = res.data;
          this.imglist = data;
        } catch (error) {
          console.log(error);
        }
        try {
          const res = await request(
            "https://itjustfun.cn/api/public/v1/home/catitems"
          );
          const { data } = res.data;
          data[0].Newurl = "/pages/category/main";
          data[0].type = "switchTab";
          data[1].Newurl = "/pages/search/main?key=秒杀";
          data[1].type = "navigate";
          data[2].Newurl = "/pages/search/main?key=超市";
          data[2].type = "navigate";
          data[3].Newurl = "/pages/search/main?key=母婴";
          data[3].type = "navigate";
          this.classify = data;
        } catch (error) {
          console.log(error);
        }

        try {
          const res = await request(
            "https://www.zhengzhicheng.cn/api/public/v1/home/floordata"
          );
          const { message } = res.data;
          // message[0].query = "/pages/search/main?key=服装";
          // message[1].query = "/pages/search/main?key=热";
          // message[2].query = "/pages/search/main?key=爆款";
          console.log(message);
          this.crty = message;
          wx.hideLoading();
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
      this.getData();
      //     wx.request({url:'https://itjustfun.cn/api/public/v1/home/swiperdata',
      //      success:(res=>{
      //        const {data} = res.data
      //        this.imglist = data
      //      })
      // })
    }
  };
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>

