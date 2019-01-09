<template>
  <div>
    <!-- 搜索 -->
    <a href="" class="a-seek">
      <div class="seek">
        <icon type="search"/>
        <span>搜索</span>
      </div>
    </a>
    <!-- 标题  -->
    <div class="title">
      <div class="title-txt" v-for="(item,index) in ['综合','销量','价格']" :key="index" @click="headletitle(index)" :class="{active: pitch===index}">
        {{item}}
      </div>
    </div>
    <!-- 列表 -->
    <div class="box">
      <div class="list" v-for="(item,index) in goodslist" :key="index">
        <div class="left">
          <img :src="item.goods_big_logo" mode="aspectFill">
        </div>
        <div class="right">
          <div class="right-tex">
            {{item.goods_name}}
          </div>
          <div class="right-null">
            <span>$</span>{{item.goods_price}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request.js'
export default {
  data () {
    return {
      pitch:0,
      pagenum:1,
      goodslist:{}
    }
  },
  methods: {
    headletitle(index){
      this.pitch = index
    },
    init(){
      request.get("https://itjustfun.cn/api/public/v1/goods/search",{
        query:this.key,
        pagenum:this.pagenum
      }
      ).then(res=>{
        const {goods} = res.data.data
        console.log(goods)
        this.goodslist = goods
      })
    }
  },
  mounted () {
    this.init()
  },
  // 页面加载时触发,通过参数query可获取url携带的参数
  onLoad(query){
    const {key} = query
    this.key = key
    console.log(key)
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
