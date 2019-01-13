<template>
  <div>
    <div class="cart-num" v-if="goods">
    <!-- 地址 -->
    <div class="site"  @click="headlesite">
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
    <div class="goods">
      <div class="title">
        <span class="iconfont icon-iconzhengli-">斯品生活馆</span>
      </div>
      <!-- 列表 -->
      <!-- 对象的循环用key -->
      <div class="goods-list"
      v-if="item.state==true" 
      v-for="(item,key) in goods" 
      :key="key">
        <div class="goods-img">
          <div class="icon">
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
    </div>
    <!-- 总价 -->
    <div class="rem">总计:¥{{Alltotal}}</div>
    <!-- 按钮 -->
    <div class="bnt">
    <button type="warn" v-if="token" @click="headlezhifu">支付</button>
    <!-- open-type="getUserInfo"	用户获取用户信息和wx.getUserLail返回一样 -->
    <!-- 点击登录要用 @getuserinfo-->
    <button 
    type="primary" 
    open-type="getUserInfo"
    lang="zh_CN"	
    v-else @getuserinfo="headlelogin">登录</button>
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
      goods:{},//本地储存的对象
      token:wx.getStorageSync('token')||""
    }
  },
  onShow(){
      // 从本地获取数据
    this.goods = wx.getStorageSync('goods')
    this.site = wx.getStorageSync('site')
    this.token = wx.getStorageSync('token')
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
    }
  },
  methods: {
    // 点击登录
    headlelogin(e){
      // 需要的登录信息在e.mp里
      const {detail} = e.mp;
      wx.login({
        success:res=> {
          // console.log(res)
          if (res.code) {
            const data = {
              code: res.code,
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature,
            }

            // 请求登录接口
            request.post("https://itjustfun.cn/api/public/v1/users/wxlogin", data).then(res => {
              // 解构出token
              const {token} = res.data.data;
              // 把token保存到本地
                wx.setStorageSync("token", token);
                this.token = wx.getStorageSync('token')
                console.log(this.isArr)
                // // 提示
                wx.showToast({
                    title: '登录成功',
                    icon: 'success'
                  })

              // 返回上一页
              // wx.navigateBack({
              //   delta: 1
              // })
            })
          }
        }
      });
    },
    headlezhifu(){
       // // 提示
        wx.showToast({
            title: '暂时不开放',
            icon: 'success'
          })
    }
  }
}
</script>

<style lang="scss" scoped>
   @import './style.scss';
</style>
