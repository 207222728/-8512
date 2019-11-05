<!--  -->
<template>
  <div class="Nav">
    <div class="Nav4_top">
      <div class="div1">
        <i class="el-icon-user"></i>
      </div>
      <div class="div2">
        <p>
          <router-link to="/zhuc" v-show="!this.$store.state.done2" >点击登录</router-link>
        </p>
        <p v-show="this.$store.state.done2">
          {{this.$store.state.done2?(this.$store.state.xin.base.nick):""}}
          <span @click="tui">退出登录</span>
        </p>
        <p class="p">积分：
             {{this.$store.state.done2?(this.$store.state.xin.base.source):"999"}}
          </p>
      </div>
    </div>
    <div class="tongzhi" style="color:red;font-size:10px;">	新上线更稳定的付费快递查询接口<i style="color:#000;font-size:16px;" class="el-icon-s-comment"></i>
</div>
    <div class="dingdan">
      <span>
        <router-link to="/Orderdetails">
          <i class="el-icon-s-order"></i>我的订单
        </router-link>
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
        <p><router-link to="/pinglun">待评价
          </router-link></p>
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
      list: [],
      xin: []
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
        this.$router.push({ path: "/address" });
      } else {
        alert("请登录您的账号");
      }
    }
  },
  components: {
    Bottom
  },
  computed: {},
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    if (list) {
      this.$store.state.token = list;
      this.$store.state.done2 = true
    }else{
       this.$store.state.done2 = false
    }
    // console.log(this.$store.state.done2)
  },
  mounted() {
    let list = stor.get("token");
    list = JSON.parse(list);
    if (list) {
      // 个人信息
      _http.geren(list.token).then(d => {
         this.$store.state.xin = d.data.data;
        //  console.log(this.$store.state.xin)
      });
      this.$store.state.token = list;
       this.$store.state.done2 = true
    }else{
      this.$store.state.done2 = false
    }
    // console.log(this.$store.state.xin)
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