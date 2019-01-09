<template>
  <div class="category">
    <!-- 搜索 -->
    <seek></seek>
    <!-- list -->
    <div class="list">
      <!-- 左 -->
      <div class="list-left">
        <ul>
          <li :class="{active: index === pitch}" v-for="(item,index) in catlist" :key="index" @click="headletex(index)">{{item.cat_name}}</li>
        </ul>
      </div>
      <!-- 右 -->
      <div class="list-box">
      <div class="list-rigth" v-for="(item,index) in rigthlist" :key="index">
        <div class="rigth-title">{{item.cat_name}}</div>
        <div class="rigth-imgs">
            <div class="rigth-data" v-for="(useitem,useindex) in item.children" :key="useindex">
          <!-- <img :src="`https://itjustfun.cn/` + useitem.cat_icon" mode="aspectFill"> -->
            <img :src="'https://itjustfun.cn/' + useitem.cat_icon" mode="aspectFill">
          <p>{{useitem.cat_name}}</p>
        </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "../../utils/request.js";
  import seek from "../../components/seek";
  export default {
    components: {
      seek
    },
    data() {
      return {
        pitch: 0,
        catlist: [],
        rigthlist: []
      };
    },
    mounted() {
      this.getData();
    },
    methods: {
      headletex(index) {
        // 通过判断当前行索引index与选中的li(赋值)是否相等来判断
        // 给当前li动态添加class
        this.pitch = index;
        // 改变右侧
        this.rigthlist =this.catlist[index].children;
      },
      getData() {
        request("https://itjustfun.cn/api/public/v1/categories").then(res => {
          const { data } = res.data;
          this.catlist = data;
          this.rigthlist = data[this.pitch].children;
        });
      }
    }
  };
</script>

<style lang="sass" scoped>
   @import './style.scss';
</style>

