<template>
    <a href="/pages/seek/main" class="a-seek">
      <div class="seek">
        <icon type="search"/>
        <span>搜索</span>
      </div>
    </a>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
 .a-seek{
    width: 100%;
    background-color: #EB4450;
    height: 80rpx;
    display: flex;
    justify-content: center;
    position: fixed;
    .seek{
      width: 98%;
      height:60rpx;
      background-color: #fff;
      border-radius:2px;
      display: flex;
      justify-content: center;
      align-items: center;
      icon{
        color: #999;
        margin-right: 10rpx;
      };
      span{
         color: #999;
         font-size: 16px;
      }
    }
  }
</style>

