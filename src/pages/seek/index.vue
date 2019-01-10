<template>
  <div>
    <!-- 搜索 -->
    <div class="box">
      <div class="seek">
        <div class="seek-input">
          <icon type="search"></icon>
          <input  placeholder="请输入你想要的商品" v-model="inputdata">
        </div>
        <buttom class="bnt" v-if="inputdata">取消</buttom>
      </div>
    </div>
    <!-- 历史搜索 -->
    <div class="history">
      <div class="history-txt">
        <span>历史搜索</span>
        <icon type="clear" class="icon"></icon>
      </div>
      <div class="history-box">
      <div class="history-list" v-for="(item,index) in [1,1,1,1,1,1,1]" :key="index">
        小米
      </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputdata:""
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss'
</style>

