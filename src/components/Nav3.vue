<!--  -->
<template>
  <div class="Nav">
    <div class="Nav3_top">购物车</div>
    <div class="Nav3_nav">
      <div>
        <img src="../../static/3.png" width="100px" />
      </div>
      <h1>猜你喜欢</h1>
      <Canvas></Canvas>
    </div>
     <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from './nav2/Bottom'
import Canvas from './nav3/canvas'
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Canvas,Bottom
  },
  computed: {},
  created() {}
};
</script>
<style  scoped>
@import url("../assets/css/Nav3/Nav3.css");
</style>