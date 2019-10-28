<!--  -->
<template>
  <div class>
    <router-link to="/">返回首页</router-link>123
  </div>
</template>

<script>
import HTTP from "../../services/product-service.js";
const _http = new HTTP();
import stor from "../../model/storage.js";
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {},
  created() {
    let n = stor.get("token");
    n = JSON.parse(n);
    let id = this.$route.query.id;
    let obj = {
      n: n,
      id: id
    };
    console.log(this.$route);
    //发起砍价
    _http.Bargain(obj).then(d => {
      //   console.log(d);
    });
    //我的砍价
    _http.Bargain1(obj).then(d => {
      //   console.log(d);
    });
    //获取砍价详情
    _http.Bargain2(obj).then(d => {
      //   console.log(d);
    });
    //帮别人砍价
    _http.Bargain3(obj).then(d => {
      //   console.log(d);
    });
    //砍一刀
    _http.Bargain4(obj).then(d => {
      //   console.log(d);
    });
  }
};
</script>
<style  scoped>
</style>