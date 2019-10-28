<!--  -->
<template>
  <div class="Nav">
    <div class="Nav3_top">
      <div>
        <span v-show="this.$store.state.gouwu.length" @click="done=!done">{{done?"编辑":"完成"}}</span>
      </div>
      <p>购物车</p>
      <div></div>
    </div>
    <div class="Nav3_nav">
      <div v-show="!this.$store.state.gouwu.length">
        <img src="../../static/3.png" width="100px" />
      </div>
      <div id="gouw" v-show="this.$store.state.gouwu.length">
        <li v-for="(item,index) in this.$store.state.gouwu" :key="i2">
          <img :src="item.basicInfo.pic" alt />
          <!-- 商品名规格 -->
          <div style="width:50%;font-size:10px">
            <p v-html="item.basicInfo.name"></p>
            <span v-for="(v,i2) in item.properties" :key="i2">
              <span
                v-for="(item1,i1) in v.childsCurGoods"
                v-show="item1.remark"
                :key="i1"
              >{{v.name}}：{{item1.name}}</span>
            </span>
            <!-- 价格 -->
            <div style="width:100%">
              <p style="color:red">
                ￥{{item.basicInfo.minPrice}}
                <span v-show="item.basicInfo.minPrice>=1">.00</span>
              </p>
              <!-- 数量 -->
              <button @click="jian(item)">-</button>
              {{item.basicInfo.commission+1}}
              <button @click="jia(item)">+</button>
            </div>
          </div>
          <button @click="del(index)">删除</button>
        </li>
      </div>
      <h1>猜你喜欢</h1>
      <Canvas></Canvas>
    </div>
    <!-- 编辑删除或下单 -->
    <div class="bianji" v-show="this.$store.state.gouwu.length">
      <p>
        <input type="checkbox" />
        全选
      </p>
      <div>
        <p style="color:red">合计：￥{{zong()}}.00</p>
        <div>
          <p v-show="done">下单</p>
          <p v-show="!done">删除</p>
        </div>
      </div>
    </div>
    <!-- 下面路由跳转 -->
    <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from "./nav2/Bottom";
import Canvas from "./nav3/canvas";
import axios from "axios";
export default {
  data() {
    return {
      done: false
    };
  },
  methods: {
    del(i) {
      this.$store.state.gouwu.splice(i, 1);
    },
    // 数量+
    jia(v) {
      v.basicInfo.commission++;
    },
    // 数量-
    jian(v) {
      if (v.basicInfo.commission > 0) {
        v.basicInfo.commission--;
      }
    },
    //总价
    zong() {
      let n = 0;
      this.$store.state.gouwu.forEach(v => {
        n += (v.basicInfo.commission+1 )* v.basicInfo.minPrice;
      });
      return n;
    }
  },
  components: {
    Canvas,
    Bottom
  },
  computed: {
    list() {
      return this.$store.state.gouwu;
    }
  },
  created() {},
  computed: {},
  watch: {
    $route() {
      this.$store.state.gouwu;
    }
  }
};
</script>
<style  scoped>
@import url("../assets/css/Nav3/Nav3.css");
#gouw {
  width: 100%;
  padding: 0;
}
</style>