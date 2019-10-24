<!--  -->
<template>
  <div class="posi">
    <div class="posi_top">
      <div class="div">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <div class="div1">
        <p class="p1">您的可用积分为</p>
        <p class="p">999</p>
      </div>
    </div>
    <div class="qiandao">
      <p>点击签到</p>
    </div>
    <div class="posi_bottom">
    
        <div class="posi_left">
            <img src="../../../static/6.jpg" width="100%">
            <div class="cen">
                <p>消费购物</p>
                <p>购物完成，确认收货后立返积分</p>
            </div>
            <div class="right">
                <router-link to="/">
                   <span>
                       去购物
                   </span>
                </router-link>
            </div>
        </div>
        <div class="posi_left a">
            <img src="../../../static/7.jpg" width="100%">
            <div class="cen">
                <p>积分兑换</p>
                <p>积分兑好礼，20积分即可兑换礼券</p>
            </div>
            <div class="right">
                <router-link to="/liquan">
                   <span>
                       去兑换
                   </span>
                </router-link>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {},
  created() {}
};
</script>
<style  scoped>
@import url("../../assets/css/shouye/shouye.css");
</style>