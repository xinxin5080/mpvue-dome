<template>
  <div>
    <!-- 搜索 -->
    <div class="box">
      <div class="seek">
        <div class="seek-input">
          <icon type="search"></icon>
          <input  
          placeholder="请输入你想要的商品" 
          v-model="inputdata"
          @confirm="headleconfirm"
          @input="headleinput"
          >
        </div>
        <buttom class="bnt" v-if="inputdata" @click="headleoff">取消</buttom>
      </div>
      <!-- 建议搜索列表 -->
      <div class="show" v-if="inputdata" @click="headleshow">
        <a :href="'/pages/goods_detail/main?goods_id='+ item.goods_id"
        class="show-list" 
        v-for="(item,index) in list" :key="index">
           {{item.goods_name}}
        </a>
      </div>
    </div>
    <!-- 历史搜索 -->
    <div class="history">
      <div class="history-txt">
        <span>历史搜索</span>
        <icon type="clear" class="icon" @click="headleicon"></icon>
      </div>
      <div class="history-box">
        <!-- 传递要查询的文字,跳转到商品列表页 -->
      <a :href="'/pages/search/main?key='+item" class="history-list" v-for="(item,index) in history" :key="index">
        {{item}}
      </a>
      
      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request.js'
export default {
  data () {
    return {
      inputdata:"",// 输入框内容
      history:wx.getStorageSync('key') || [],//历史记录内容
      list:{},//搜索建议数据
      isloading:false //是否加载
    }
  },
  methods: {
    // 封装数据操作
    init(){
       // 将数据追加到前面
         this.history.unshift(this.inputdata)
        //  数组去重
         this.history = new Set(this.history)
        //  解构,因为unshift无法使用set类型
        this.history =[...(this.history)]
        // 将设置储存在本地
         wx.setStorageSync('key', this.history)
    },
    // 点击取消
    headleoff(){
      // 清空
      this.inputdata=""
      console.log(123)
    },
    // confirm事件,确定搜索
    headleconfirm(){
       this.init()
    },
    // 点击清空历史纪录
    headleicon(){
       wx.removeStorageSync('key')
       this.history=[]
    },
    // input事件,失去焦点发请求
    headleinput(){
      // 判断是否加载
      if(this.isloading){
        return
      }
      // 进去设置为加载
      this.isloading = true

       request.get("https://itjustfun.cn/api/public/v1/goods/search",{
         query:this.inputdata
      }).then(res=>{
        console.log(res)
        const {goods} = res.data.data
        this.list = goods
        // 数据请求回来设置为不加载
         this.isloading = false
      })
    },
    // 点击建议搜索列表,将输入框的内容保存在历史表
    headleshow(){
     this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss'
</style>

