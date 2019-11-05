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
    <li class="l2" v-for="(item,index) in list" :key="index">
      <div>
        <input type="checkbox" :checked="item.isDefault" @click="xuan(item,index)" />
      </div>
      <div style="width:80%">
        <p>
          {{item.linkMan}}
          <span>{{item.mobile}}</span>
        </p>
        <div>{{item.address}}</div>
      </div>
      <div>
        <span @click="update">
          <i class="el-icon-edit-outline"></i>
        </span>
      </div>
    </li>
    <!-- 添加地址 -->
    <p class="l1">
      <router-link to="/address1">
        <el-button type="primary">新建地址</el-button>
      </router-link>
    </p>
    <p class="l1" @click="del()">
      <el-button type="danger">删除选中地址</el-button>
    </p>
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
      list: []
    };
  },
  methods: {
    //默认地址
    xuan(item, index) {
      item.isDefault = !item.isDefault;
      if (item.isDefault == false) {
        stor.remove("moren");
      } else {
        this.list.forEach(d => {
          if (item.id == d.id) {
            d.isDefault = true;
            stor.set("moren", JSON.stringify(d));
          } else {
            d.isDefault = false;
          }
        });
      }
    },
    //修改地址
    update() {},
    //删除地址
    del() {
      this.list.forEach(d => {
        if (d.isDefault == true) {
          let n = this.$store.state.token.token;
          let obj = {
            token: n,
            id: d.id
          };
          _http.dzremove(obj).then(d => {
            console.log(d);
            if (d.data.code == 0) {
              stor.remove("moren");
              location.replace(location);
            }
          });
        }
      });
    },
    //点击返回
    flushCom() {
      // this.$router.go(0);
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
    //地址列表
    this.$store.state.token = JSON.parse(stor.get("token"));
    let n = this.$store.state.token.token;
    _http.dzliebiao(n).then(d => {
      this.list = d.data.data;
      console.log(d);
    });
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