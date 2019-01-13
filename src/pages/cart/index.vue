<template>
  <div class="cart">
    <div class="cart-num" v-if="goods">
    <!-- 地址 -->
    <div class="site" v-if="site.usename" @click="headlesite">
      <div class="site-name">
        <div>收货人: {{site.usename}}</div>
         <div class="rigth">
           <span>{{site.phone}}</span>
           <i class="iconfont icon-jiantou"></i>
         </div> 
      </div>
      <div class="site-sh">
        <div>
          收货地址:
        </div>
        <span>
        {{site.usesite}}
        </span>
      </div>
    </div>
    <!-- 获取收货地址 -->
    <div class="gain" v-else @click="headlesite">
        <span>新增收货地址</span>
        <i class="iconfont icon-jiantou"></i>
    </div>
    <!-- 商品 -->
    <div class="goods">
      <div class="title">
        <span class="iconfont icon-iconzhengli-">斯品生活馆</span>
      </div>
      <!-- 列表 -->
      <!-- 对象的循环用key -->
      <div class="goods-list" v-for="(item,key) in goods" :key="key">
        <div class="goods-img">
          <div class="icon" @click="headlexuanze(key)">
            <!-- 切换状态 -->
             <i :class="item.state? 'iconfont icon-xuanze':'iconfont icon-xuanze1'" ></i>
          </div>
          <img :src="item.goods_small_logo" 
          class="imgs" mode="aspectFill">
        </div>
        <div class="goods-rigth">
          <div class="goods-txt">
           {{item.goods_name}}
          </div>
          <div class="goods-button">
            <span class="num">¥{{item.goods_price}}</span>
            <div class="total">
              <!-- 减 -->
              <i class="iconfont icon-jian" @click="headlejian(key)"></i>
              <div>{{item.num}}</div>
              <!-- 加 -->
              <i class="iconfont icon-jia" @click="headlejia(key)"></i>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <!-- 底部栏 -->
    <div class="all">
      <div class="left">
        <!-- 全选按钮 -->
         <div class="all-icon" @click="headleqx">
            <i :class="checkAll ? 'iconfont icon-xuanze':'iconfont icon-xuanze1'" ></i>
          </div>
          <div class="qx">全选</div>
      </div>
      <div class="center">
        <div class="heji">
          合计:
          <span>¥{{Alltotal}}</span>
        </div>
        <div class="yunfei">包含运费</div>
      </div>
      <div class="right">
        结算({{Addnum}})
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
  data () {
    return {
      site:{
        usename:"",
        phone:'',
        usesite:""
      },
      goods:{}//本地储存的对象
    }
  },
// 页面显示/切入前台时触发
  onShow(){
    // 从本地获取数据
  this.goods = wx.getStorageSync('goods')
    console.log(this.goods)
  },
  computed: {
    // 总价格
    Alltotal(){
      let price = 0
      // forEach/map是循环数组, Object.keys是将对象的key循环出来以数组的形式
      Object.keys(this.goods).map(v => {
        // 读取出来的是字符串,用+转成数字
        // 判断状态为true才计算
        if(this.goods[v].state){
          price += + this.goods[v].goods_price *this.goods[v].num;
        }
      })
      return price
    },
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
    },
    // 全选
    checkAll(){ 
    let state = true
     Object.keys(this.goods).map(v=>{
       if(!this.goods[v].state){
        state = false
       }
     })
     return state
    }
  },
  methods: {
    // 新增用户地址
    headlesite(){
      // 调用收货地址API
      wx.chooseAddress({
        success:res=> {
          this.site={
            usename:res.userName,
            phone :res.telNumber,
            usesite:`${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
          }
          console.log(this.site)
        }
      })
    },
    // 切换状态
    headlexuanze(key){
      this.goods[key].state = !this.goods[key].state
    },
    // 全选
    headleqx(){
      // 找出所有的单选进行赋值
      let state = !this.checkAll
      
      Object.keys(this.goods).forEach(v=>{
         this.goods[v].state = state
      })
    },
    // 减
    headlejian(key){
       if( this.goods[key].num ===1){
         wx.showModal({
          title: '提示',
          content: '是否确定删除?',
          success:res=> {
            if (res.confirm) {
              delete this.goods[key]
              wx.setStorageSync('goods', this.goods)
              this.goods = wx.getStorageSync('goods')
            }
          }
        })
       }else{
         this.goods[key].num -=1
         wx.setStorageSync('goods', this.goods)
        this.goods = wx.getStorageSync('goods')
       }
    },
    // 加
    headlejia(key){
       this.goods[key].num +=1
        wx.setStorageSync('goods', this.goods)
        this.goods = wx.getStorageSync('goods')
    }
  }
}
</script>

<style lang="sass" scoped>
   @import './style.scss';
</style>

