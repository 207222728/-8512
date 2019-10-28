<!--  -->
<template>
  <div class="region">
    <div>
      <router-link to="/">首页</router-link>
    </div>
    <div class="sheng">
      <el-select style="width:33%" v-model="name" @change="add(name)" placeholder="请选择">
        <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.name">
          <span style="float: left">{{ item.name }}</span>
        </el-option>
      </el-select>
      <el-select style="width:33%" v-model="name1" @change="add1(name1)" placeholder="请选择">
        <el-option v-for="item in list1" :key="item.id" :label="item.name" :value="item.name">
          <span style="float: left">{{ item.name }}</span>
        </el-option>
      </el-select>
      <el-select style="width:33%" v-model="name2" placeholder="请选择">
        <el-option v-for="item in list2" :key="item.id" :label="item.name" :value="item.name">
          <span style="float: left">{{ item.name }}</span>
        </el-option>
      </el-select>
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
      name: "",
      list1: [],
      name1: "",
      list2: [],
      name2: ""
    };
  },
  methods: {
    add(v) {
      this.list.forEach(d => {
        if (d.name == v) {
          axios
            .post("https://api.it120.cc/common/region/child?pid=" + d.id)
            .then(v => {
              this.list1 = v.data.data;
              console.log(v);
            });
        }
      });
    },
    add1(v) {
      this.list1.forEach(d => {
        if (d.name == v) {
          axios
            .post("https://api.it120.cc/common/region/child?pid=" + d.id)
            .then(v => {
              this.list2 = v.data.data;
              console.log(v);
            });
        }
      });
    }
  },
  created() {
    axios.post("https://api.it120.cc/common/region/province").then(d => {
      this.list = d.data.data;
      console.log(this.list);
    });
  }
};
</script>
<style  scoped>
@import url("../../assets/css/sheng/sheng.css");
</style>