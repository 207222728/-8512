<!--  -->
<template>
  <div class="Nav">
    <Top></Top>
    <Centent></Centent>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from './nav2/Bottom'
import Top from "./nav2/Top";
import Centent from "./nav2/Centent";
import axios from "axios";
export default {
  data() {
    return {

    };
  },
  methods: {},
  components: {
    Centent,
    Top,
    Bottom
  },
  computed: {},
  created() {}
};
</script>
<style  scoped>
@import url("../assets/css/centent/centent.css");
</style>