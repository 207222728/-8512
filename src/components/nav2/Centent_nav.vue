<!--  -->
<template>
  <div class="centent_nav">
    <div class="centent_nav_top">
      <div>
        <router-link to="/nav2">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <div>分类商品</div>
      <div></div>
    </div>
    <div class="centent_nav_cen" v-show="!filt().length">
      <img src="../../../static/5.png" alt />
    </div>
    <div class="centent_nav_cent" v-show="filt().length">
      <li v-for="(v,i) in filt()" :key="i">
        <router-link :to="{path:'/user1',query:{id:v.id,userid:v.categoryId}}">
          <img :src="v.pic" />
          <p v-html="v.name">{{v.name}}</p>
          <div>
            <p class="price" style="color:red,font-weight:900">
              ￥{{v.minPrice}}
              <span v-show="v.minPrice>=1">.00</span>
            </p>
            <p class="zi">已售{{v.numberSells}}</p>
          </div>
        </router-link>
      </li>
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
  methods: {
    filt(){
      return this.list.filter(v=>{
        return v.categoryId == this.$route.params.id
      })
    }
  },
  components: {},
  computed: {},
  created() {
    let n = this.$route.params.id;
    // console.log(this.$route.params.id);
    // _http.liebiao().then(d => {
    //   d.data.data.forEach(v => {
    //     if (v.categoryId == n) {
    //       this.list.push(v);
    //     }
    //   });
    // });
    axios.get("https://api.it120.cc/small4/shop/goods/list").then(d => {
      // console.log(d.data.data)
      this.list=d.data.data
      
    });
  },
  watch: {
    $route(){
      this.list
    }
  }
};
</script>
<style  scoped>
@import url("../../assets/css/centent_nav/centent_nav.css");
</style>