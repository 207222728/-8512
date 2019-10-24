<!--  -->
<template>
  <div class="top">
    <div class="div1a">
      <div class="div">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <div class="cen_t">砍价列表</div>
      <div></div>
    </div>
    <ul class="Nav1_kanjianav">
      <li class="li1" v-for="(v,i) in this.$store.state.list3" :key="i">
        <router-link :to="{path:'/user2',query:{id:v.id}}">
          <div class="div1">
            <img class="img" :src="v.pic" alt />
          </div>
          <div class="div2">
            <p v-html="v.name"></p>
            <p class="xinxi">{{v.characteristic}}</p>
            <div class="div1_price">
              <div>
                <p style="color:red">￥{{v.minPrice}}.00</p>
                <p>低价</p>
              </div>
              <div>
                <p>￥{{v.originalPrice}}.00</p>
                <p>原价</p>
              </div>
              <div>
                <p>￥{{v.kanjiaPrice}}.00</p>
                <p>限量</p>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {},
  created() {}
};
</script>
<style  scoped>
@import url("../../assets/css/Nav1/Nav1.css");

.top {
  position: absolute;
}
.div1a {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  line-height: 50px;
}
.Nav1_kanjianav {
  margin-top: 50px;
}
.Nav1_kanjianav a {
  width: 100%;
  display: flex;
}
</style>