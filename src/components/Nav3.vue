<!--  -->
<template>
  <div class="Nav">
    <div class="Nav3_top">
      <div>
        <span v-show="this.$store.state.gouwu.length" @click="done=!done">{{done?"完成":"编辑"}}</span>
      </div>
      <p>购物车</p>
      <div></div>
    </div>
    <div class="Nav3_nav">
      <div v-show="!this.$store.state.gouwu.length">
        <img src="../../static/3.png" width="100px" />
      </div>
      <div id="gouw" v-show="this.$store.state.gouwu.length">
        <li v-for="(item,index) in this.$store.state.gouwu" :key="index">
          <input type="checkbox" :checked="item.done" @click="xuan(index)" />
          <img :src="item.pic" alt />
          <!-- 商品名规格 -->
          <div style="width:50%;font-size:10px">
            <p v-html="item.name"></p>
            <span v-for="(v,i2) in item.gui" :key="i2">
              <span ref="a" v-for="(item1,i1) in v.childsCurGoods" v-show="item1.remark" :key="i1">
                <!-- {{v.name}}： -->
                {{item1.name}}
              </span>
            </span>
            <!-- 价格 -->
            <div style="width:100%">
              <p style="color:red" ref="b">
                ￥{{item.num1}}
                <span v-show="item.num1>=1">.00</span>
              </p>
              <!-- 数量 -->
              <button @click="jian(item)">-</button>
              <span ref="c">{{item.num}}</span>
              <button @click="jia(item)">+</button>
            </div>
          </div>
          <!-- <button @click="del(index)">删除</button> -->
        </li>
      </div>
      <h1>猜你喜欢</h1>
      <Canvas></Canvas>
    </div>
    <!-- 编辑删除或下单 -->
    <div class="bianji" v-show="this.$store.state.gouwu.length">
      <p>
        <input type="checkbox" @click="quan($event)" />
        全选
      </p>
      <div>
        <p style="color:red">合计：￥{{zong()}}.00</p>
        <div>
          <p v-show="!done" @click="Order">下单</p>
          <p v-show="done" @click="del()">删除</p>
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
import stor from "../model/storage.js";
export default {
  data() {
    return {
      done: false,
      do: false,
      list: []
    };
  },
  methods: {
    //选中商品
    xuan(i) {
      this.$store.state.gouwu[i].done = !this.$store.state.gouwu[i].done;
        stor.set("gouwu", JSON.stringify(this.$store.state.gouwu));
    },
    //全选
    quan(e) {
      this.$store.state.gouwu.forEach(d => {
        if (e.target.checked == true) {
          d.done = true;
        } else {
          d.done = false;
        }
      });
        stor.set("gouwu", JSON.stringify(this.$store.state.gouwu));
    },
    //订单
    Order() {
      let list = stor.get("token");
      list = JSON.parse(list);
      let obj = {
        chi: this.$refs.a.value,
        num: this.$refs.b.value,
        pic: this.$refs.c.value
      };

      if (list) {
        // 到这
        this.$store.state.gouwu.forEach(d => {
          if (d.done == true) {
            this.$router.push({
              path: "/Order",
              query: { token: list, goodsJsonStr: obj }
            });
          }else{
            alert('请选择商品')
            return
          }
        });
      } else {
        alert("请登录");
      }
    },
    //删除
    del() {
      this.list = [];
      this.$store.state.gouwu.forEach((d, i) => {
        if (d.done == true) {
          this.$store.state.gouwu = this.list;
          stor.set("gouwu", JSON.stringify(this.$store.state.gouwu));
        } else {
          this.list.push(d);
          this.$store.state.gouwu = this.list;
          stor.set("gouwu", JSON.stringify(this.$store.state.gouwu));
        }
      });
    },
    // 数量+
    jia(v) {
      v.num++;
    },
    // 数量-
    jian(v) {
      if (v.num > 1) {
        v.num--;
      }
    },
    //总价
    zong() {
      let n = 0;
      this.$store.state.gouwu.forEach(v => {
        n += v.num * v.num1;
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
  created() {
    // console.log(this.$store.state.gouwu);
    let list = stor.get("gouwu");
    list = JSON.parse(list);
    if (list) {
      this.$store.state.gouwu = list;
    }

    axios.get("https://api.it120.cc/small4/shop/goods/kanjia/list").then(d => {
      // console.log(d.data.data.goodsMap)
      let a = d.data.data.goodsMap;
      for (let i in a) {
        this.$store.state.list2.push(a[i]);
        this.$store.state.list3.push(a[i]);
      }
      this.$store.state.list2 = this.$store.state.list2.splice(0, 4);
      // console.log(this.list2);
    });
  },
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