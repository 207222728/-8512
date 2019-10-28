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
          <p>{{list.basicInfo.commission+1}}</p>
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
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      done: false,
      list1: [],
      done1: false,
      //规格存放
      gui: []
    };
  },
  methods: {
    add() {
      this.done1 = false;
      console.log()
      this.$store.state.gouwu.push(this.list);
       this.$store.state.gouwu.forEach((d,i)=>{
         if (this.list.properties[0].id==d.properties[0].id) {
           console.log(d)
           this.list.basicInfo.commission++
          //  this.$store.state.gouwu.splice(i,1)
         }else{
           this.$store.state.gouwu.splice(i,1)
           this.list.basicInfo.commission++
          //  this.$store.state.gouwu.push(this.list);
         }
       })

    },
    //选中
    xuanzhong(v, i, index) {
      this.list.properties[index].childsCurGoods.forEach(d => {
        if (d.propertyId == v.propertyId) {
          if (v.id==d.id) {
            v.remark = true;
            console.log(v)
          }
        } else {
           v.remark = false;
          console.log(v);
        }
      });
      console.log(this.list.properties[index].childsCurGoods)
    },
    // 数量+
    jia(v) {
      v.basicInfo.commission++;
    },
    // 数量-
    jian(v) {
      if (v.basicInfo.commission > 0) {
        v.basicInfo.commission--;
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
      // console.log(d.data.data)
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
.num2 {
  position: absolute;
  color: #fff;
  width: 25px;
  height: 30px;
  font-size: 20px;
  background: red;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
}
/* 选择 */
</style>