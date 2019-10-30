<!--  -->
<template>
  <div class="zhuc">
    <div class="zhuc1">
      <p>账号登录</p>
      <p>
        <small>严选商城欢迎你</small>
      </p>
      <div class="yanz">
        <input type="text" ref="zhanghao" placeholder="请输入账号" />
        <span>
          <i class="el-icon-mobile-phone"></i>
        </span>
      </div>
      <div class="yanz">
        <input type="password" ref="mima" placeholder="请输入密码" />
        <span>
          <i class="el-icon-view"></i>
        </span>
      </div>
      <p class="djdz" @click="fo">登录</p>
      <p class="jz">
        <router-link to="/">忘记密码</router-link>
      </p>
      <p class="denglu jz">
        <router-link to="/zhuche">还没有注册？立即注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import stor from "../../model/storage.js"
import Product from '../../services/product-service.js'
const _http=new Product()
import axios from "axios";
export default {
  data() {
    return {
      zhanghao: "",
      mima: ""
    };
  },
  methods: {
    fo() {
      
      let n = this.$refs.zhanghao.value;
      let d = this.$refs.mima.value;
      let obj={mobile:n,pwd:d}
      _http.zhuc(obj).then(d=>{
        console.log(d)
        if (d.data.code == 0) {
         stor.set('token',JSON.stringify(d.data.data));
          //  this.$router.push({ path: "/nav4" }); 
          location.href = "/nav4"
        }
      })
    }
  },
  components: {},
  computed: {},
  created() {
   
  },
  watch: {
    $rouer() {
      let list = stor.get("token");
      if (list) {
        this.$store.state.token = list;
      }
    }
  }
};
</script>
<style  scoped>
@import url("../../assets/css/zhuc/zhuc.css");
</style>