<!--  -->
<template>
  <div class="Nav">
    <div class="a">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in list" :key="index">
          <img class="img2" :src="item.picUrl" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <ul class="Nav_1" style="background:#fff">
      <li class="li2">
        <router-link to="/qiandao">
          <img class="img1" src="../../../static/nav1.png" alt />
          <p>签到</p>
        </router-link>
      </li>
      <li class="li2">
        <router-link to="/liquan">
          <img class="img1" src="../../../static/nav2.png" alt />
          <p>礼券</p>
        </router-link>
      </li>
      <li class="li2">
        <router-link to="/kanjia">
          <img class="img1" src="../../../static/nav3.png" alt />
          <p>砍价</p>
        </router-link>
      </li>
      <li class="li2">
        <router-link to="/zhuanlan">
          <img class="img1" src="../../../static/nav4.png" alt />
          <p>专栏</p>
        </router-link>
      </li>
    </ul>
    <h1 class="Nav1_kanjia">
      <router-link to="/kanjia">
        全民砍价
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h1>
    <!-- 砍价页面 -->
    <ul class="Nav1_kanjianav">
      <li class="li1" v-for="(v,i) in list1" :key="i">
        <router-link :to="{path:'/user2',query:{id:v.id}}">
          <div class="div1">
            <img class="img" :src="v.pic" alt />
          </div>
          <div class="div2">
            <p v-html="v.name"></p>
            <p class="xinxi">{{v.characteristic}}</p>
            <div class="div1_price">
              <div>
                <p style="color:red">￥{{v.minPrice}}.00</p>
                <p>低价</p>
              </div>
              <div>
                <p>￥{{v.originalPrice}}.00</p>
                <p>原价</p>
              </div>
              <div>
                <p>￥{{v.kanjiaPrice}}.00</p>
                <p>限量</p>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <!-- 精选专题 -->
    <h1 class="Nav1_kanjia1">
      <router-link to="/zhuanlan">
        精选专题
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </h1>
    <header class="zhuanti1">
      <div class="zhuanti" style="width:100%;height:250px">
        <div class="zhuanti2">
          <p v-for="(item,index) in list3" :key="index">
            <router-link :to="'/zhuanti/'+item.id">
              <img :src="item.pic" width="260px" />
              <span v-html="item.title">{{item.title}}</span>
              <span class="span1" v-html="item.descript">{{item.descript}}</span>
            </router-link>
          </p>
        </div>
      </div>
    </header>
    <!-- 人气推荐 -->
    <h1 class="Nav1_kanjia1">
      人气推荐
      <i class="el-icon-arrow-right"></i>
    </h1>
    <ul class="renqi">
      <li v-for="(v,i) in list2" :key="i">
        <router-link :to="{path:'/user1',query:{id:v.id}}">
          <div class="div1" :style="{backgroundImage:'url(' + v.pic + ')'}">
            <div>
              <p v-html="v.characteristic"></p>
              <p v-html="v.name"></p>
            </div>
          </div>
          <p style="color:red">￥{{v.kanjiaPrice}}</p>
        </router-link>
      </li>
    </ul>
     <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from '../../components/nav2/Bottom'
import Product from "../../services/product-service";
const _product = new Product();
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      //砍价列表
      list1: [],
      //人气推荐列表
      list2: [],
      //精选
      list3: []
    };
  },
  methods: {},
  components: {Bottom},
  computed: {},
  created() {
    _product.list().then(d => {
      // console.log(d);
      // console.log(d.data.data);
      this.list = d.data.data;
    });
    axios.get("https://api.it120.cc/small4/shop/goods/kanjia/list").then(d => {
      // console.log(d.data.data.goodsMap)
      let a = d.data.data.goodsMap;
      for (let i in a) {
        this.list1.push(a[i]);
        this.list2.push(a[i]);
        this.$store.state.list2.push(a[i]);
        this.$store.state.list3.push(a[i]);
      }
      this.list1.splice(0, 1);
      this.list1.splice(3);
      this.list2 = this.list2.splice(2, 4);
      this.$store.state.list2 = this.$store.state.list2.splice(0, 4);
      // console.log(this.list2);
    });
    axios.get("https://api.it120.cc/small4/cms/news/list").then(d => {
      // console.log(d.data.data);
      this.list3 = d.data.data;
      this.$store.state.list4 = d.data.data;
    });
  }
};
</script>
<style  scoped>
@import url("../../assets/css/Nav1/Nav1.css");
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  /* line-height: 300px; */
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.Nav1_kanjianav a {
  width: 100%;
  display: flex;
}
</style>