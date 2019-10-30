<!--  -->
<template>
  <div class="Orderdetails">
    <div class="ding">
      <p>
        <router-link to="/nav4">返回</router-link>
      </p>
      <p>我的订单</p>
      <p></p>
    </div>
    <div>
      <li class="dingdanhao" v-for="(item,index) in list.orderList" :key="index">
        <p>
          订单号：{{item.orderNumber}}
          
         <router-link :to="{path:'/OrderdetailsX',query:{id:item.orderNumber}}"><span>查看详情</span>
             </router-link> 
        </p>
      </li>
    </div>
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
      list: [],
      list1: []
    };
  },
  methods: {},
  components: {},
  computed: {},
  created() {
    let list = stor.get("token");
    list = JSON.parse(list);
    _http.Orderdetails(list).then(d => {
      console.log(d.data.data.goodsMap);
      this.list = d.data.data;
      for (let i in this.list.goodsMap) {
        this.list1.push(this.list.goodsMap[i]);
      }
    });
    console.log(this.list1);
  },
  mounted() {},
  updated() {}
};
</script>
<style  scoped>
@import url("../../assets/css/Nav3/Nav3.css");
.dingdanhao {
  box-sizing: border-box;
  padding: 10px;
}
</style>