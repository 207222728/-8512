<template>
  <div class="hello">
    <!-- <transition :name="transitionName">
      <keep-alive> -->
        <router-view class="transitionBody"></router-view>
      <!-- </keep-alive>
    </transition> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import Bottom from "./Bottom";
import axios from "axios";

export default {
  name: "HelloWorld",
  data() {
    return {
      transitionName: "transitionLeft"
    };
  },

  components: {
    Bottom
  },
  watch: {
    $route(to, from) {
      const arr = ["NewsPage", "/jokePage", "/jokePage", "/myPage"];
      const compare = arr.indexOf(to.path) > arr.indexOf(from.path);
      this.transitionName = compare ? "transitionLeft" : "transitionRight";

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transitionBody {
  transition: all 0.4s ease-out; /*定义动画的时间和过渡效果*/
}
.transitionLeft-enter,
.transitionRight-leave-active {
  -webkit-transform: translate(-100%, 100%);
  transform: translate(-100%, 100%);
  /*当左滑进入右滑进入过渡动画*/
}
.transitionLeft-leave-active,
.transitionRight-enter {
  -webkit-transform: translate(100%, 100%);
  transform: translate(100%, 100%);
}
</style>
