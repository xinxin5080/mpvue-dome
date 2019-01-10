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
        <a :href="'/pages/goods_detail/main?goods_id='+ item.goods_id">
        <div class="left">
          <img :src="item.goods_big_logo" mode="aspectFill">
        </div>
        <div class="right">
          <div class="right-tex">
            {{item.goods_name}}
          </div>
          <div class="right-null">
            <span>¥</span>{{item.goods_price}}
          </div>
        </div>
        </a>
      </div>
    </div>
    <!-- 底部 -->
    <div class="foot-txt" v-if="!istxt">
      没有更多了
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
      goodslist:{},
      isloading:false, //是否加载
      istxt:true //底部文字
    }
  },
  methods: {
    headletitle(index){
      this.pitch = index
    },
    init(){
      // 加载中不执行请求 this.isloading =true
      // 最后一页不在执行请 this.istxt = flase
      if(this.isloading || !this.istxt){
        return
      }
      // 还没请求数据是加载中
      this.isloading = true
      wx.showLoading({
        title: '加载中',
      })
      request.get("https://itjustfun.cn/api/public/v1/goods/search",{
        query:this.key,
        pagenum:this.pagenum
      }
      ).then(res=>{
        const {goods} = res.data.data
        console.log(goods)
        // 将新旧数组相加
        // this.goodslist = this.goodslist.concat(goods);
        this.goodslist =[...this.goodslist,...goods];
        // 页数+1
        this.pagenum+=1;
        // 执行完请求,不加载
        this.isloading = false;
         wx.hideLoading()
        // 判断
        if(goods.length<20){
          // 没有下页了
          this.istxt = false
        }
      })

    }
  },
  // 页面加载时触发,通过参数query可获取url携带的参数
  onLoad(query){
    const {key} = query
    this.key = key
    //请求数据
     this.init()
  },
  //页面触底时候触发
  onReachBottom(){
    this.init()
  },
   // 页面卸载时候触发
  onUnload(){
    // 合并对象
    // this.$options.data()获取当前页面组件最初的data
    Object.assign(this, this.$options.data())
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
