<!--  -->
<template>
  <ul class="ul">
    <li
      class="bj"
      v-for="(item,index) in list4"
      :key="index"
      :style="{backgroundImage:'url(' + item.pic + ') ' }"
    >
      <router-link tag="li" :to="'/zhuanti/'+item.id">
        <p>{{item.title}}</p>
        <p>{{item.descript}}</p>
        <div class="xq">查看详情</div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  computed: {
    list4() {
      return this.$store.state.list4;
    }
  },
  created() {
    // console.log(this.$store.state.list4);
  }
};
</script>
<style  scoped>
@import url("../../assets/css/zhuanlan/zhuanlan.css");
</style>