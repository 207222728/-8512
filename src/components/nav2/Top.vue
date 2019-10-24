<template>
  <div class="top">
   <input :class="done?'a':'b'" type="text" placeholder="搜索商品" @focus="bl()"><span v-show="!done" @click="bl1()"> 取消</span>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      list: {}
    };
  },
  computed: {
    num() {
      return this.store.state.count;
    },
    done(){
      return this.$store.state.done
    }
  },
  methods: {
   bl(){
    this.$store.commit('bl')
   },
    bl1(){
    this.$store.commit('bl1')
   }
  },
  created() {
   
  },
  beforeMount() {
  
  }
};
</script>
<style scoped>
@import url("../../assets/css/centent/centent.css");
input{
  border-radius: 10px;
  height: 20px;
}
.a{
  width:250px;
  transition: all 1s;
}
.b{
  width: 200px;
  transition: all 1s
}
.top{
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
}
</style>