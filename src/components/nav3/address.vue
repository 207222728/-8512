<!--  -->
<template>
  <div class="address">
    <!-- 头部 -->
    <div class="ding">
      <p>
        <router-link to="/Order" @click.native="flushCom">返回</router-link>
      </p>
      <p>我的地址</p>
      <p></p>
    </div>
    <!-- 地址 -->
    <li class="l2" v-for="(item,index) in this.$store.state.address1" :key="index">
      <div>
        <input type="checkbox" :checked="item.done" @click="xuan(item,index)" />
      </div>
      <div style="width:80%">
        <p>
          {{item.xing}}
          <span>{{item.lian}}</span>
        </p>
        <div>{{item.di}}</div>
      </div>
      <div>
        <span @click="del(index)">删除</span>
      </div>
    </li>
    <!-- 添加地址 -->
    <li class="l1">
      <router-link to="/address1">+新建地址</router-link>
    </li>
  </div>
</template>
<script>
import stor from "../../model/storage.js";
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    xuan(v, i) {
        v.done =!v.done
       this.$store.state.address1.forEach(d=>{

       })
      stor.set("dizhi", JSON.stringify(this.$store.state.address1));
      //   v.done=!v.done
      console.log(v.done);
    },
    del(i) {
      this.$store.state.address1.splice(i, 1);
      stor.set("dizhi", JSON.stringify(this.$store.state.address1));
    },
    flushCom(){
      this.$router.go(0)
    }
  },
  components: {},
  computed: {},
  created() {
    let list = stor.get("gouwu");
    list = JSON.parse(list);
    if (list) {
      this.$store.state.gouwu = list;
    }
    let list1 = stor.get("dizhi");
    list1 = JSON.parse(list1);
    if (list1) {
      this.$store.state.address1 = list1;
    }
  },
  updated () {
    
  },
  watch: {
    $route() {
      this.$store.state.address1;
      
    }
  }
};
</script>
<style  scoped>
.ding {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px 10px;
}
.l1 {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  text-align: center;
  border: 1px solid;
}
.l2 {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid;
  display: flex;
}
.l2 > div > p {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 10px;
}
.l2 > div {
  width: 10%;
  box-sizing: border-box;
  padding: 0px 10px;
}
</style>