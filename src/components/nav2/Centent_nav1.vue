<!--  -->
<template>
  <div class="Centent_nav1">
    <div class="div">
      <router-link to="/">
        <i class="el-icon-arrow-left"></i>
      </router-link>
    </div>
    <div class="Centent_nav1_nav">
      <el-carousel :interval="5000">
        <el-carousel-item v-for="(item,index) in list.pics" :key="index">
          <img :src="item.pic" alt />
        </el-carousel-item>
      </el-carousel>
      <div class="details_t" v-html="list.basicInfo.name"></div>
      <p class="details_a" style="font-size:10px;color:#b2b2b2">{{list.basicInfo.characteristic}}</p>
      <div class="details_price">
        <div>
          <p style="color:red;font-weight:900;font-size:16px">低价￥{{list.basicInfo.minPrice}}.00</p>
          <p class="details_price_c">原价￥{{list.basicInfo.originalPrice}}</p>
        </div>
        <div class="details_price_c">库存{{list.basicInfo.kanjiaPrice}}</div>
      </div>
      <!-- 介绍与评价 -->
      <div class="details_details">
        <div @click="done=false">商品介绍</div>
        <div @click="done=true">商品评价</div>
      </div>
      <!-- 商品介绍 -->
      <div v-show="!done" class="details_details1" v-html="list.content"></div>
      <!-- 商品评价 -->
      <div v-show="done" class="details_details1">
        <li class="ping" v-for="(v,i) in list1" :key="i">
          <img :src="v.goods.pic" />
          <div>
            <p>
              匿名用户
              <span>{{v.goods.goodReputationStr}}</span>
            </p>
            <p>{{v.goods.goodReputationRemark}}</p>
            <p>{{v.goods.dateReputation}} 选择规格：{{v.goods.property}}</p>
          </div>
        </li>
      </div>
    </div>
    <!-- 加入购物车 -->
    <div class="details_bottom">
      <div class="div1">
        <p>
          <routet-link to="/">
            <i class="el-icon-user-solid"></i>
          </routet-link>
        </p>
        <p>
          <router-link to="/nav3">
            <i class="el-icon-shopping-cart-2"></i>
          </router-link>
          <span
            class="num2"
            v-show="this.$store.state.gouwu.length"
          >{{this.$store.state.gouwu.length}}</span>
        </p>
        <p>
          <i class="el-icon-star-off"></i>
        </p>
      </div>
      <div class="div2">
        <div @click="add()">立即购买</div>
        <div class="red" @click="done1=true">加入购物车</div>
      </div>
    </div>
    <div class="guige" v-show="done1">
      <p>
        <img :src="list.basicInfo.pic" width="50px" />
        <span style="font-size:10px;vertical-align: top;">{{list.basicInfo.characteristic}}</span>
        <i class="el-icon-circle-close" @click="done1=false"></i>
      </p>
      <hr style="color:#000;" />
      <span @click="done1=false"></span>
      <!-- 选中 -->
      <li v-for="(v,i) in list.properties" :key="i">
        <p style="width:100%">{{v.name}}</p>
        <span
          v-for="(item,index) in v.childsCurGoods"
          @click="xuanzhong(item,index,i)"
          :key="index"
        >{{item.name}}</span>
      </li>
      <!-- 购物数量 -->
      <div class="num1">
        <p>购买数量</p>
        <div>
          <i class="el-icon-minus" @click="jian(list)"></i>
          <p ref="num">{{list.basicInfo.vetStatus}}</p>
          <i class="el-icon-plus" @click="jia(list)"></i>
        </div>
      </div>
      <div class="red" @click="add()">加入购物车</div>
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
      done: false,
      list1: [],
      done1: false,
      //规格存放
      gui: [],
      //存放
      cun: [],
      cun1: []
    };
  },
  methods: {
    add() {
      this.done1 = false;
      this.list.properties.forEach(d => {
        d.childsCurGoods.forEach(item => {
          if (item.remark == true) {
            // console.log(d);
            this.cun.push(d);
            this.cun1.push(item);
            let obj = {
              name: this.list.basicInfo.name,
              pic: this.list.basicInfo.pic,
              gui: this.cun,
              gui1: this.cun1,
              num: this.list.basicInfo.vetStatus,
              num1: this.list.basicInfo.minPrice,
              id: this.list.basicInfo.id,
              list:this.list.basicInfo,
              done:false,
              done1:false
            };
            // console.log(obj)
            if (this.$store.state.gouwu.length < 1) {
              this.$store.state.gouwu.push(obj);
            } else {
              this.$store.state.gouwu.forEach(d => {
                console.log(d);
                if (d.id == obj.id) {
                  if (d.name == obj.name) {
                    d.num++;
                    stor.set("gouwu", JSON.stringify(this.$store.state.gouwu));
                  }
                } else {
                  this.$store.state.gouwu.push(obj);
                  stor.set("gouwu", JSON.stringify(this.$store.state.gouwu));
                }
              });
            }
            stor.set("gouwu", JSON.stringify(this.$store.state.gouwu));
          } else if (item.remark == '') {
            // alert('请选择尺码')
            return  false
          } 
        });
      });
    },
    //选中
    xuanzhong(v, i, index) {
      this.pic = this.list.basicInfo.pic;
      // this.num =
        // console.log(this.list.basicInfo.pic)
        this.list.properties[index].childsCurGoods.forEach(d => {
          if (d.propertyId == v.propertyId) {
            if (v.id == d.id) {
              d.remark = true;
            } else {
              d.remark = "";
            }
          } else {
          }
        });
    },
    // 数量+
    jia(v) {
      v.basicInfo.vetStatus++;
    },
    // 数量-
    jian(v) {
      if (v.basicInfo.vetStatus > 0) {
        v.basicInfo.vetStatus--;
      }
    }
  },
  components: {},
  computed: {},
  created() {
    let n = this.$route.query.id;
    let a = this.$route.query.userid;
    //商品详情
    axios
      .get("https://api.it120.cc/small4/shop/goods/detail?id=" + n)
      .then(d => {
        // console.log(d.data.data);
        this.list = d.data.data;
      });
    //评价
    _http.pingjia(n).then(d => {
      console.log(d.data.data)
      this.list1 = d.data.data;
    });
  },
  updated() {
    //规格
    //
  },
  watch: {
    $route() {
      let n = this.$route.query.id;
      let a = this.$route.query.userid;
      axios
        .get("https://api.it120.cc/small4/shop/goods/detail?id=" + n)
        .then(d => {
          console.log(d)
          this.list = d.data.data;
        });
      _http.pingjia(n).then(d => {
        // console.log(d.data.data)
        this.list1 = d.data.data;
      });
      //  _http.guige(obj).then(d=>{
      //    console.log(d)
      //  })
    }
  }
};
</script>
<style  >
@import url("../../assets/css/centent_nav1/centent_nav_top.css");
.details_details1 >>> p {
  width: 100% !important;
  overflow: auto;
  z-index: 99;
}
.details_details1 {
  overflow: hidden;
}
.details_details1 img {
  width: 100% !important;
  height: 100px !important;
  z-index: 99;
}
.ping {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
}
.ping img {
  width: 100px !important;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 50%;
}
.ping div span {
  padding: 5px;
  background: red;
  color: #fff;
}
.ping div p {
  box-sizing: border-box;
  padding: 5px 10px;
}
.details_details1 {
  margin-bottom: 50px;
}
.details_bottom{
  z-index: 998;
}
.guige{
  z-index: 999;
}
.num2 {
  position: absolute;
  color: #fff;
  width: 25px !important;
  height: 30px !important;
  font-size: 20px;
  background: red;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
}
/* 选择 */
.m-attrList{
  width: 100%;
}
.m-attrList li{
  width: 100%;
}
.m-attrList li p{
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0.2rem;
}
.m-attrList li p span{
  width: 80%;
}
</style>