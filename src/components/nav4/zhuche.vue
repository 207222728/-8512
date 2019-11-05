<!--  -->
<template>
  <div class="zhuc">
    <div class="zhuc1">
      <h1>新用户注册</h1>
      <p style="margin-bottom: 30px">很高兴您将成为商城的会员（注册只需一步）</p>
      <div class="yanz" ref="shouji">
        <input type="text" v-model="Personal.Telephone" @blur="shi" placeholder="手机号" />
        <span>
          <i class="el-icon-mobile-phone"></i>
        </span>
      </div>
      <div class="yanz" ref="mima">
        <input type="password" v-model="Personal.password" @blur="shi1" placeholder="密码" />
        <span @click="qie">
          <i class="el-icon-view"></i>
        </span>
      </div>
      <div class="yanz" ref="mima1">
        <input type="password" v-model="Personal.password1" @blur="shi2" placeholder="确认密码" />
        <span @click="qie1">
          <i class="el-icon-view"></i>
        </span>
      </div>
      <div class="yanz">
        <input type="text" v-model="Personal.name" placeholder="用户名" />
        <span>
          <i class="el-icon-s-custom"></i>
        </span>
      </div>
      <div class="yanz tu">
        <input type="text" v-model="Personal.Verification" placeholder="图形验证码" />
        <img
          @click="tu"
          :src="'https://api.it120.cc/small4/verification/pic/get?key='+this.Personal.num"
          alt
        />
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
      <div class="yanz">
        <input type="text" v-model="Personal.code" />
        <span @click="huoqu">获取验证码</span>
      </div>
      <p class="djdz" @click="zhuc">立即注册</p>
      <p class="denglu jz">
        <router-link to="/zhuc">已有账号？立即登录</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Product from "../../services/product-service.js";
const _http = new Product();
import axios from "axios";
export default {
  data() {
    return {
      Personal: {
        //手机号
        Telephone: "",
        //密码
        password: "",
        //确认密码
        password1: "",
        //用户名
        name: "",
        //验证码
        Verification: "",
        //手机验证码
        code: "",
        num: ""
      },
       list: [],
      name: "",
      list1: [],
      name1: "",
      list2: [],
      name2: ""
    };
  },
  methods: {
    //手机号验证
    shi() {
      let Telephone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (Telephone.test(this.Personal.Telephone)) {
        this.$refs.shouji.style.border = "";
      } else {
        this.$refs.shouji.style.border = "1px solid red";
      }
      console.log("11111");
    },
    //密码验证
    shi1() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (reg.test(this.Personal.password)) {
        this.$refs.mima.style.border = "";
      } else {
        this.$refs.mima.style.border = "1px solid red";
      }
    },
    //确认密码
    shi2() {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (reg.test(this.Personal.password1)) {
        this.$refs.mima1.style.border = "";
      } else {
        this.$refs.mima1.style.border = "1px solid red";
      }
    },
    //点击注册
    zhuc() {
      let obj = {
        mobile: this.Personal.Telephone,
        password: this.Personal.password,
        code: this.Personal.code,
        name: this.Personal.name
      };
      _http.zhuc1(obj).then(d => {
        console.log(d);
        if (d.data.code == 0) {
          _http.shouji(obj).then(res => {
            console.log(res);
            if (res.data.code == 0 || 10000) {
              this.$router.push({ path: "/zhuc" });
            }
          });
        }
      });
    },
    //密码
    qie() {
      let password = this.$refs.mima;
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    },
    //确认密码
    qie1() {
      let password = this.$refs.mima1;
      if (password.type === "password") {
        password.type = "text";
      } else {
        password.type = "password";
      }
    },
    //点击获取验证码
    huoqu() {
      let Telephone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (Telephone.test(this.Personal.Telephone)) {
        let obj = {
          mobile: this.Personal.Telephone,
          key: this.Personal.num,
          picCode: this.Personal.Verification
        };
        // console.log(obj)
        _http.zhuche(obj).then(d => {
          if (d.data.code != 0) {
            alert('信息错误,请重试')
          }
          console.log(d);
        });
      } else {
        alert("手机号错误");
      }
    },
    tu() {
      this.Personal.num = Math.ceil(Math.random() * 10);
    },
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
  components: {},
  computed: {},
  created() {
    this.Personal.num = Math.ceil(Math.random() * 10);
     axios.post("https://api.it120.cc/common/region/province").then(d => {
      this.list = d.data.data;
      console.log(this.list);
    });
  },
  watch: {
    $rouer() {}
  }
};
</script>
<style  scoped>
@import url("../../assets/css/zhuc/zhuc.css");
@import url("../../assets/css/sheng/sheng.css");
.tu {
  display: flex;
}
.tu img {
  width: 100px;
}
.sheng{
  display: flex;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
}
</style>