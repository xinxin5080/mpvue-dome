<template>
  <div class="cart">
    <div class="cart-num" v-if="1">
    <!-- 地址 -->
    <div class="site">
      <div class="site-name">
        <div>收货人:王</div>
         <div class="rigth">
           <span>13222223344</span>
           <i class="iconfont icon-jiantou"></i>
         </div>
      </div>
      <div class="site-sh">
        收货地址:xxxxxxxx
      </div>
    </div>
    <!-- 商品 -->
    <div class="goods">
      <div class="title">
        <span class="iconfont icon-iconzhengli-">斯品生活馆</span>
      </div>
      <!-- 列表 -->
      <div class="goods-list" v-for="(item,index) in [1,1,1,1,1,1]" :key="index">
        <div class="goods-img">
          <div class="icon">
            <i class="iconfont icon-xuanze" v-if="true"></i>
            <i class="iconfont icon-xuanze1" v-else></i>
          </div>
          <img src="https://img.alicdn.com/imgextra/i1/2992847936/TB2hhOTajrguuRjy0FeXXXcbFXa_!!2992847936-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp" 
          class="imgs">
        </div>
        <div class="goods-rigth">
          <div class="goods-txt">
            婴儿推车 新款男鞋 沙发 保温杯 灯笼灯 时尚休闲裤 定制窗帘 女内裤 地毯 厨房置物架 奖杯 办公桌 吸顶灯
          </div>
          <div class="goods-button">
            <span class="num">¥233</span>
            <div class="total">
              <i class="iconfont icon-jian"></i>
              <div>3</div>
              <i class="iconfont icon-jia"></i>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <!-- 底部栏 -->
    <div class="all">
      <div class="left">
         <div class="all-icon">
            <i class="iconfont icon-xuanze" v-if="true"></i>
            <i class="iconfont icon-xuanze1" v-else></i>
          </div>
          <div class="qx">全选</div>
      </div>
      <div class="center">
        <div class="heji">
          合计:
          <span>¥1222</span>
        </div>
        <div class="yunfei">包含运费</div>
      </div>
      <div class="right">
        结算(3)
      </div>
    </div>
  </div>
  <div class="cart-no" v-else>
    <div class="shop">
      <div class="top">
      <img src="../../../static/images/cart_empty@2x.png" alt="" class="img">
      </div>
      <span>你还没添加任何商品</span>
    </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
   @import './style.scss';
</style>

