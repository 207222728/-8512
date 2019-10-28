<!--  -->
<template>
  <div class="Nav">
    <div class="Nav4_top">
      <div class="div1">
        <i class="el-icon-user"></i>
      </div>
      <div class="div2">
        <p>
          <router-link to="/zhuc" v-show="this.$store.state.token.length == 0">点击登录</router-link>
        </p>
        <p v-show="this.$store.state.token.length >0">
          123
          <span @click="tui">退出</span>
        </p>
        <p class="p">积分：0</p>
      </div>
    </div>
    <div class="tongzhi">123</div>
    <div class="dingdan">
      <span>
        <i class="el-icon-s-order"></i>我的订单
      </span>
      <span>
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>
    <ul class="xinxi">
      <li>
        <i class="el-icon-s-finance"></i>
        <p>待付款</p>
      </li>
      <li>
        <i class="el-icon-takeaway-box"></i>
        <p>待发货</p>
      </li>
      <li>
        <i class="el-icon-truck"></i>
        <p>待收货</p>
      </li>
      <li>
        <i class="el-icon-s-comment"></i>
        <p>待评价</p>
      </li>
    </ul>
    <div class="bottom1">
      <li>
        <i class="el-icon-coin"></i>
        <p>我的余额</p>
      </li>
      <li>
        <i class="el-icon-discount"></i>
        <p>我的砍价</p>
      </li>
      <li>
        <i class="el-icon-s-ticket"></i>
        <p>我的礼券</p>
      </li>
      <li>
        <i class="el-icon-star-off"></i>
        <p>我的收藏</p>
      </li>
      <li @click="address">
        <router-link to="/zhuc">
          <i class="el-icon-map-location"></i>
          <p>我的地址</p>
        </router-link>
      </li>
      <li>
        <i class="el-icon-service"></i>
        <p>联系客服</p>
      </li>
    </div>
    <p class="p1">清欢严选 from 秦志宾</p>
    <Bottom></Bottom>
  </div>
</template>

<script>
import HTTP from "../services/product-service.js";
const _http = new HTTP();
import stor from "../model/storage.js";
import Bottom from "./nav2/Bottom";
import axios from "axios";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    tui() {
      stor.remove("token");
      location.href = "/nav4";
    },

    address() {
       let list = stor.get("token");
      if (list) {
        this.$router.push({ path: "/region" }); 
      }else{
        alert("请登录您的账号")
      }
    }
  },
  components: {
    Bottom
  },
  computed: {},
  created() {
    let list = stor.get("token");
    if (list) {
      this.$store.state.token = list;
    }
  },
  mounted() {
    let list = stor.get("token");
    if (list) {
      _http.yonghu(list).then(d => {
        console.log(d);
        // this.list1 = d.data.data;
      });
      this.$store.state.token = list;
    }

    //  console.log( this.$store.state.token.length);
  },
  watch: {
    $rouer() {
      let list = stor.get("token");
      if (list) {
        this.$store.state.token = list;
      }
    }
  }
};
</script>
<style  scoped>
@import url("../assets/css/Nav4/Nav4.css");
</style>