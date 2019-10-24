<!--  -->
<template>
  <div class="zhuanti">
    <div class="div1a">
      <div class="div">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <div class="cen_t">专栏详情</div>
      <div></div>
    </div>
    <div class="zhuanti1">
      <h1 v-html="list.title"></h1>
      <hr />
      <img :src="list.pic" alt />
      <div v-html="list.content"></div>
    </div>
     <h1>猜你喜欢</h1>
    <SP></SP>
  </div>
</template>

<script>
import SP from './shangpin'
import axios from "axios";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {},
  components: {
      SP
  },
  computed: {},
  created() {
    let n = this.$route.params.id;

    axios
      .get("https://api.it120.cc/small4/cms/news/detail/?id=" + n)
      .then(d => {
        console.log(d.data.data);
        this.list = d.data.data;
      });
  }
};
</script>
<style  scoped>
@import url("../../assets/css/zhuanlan/zhuanlan.css");
@import url("../../assets/css/zhuanti/zhuanti.css");
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
h1{
    text-align: center
}
</style>