<!--  -->
<template>
  <div class="address1">
    <div class="ding">
      <p>
        <router-link to="/address">返回</router-link>
      </p>
      <p>新增地址</p>
      <p></p>
    </div>
    <div class="contact">
      <div class="contact_div">
        <p>联系人</p>
        <div>
          <input type="text" v-model="ming" placeholder="姓名" />
        </div>
      </div>
      <div class="contact_div">
        <p>手机号码</p>
        <div>
          <input type="text" v-model="hao" placeholder="11位手机号码" />
        </div>
      </div>
      <div class="contact_div">
        <p>选择地址</p>
        <div>
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
      </div>
      <div class="contact_div">
        <p>详细地址</p>
        <div>
          <input type="text" v-model="dizhi" placeholder="街道门牌信息" />
        </div>
      </div>
      <div class="contact_div">
        <p>邮政编码</p>
        <div>
          <input type="text" v-model="bian" placeholder="邮政编码" />
        </div>
      </div>
    </div>
    <button style="background:#1aac19" @click="address1">保存</button>
    <button style="background:#e64240">从微信读取</button>
    <button>取消</button>
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
      name2: "",
       //省编号
      sheng: "",
      //市编号
      shi: "",
      //姓名
      ming: "",
      //手机号
      hao: "",
      //详细地址
      dizhi: "",
      //编号
      bian: ""
    };
  },
  methods: {
      address1(){
         this.$store.state.token = JSON.parse(stor.get("token"));
      let obj = {
        address: this.dizhi,
        cityId: this.shi,
        code: this.bian,
        linkMan: this.ming,
        mobile: this.hao,
        provinceId: this.sheng,
        token: this.$store.state.token.token
      };
      console.log(obj);
      //添加地址
      _http.dizhi(obj).then(d => {
        console.log(d);
        if (d.data.code == 0) {
          this.$router.push({ path: "/address" });
        }
      });
      },
    add(v) {
      this.list.forEach(d => {
        if (d.name == v) {
           this.sheng = d.id;
          axios
            .post("https://api.it120.cc/common/region/child?pid=" + d.id)
            .then(v => {
              this.list1 = v.data.data;
              // console.log(v);
            });
        }
      });
    },
    add1(v) {
      this.list1.forEach(d => {
        if (d.name == v) {
            this.shi = d.id;
          axios
            .post("https://api.it120.cc/common/region/child?pid=" + d.id)
            .then(v => {
              this.list2 = v.data.data;
              // console.log(v);
            });
        }
      });
    }
  },
  created() {
    axios.post("https://api.it120.cc/common/region/province").then(d => {
      this.list = d.data.data;
      // console.log(this.list);
    });
    let list = stor.get("gouwu");
    list=JSON.parse(list)
      if (list) {
       this.$store.state.gouwu=list
      }
  }
};
</script>
<style  scoped>
.sheng {
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.ding {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 15px 10px;
}
.contact_div {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid;
}
.contact_div p {
  width: 20%;
  box-sizing: border-box;
}
.contact_div > div {
  width: 80%;
  box-sizing: border-box;
  text-align: center;
}
.contact {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}
input {
  width: 100%;
  border: none;
  box-sizing: border-box;
  padding: 0 10px;
}
.address1 button {
  width: 90%;
  border: 1px;
  box-sizing: border-box;
  padding: 15px 0;
  color: #fff;
  margin-left: 5%;
  margin-bottom: 10px;
}
</style>