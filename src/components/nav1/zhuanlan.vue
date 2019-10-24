<!--  -->
<template>
  <div class="posi">
      <div class="div1a">
      <div class="div">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>
      <div class="cen_t">专栏列表</div>
      <div></div>
    </div>
    <zhuanCentent></zhuanCentent>

  </div>
</template>

<script>
import SP from './shangpin'
import zhuanCentent from './zhuanCentent'
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
      zhuanCentent,SP
  },
  computed: {},
  created() {}
};
</script>
<style  scoped>
@import url('../../assets/css/zhuanlan/zhuanlan.css');
.div1a {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 20px;
  line-height: 50px;
}
</style>