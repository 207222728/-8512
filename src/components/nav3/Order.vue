<!--  -->
<template>
  <div class="Order">
    <div class="ding">
      <p @click="chu">
        <router-link to="/nav3">返回</router-link>
      </p>
      <p>订单信息</p>
      <p></p>
    </div>
    <!-- 地址 -->
    <div class="dizhi">
      <p v-show="!list1.isDefault">
        <router-link to="/address">添加地址</router-link>
      </p>
      <li class="l2" v-show="!list1.length">
        <div></div>
        <div style="width:80%">
          <router-link to="/address">
            <p>
              {{list1.linkMan}}
              <span>{{list1.mobile}}</span>
            </p>
            <div>{{list1.address}}</div>
          </router-link>
        </div>
        <div></div>
      </li>
    </div>
    <!-- 商品列表 -->
    <div class="lie">商品列表</div>
    <div>
      <div id="gouw" v-show="this.$store.state.gouwu.length">
        <li v-for="(item,index) in this.$store.state.gouwu" :key="index">
          <img :src="item.pic" alt />
          <!-- 商品名规格 -->
          <div style="width:50%;font-size:10px">
            <p v-html="item.name"></p>
            <span v-for="(v,i2) in item.gui" :key="i2">
              <span
                ref="a"
                v-for="(item1,i1) in v.childsCurGoods"
                v-show="item1.remark"
                :key="i1"
              >{{v.name}}：{{item1.name}}</span>
            </span>
            <!-- 价格 -->
          </div>
          <div style="width:20%;text-align: right;">
            <p style="color:red" ref="b">
              ￥{{item.num1}}
              <span v-show="item.num1>=1">.00</span>
            </p>
            <!-- 数量 -->
            <span ref="c">x{{item.num}}</span>
          </div>
        </li>
      </div>
    </div>
    <!-- 配送 -->
    <div class="jin">
      <p>配送方式</p>
      <p>快递</p>
    </div>
    <!-- 备注 -->
    <div class="jin">
      <p>备注</p>
      <p>
        <input type="text" placeholder="如需备注请输入" />
      </p>
      <p></p>
    </div>
    <!-- 金额 -->
    <div class="jin">
      <p>商品金额</p>
      <p>{{zong()}}</p>
    </div>
    <!-- 底部 -->
    <div class="bianji1">
      <p style="width:50%"></p>
      <div class="bo">
        <p style="color:red">
          合计：￥{{zong()}}
          <span v-show="zong()>=1">.00</span>
        </p>
        <div>
          <p @click.once="tijiao">提交订单</p>
        </div>
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
      list: {},
      //地址
      list1: {}
    };
  },
  methods: {
    zong() {
      let n = 0;
      this.$store.state.gouwu.forEach(v => {
        n += v.num * v.num1;
      });
      return n;
    },
    chu() {
      stor.remove("huo");
      this.$store.state.huo = [];
    },
    tijiao() {
      let list1 = stor.get("token");
      list1 = JSON.parse(list1);
      let list = stor.get("huo");
      console.log(list)
      let obj = {
        token: list1.token,
        goodsJsonStr: JSON.stringify(list)
      };
      //订单号
      _http.Submission(obj).then(d => {
        console.log(d);
        this.$store.state.tijiao = d.data.data.orderNumber;
        stor.set("tijiao", JSON.stringify(this.$store.state.tijiao));
      });
      //订单详情
      _http.Submission1(obj).then(d => {
        console.log(d.data.data.orderList)

      });
      this.$router.push({ path: "/Submission" });
      // location.href='/Submission'
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
    //规格
    this.$store.state.gouwu.forEach(d => {
      console.log(d)
      let n ="";
      if (d.gui1.length == 1) {
        n = `${d.gui1[0].propertyId}:${d.gui1[0].id}`;
      } else {
        n = `${d.gui1[0].propertyId}:${d.gui1[0].id},${d.gui1[1].propertyId}:${d.gui1[1].id}`;
      }
      console.log(n);

      let cun = {
        goodsId: d.list.id,
        number: d.num,
        propertyChildIds: n,
        logisticsType: 0
      };
      console.log(cun)
      this.$store.state.huo.push(cun);
      stor.set("huo", this.$store.state.huo);
    });
    //默认地址
    let list1 = JSON.parse(stor.get("moren"));
    if (list1) {
      this.list1 = list1;
    } else {
      this.list1 = {};
    }
    // console.log(this.list1);
  },
  watch: {
    $route() {
      this.$store.state.address1;
      this.list;
      this.$store.state.address1.forEach(d => {
        if ((d.done = true)) {
          this.list = d;
        } else {
          this.list = "";
        }
      });
      let list1 = stor.get("dizhi");
      list1 = JSON.parse(list1);
      if (list1) {
        this.$store.state.address1 = list1;
      }
      this.$store.state.tijiao
    }
  }
};
</script>
<style  scoped>
@import url("../../assets/css/Nav3/Nav3.css");
#gouw {
  height: 300px !important;
}
.bo {
  overflow: hidden;
}
</style>