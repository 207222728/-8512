<!--  -->
<template>
  <div class="Bargain">
    <div class="fan">
      <router-link to="/kanjia">
        <i class="el-icon-arrow-left"></i>
      </router-link>
    </div>
    <div class="Bargain_div">
      <div class="Bargain_div_top">
        <i class="el-icon-s-custom"></i>
      </div>
      <div class="Bargain_div_cen1">{{list.joiner.nick}}</div>
      <div class="Bargain_div_cen1">我发现一件好货，来帮我砍到最低价吧~</div>
      <div class="Bargain_div_nav">
        <img :src="list1.pic" />
        <div>
          <p style="color:#000">{{list1.name}}</p>
          <p>
            低价￥{{list.kanjiaInfo.minPrice}}
            <s>原价￥{{list.kanjiaInfo.curPrice}}</s>
          </p>
        </div>
      </div>
      <div style="height:1rem;">
        <p>
          当前价格{{(list.kanjiaInfo.curPrice -num).toFixed(2)}}元,
          已砍{{num}}元;
        </p>
      </div>
      <div class="kandao">
        <button style="width:50%;background: #b0a48c;color:#fff;" @click.once="kan">{{done==false?'砍一刀':'已当前价格购买'}}</button>
        <button style="border: 1px solid #b19e75;color: #b3a079;background:rgba(256,256,256,0)">邀请好友砍价</button>
      </div>
    </div>
    <div class="dd" v-show="done">
        <div class="dd1">
          <p> {{list2==""?'':"用户名："}}{{list2.uid}}</p>
          <p> {{list2==""?'':"砍价时间："}}{{list2.dateAdd}}</p>
        </div>
        <div class="dd2">
         {{list2==""?'':"砍了"}}{{list2.cutPrice}}
        </div>
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
      list1: [],
      num: 0,
      id1: "",
      list2:[],
      done:false
    };
  },
  methods: {
    kan() {
      this.done=true
      let n = stor.get("token");
      n = JSON.parse(n);
      let id = this.$route.query.id;
      let obj = {
        n: n,
        id: this.id1
      };
      //砍一刀
      _http.Bargain4(obj).then(d => {
        this.list2=d.data.data
        console.log(d);
        this.num = d.data.data.cutPrice;
      });
    }
  },
  components: {},
  computed: {},
  created() {
    let n = stor.get("token");
    n = JSON.parse(n);
    let id = this.$route.query.id;
    axios.get("https://api.it120.cc/small4/shop/goods/kanjia/list").then(d => {
      // console.log(d.data.data);
      d.data.data.result.forEach(v => {
        if (v.goodsId == id) {
          var id1 = v.id;
          this.id1 = v.id;
          let obj1 = {
            n: n.uid,
            id: id1
          };
          let obj = {
            n: n,
            id: id1
          };
          //获取砍价详情
          _http.Bargain2(obj1).then(d => {
            this.list = d.data.data;
            // console.log(this.list);
          });
          // //发起砍价
          // _http.Bargain(obj).then(d => {
          //   // console.log(d);
          // });

          this.$store.state.list3.forEach(v1 => {
            if (v1.id == id) {
              this.list1 = v1;
            }
          });
        }
      });
    });
    let obj = {
      n: n,
      id: id
    };
    // //发起砍价
    // _http.Bargain(obj).then(d => {
    //   //   console.log(d);
    // });
    // //我的砍价
    // _http.Bargain1(obj).then(d => {
    //     console.log(d);
    // });
    // //帮别人砍价
    // _http.Bargain3(obj).then(d => {
    //   //   console.log(d);
    // });
    // //砍一刀
    // _http.Bargain4(obj).then(d => {
    //   //   console.log(d);
    // });
  },
  watch: {
    $route(){
       this.num
    }
  }
};
</script>
<style  scoped>
@import url("../../assets/css/Bargain/Bargain.css");
.dd{
  color: #000;
  display: flex;
  box-sizing: border-box;
  padding: 0.2rem;
}
.dd1{
  width: 70%;
}
.dd2{
  width: 30%;
}
.kandao{
  width: 80%;
  box-sizing: border-box;
  padding: 0.2rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.kandao button{
  width: 35%;
  box-sizing: border-box;
  padding: 0.1rem;
  line-height: 0.7rem;
  border: none;
  outline: none;
  border-radius: 10px;
}
</style>