<!--  -->
<template>
  <ul class="renqi">
      <li v-for="(v,i) in this.$store.state.list2" :key="i">
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
</template>

<script>

import axios from "axios";
export default {
data() {
return {

};
},
methods: {

},
components: {

},
computed: {

},
created() {

},
}
</script>
<style  scoped>
@import url("../../assets/css/Nav1/Nav1.css");
.Nav1_kanjianav {
  margin-top: 50px;
}
.Nav1_kanjianav a {
  width: 100%;
  display: flex;
}
</style>