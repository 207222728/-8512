<!--  -->
<template>
  <div class="Centent_nav1">
    <div class="div">
      <router-link to="/">
        <i class="el-icon-arrow-left"></i>
      </router-link>
    </div>
    <div class="Centent_nav1_nav">
      <el-carousel :interval="5000">
        <el-carousel-item v-for="(item,index) in list.pics" :key="index">
          <img :src="item.pic" alt />
        </el-carousel-item>
      </el-carousel>
      <div class="details_t" v-html="list.basicInfo.name"></div>
      <p class="details_a" style="font-size:10px;color:#b2b2b2">{{list.basicInfo.characteristic}}</p>
      <div class="details_price">
        <div>
          <p style="color:red;font-weight:900;font-size:16px">低价￥{{list.basicInfo.minPrice}}.00</p>
          <p class="details_price_c">原价￥{{list.basicInfo.originalPrice}}</p>
        </div>
        <div class="details_price_c">库存{{list.basicInfo.kanjiaPrice}}</div>
      </div>
      <div class="details_details">
        <div>商品介绍</div>
        <div>商品评价</div>
      </div>
      <div class="details_details1" v-html="list.content"></div>
    </div>
    <div class="details_bottom bottom_A" style="text-align:center">
      <span>立即发起砍价，最低可砍到 1 元</span>
    </div>
  </div>
</template>

<script>
import HTTP from "../../services/product-service.js";
const _http = new HTTP();
import axios from "axios";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {},
  components: {},
  computed: {},
  created() {
    let n = this.$route.query.id;
    let a = this.$route.query.userid;
    console.log(n);
    axios
      .get("https://api.it120.cc/small4/shop/goods/detail?id=" + n)
      .then(d => {
        this.list = d.data.data;
      });
  },
  watch: {
    $route() {
      let n = this.$route.query.id;
      let a = this.$route.query.userid;
      console.log(n);
      axios
        .get("https://api.it120.cc/small4/shop/goods/detail?id=" + n)
        .then(d => {
          this.list = d.data.data;
        });
    }
  }
};
</script>
<style  >
@import url("../../assets/css/centent_nav1/centent_nav_top.css");

.bottom_A {
  width: 100%;
  background: red;
}
.details_bottom span {
  color: #fff;
  width: 100%;
  background: red;
  line-height: 50px;
  display: block;
  text-align: center;
}
.details_details1 >>> p {
  width: 100% !important;
  overflow: auto;
  z-index: 99;
}
.details_details1 {
  overflow: hidden;
}
.details_details1 img {
  width: 100% !important;
  height: 100% !important;
  z-index: 99;
}
</style>