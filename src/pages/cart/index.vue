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
      <div class="right" @click="Settlement">
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
import request from "../../utils/request.js";
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
  // 将地址保存在本地
   wx.setStorageSync('site', this.site)
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
       wx.setStorageSync('goods', this.goods)
    },
    // 全选
    headleqx(){
      // 找出所有的单选进行赋值
      let state = !this.checkAll
      
      Object.keys(this.goods).forEach(v=>{
         this.goods[v].state = state
      })
       wx.setStorageSync('goods', this.goods)
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
    },
    // 结算
    Settlement(){
      // 登录接口需要的信息
      let login ={
        order_price:this.Addnum,
        consignee_addr:this.site.usesite,
        goods:[]
      }
            // 通过map循环返回新的数组，数组的元素是由return返回的
      Object.keys(this.goods).forEach(v => {

        if( this.goods[v].state){
          // 只选择状态选中的商品
          login.goods.push({
            goods_id: this.goods[v].goods_id,
            goods_number: this.goods[v].num,
            goods_price: +this.goods[v].goods_price
          });
        }
      })
      // 调用创建订单接口,在请求的时候进行拦截,判断有无token
      request.auth("https://itjustfun.cn/api/public/v1/my/orders/create",login).then(res=>{
        console.log(res)
      //  提示
        wx.showToast({
            title: '支付页面',
            icon: 'success'
          })
          // 跳转
            wx.navigateTo({
          url: "/pages/enter_order/main"
      });
      })
    }
  }
}
</script>

<style lang="sass" scoped>
   @import './style.scss';
</style>

