<template>
  <div>
    <!-- 轮播图 -->
    <swiper indicator-dots>
      <block v-for="(item, index) in goodslist.pics" :key="index">
        <swiper-item>
          <image :src="item.pics_big_url" class="slide-image" mode="aspectFill"/>
        </swiper-item>
      </block>
    </swiper>

    <!-- 商品信息 -->
    <div class="goods-info">

      <div class="goods-price">
        ￥ {{goodslist.goods_price}}
      </div>

      <div class="goods-title">
        <h4>
          {{goodslist.goods_name}}
        </h4>
        <div class="goods-star">
          <i class="iconfont icon-star"></i>
          <div>收藏</div>
        </div>
      </div>

    </div>


    <!-- 商品详情 -->
    <div class="goods-detail">
      <div class="goods-detail-title">
        商品详情
      </div>

      <!-- 富文本 -->
      <div v-html="goodslist.goods_introduce">
        
      </div>
    </div>
    <!-- 底部 -->
    <div class="foot">
      <div class="foot-txt">
        <div>
          <i class="iconfont icon-customer"></i>
          <span>联系客服</span>
          <!-- 客服按钮 -->
          <button open-type="contact" class="huihua"></button>
          </div>
          <!-- 跳转到购物车,跳到tab栏要加open-type="switchTab"  -->
        <navigator url="/pages/cart/main" open-type="switchTab" class="nav">
            <i class="iconfont icon-qicheqianlian-"></i>
          <div class="shopping">
            <div>购物车</div>
            <span>({{Addnum}})</span>
            </div>
        </navigator>
      </div>
      <div class="foot-bnt">
        <span @click="headleAddGoods">加入购物车</span>
        <navigator class="add" url="/pages/cart/main" open-type="switchTab">立即购买</navigator>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "../../utils/request.js";
export default {
  data () {
    return {
      goods_id:'',
      goodslist:{},
      goods:{}//本地储存的对象
    }
  },
   onShow(){
    // 从本地获取数据
  this.goods = wx.getStorageSync('goods')
  },
  computed:{
     // 总数量
    Addnum(){
      let num = 0
      Object.keys(this.goods).map(v=>{
        // 判断状态为true才计算
        if(this.goods[v].state){
          num += this.goods[v].num
        }
      })
      return num
    }
  },
  methods: {
    init(){
      request.get("https://itjustfun.cn/api/public/v1/goods/detail",{
        goods_id:this.goods_id
      })
      .then(res=>{
        const {data} = res.data
        // 给价格添加小数点
        data.goods_price=Number(data.goods_price).toFixed(2)
        this.goodslist = data
        // console.log(data)
      })
    },
    // 将商品信息以对象的形式储存在本地
    headleAddGoods(){
      // 从本地获取数据
        let Data =wx.getStorageSync('goods')||{}
        // 判断有无相同的项
       let is = this.goodslist.goods_id
       Object.keys(Data).map(v=>{
         if(v==is){
          this.goods[v].num +=1
          console.log(this.goods)
         }
       })
        // 通过中括号的形式读取对象的key
        Data[this.goodslist.goods_id] = this.goodslist
        // 数量=1
        this.goodslist.num=1
        // 状态
        this.goodslist.state=true
        // console.log(goodsList)
        // 将对象储存在本地储存
         wx.setStorageSync('goods', Data)
        //  提示
         wx.showToast({
            title: '加入购物车成功',
            icon: 'success'
          })
       this.goods = wx.getStorageSync('goods')
       
    }
  },
  // 页面加载时触发,通过参数query可获取url携带的参数
  onLoad(query){
    // console.log(query)
    this.goods_id = query.goods_id
    this.init()
  }
}
</script>

<style scoped lang='scss'>
@import "style.scss";
</style>
