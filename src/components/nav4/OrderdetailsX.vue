<!--  -->
<template>
  <div class="OrderdetailsX">
    <div class="ding">
      <p>
        <router-link to="/Orderdetails">返回</router-link>
      </p>
      <p>订单详情</p>
      <p></p>
    </div>
    <div>{{msg}}</div>
  </div>
</template>

<script>
import HTTP from "../../services/product-service.js";
const _http = new HTTP();
import stor from "../../model/storage.js";
import axios from "axios";
export default {
  data() {
    return {
      msg: ""
    };
  },
  methods: {},
  components: {},
  computed: {},
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    let n = this.$route.query.id;
    let obj = {
      token: String(list.token),
      id: Number(n)
    };
    _http.OrderdetailsX(obj).then(d => {
      // console.log(d);
      this.msg = d.data.msg;
    });
  }
};
</script>
<style  scoped>
@import url("../../assets/css/Nav3/Nav3.css");
</style>