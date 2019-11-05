<!--  -->
<template>
  <div class="inde">
    <div class="ding">
      <p>
        <router-link to="/nav4">返回</router-link>
      </p>
      <p>我的订单</p>
      <p></p>
    </div>
    <li style="display:flex;width:100%;height:100px;" v-for="(v,i) in list1" :key="i">
        <img :src="v.pic" width="100px">
        <div>
            <p v-html="v.goodsName"></p>
            <p>{{v.property}}</p>
            <p>{{list2.orderInfo.statusStr}}  <input type="text"></p>
        </div>
    </li>
    <input type="text" ref="pingjia">
    <button @click="pingjia" >评价</button>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import HTTP from "../services/product-service.js";
const _http = new HTTP();
import stor from "../model/storage.js";
import axios from "axios";
export default {
  data() {
    return {
      txt: "",
      list: [],
      bian: "",
      list1: [],
      list2:[]
    };
  },
  methods: {
    pingjia() {
      let list = stor.get("token");
      list = JSON.parse(list);
      //   console.log(list.token);
      console.log(this.list1[0].id);
      let obj = {
        token: list.token,
        postJsonString:JSON.stringify( {
          token: list.token,
          orderId: this.list1[0].orderId,
          reputations: [
            {
              id: this.list1[0].id,
              reputation: 0,
              remark: this.$refs.pingjia.value
            }
          ]
        })
      };
      console.log(obj);
      _http.pinglun(obj).then(d => {
        console.log(d.data);
      });
    }
  },

  components: {},
  computed: {},
  created() {
    let list1 = stor.get("token");
    list1 = JSON.parse(list1);
    let n = list1.token;
    //订单详情

    let list = stor.get("huo");
    let obj = {
      token: list1.token,
      page:2,
      goodsJsonStr: JSON.stringify(list)
    };
    _http.Submission1(obj).then(d => {
      // console.log(d)
      d.data.data.orderList.forEach(v => {
        // console.log(v)
        if (v.status == 3) {
          this.list.push(v);
          let obj1 = {
            token: n,
            id: v.id
          };
          console.log(obj1);
          _http.ddxq(obj1).then(v => {
            this.list1 = v.data.data.goods;
            this.list2=v.data.data
            // console.log(this.list2);
            // console.log(v)
          });
        }
      });
    });
  }
};
</script>
<style  scoped>
@import url("../assets/css/Nav3/Nav3.css");
</style>