<!--  -->
<template>
  <div class="Submission">
    <div class="ding">
      <p @click="fan">
        <router-link to="/Order">返回</router-link>
      </p>
      <p>确认付款</p>
      <p></p>
    </div>
    <div>订单号:{{list}}</div>
  </div>
</template>

<script>
import Product from "../../services/product-service.js";
const _http = new Product();
import axios from "axios";
import stor from "../../model/storage.js";
export default {
  data() {
    return {
      list: ""
    };
  },
  methods: {
    fan(){
       stor.remove("tijiao")
       this.$store.state.tijiao=[]
    }
  },
  components: {},
  computed: {},
  created() {
  let list1 = stor.get("tijiao");
    list1 = JSON.parse(list1);
    this.list=list1
  },
  mounted() {
   
  },
  updated () {
    let list1 = stor.get("tijiao");
    list1 = JSON.parse(list1);
    this.list=list1
  }
};
</script>
<style  scoped>
@import url("../../assets/css/Nav3/Nav3.css");
</style>