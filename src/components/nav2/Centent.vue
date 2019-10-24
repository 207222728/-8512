<!--  -->
<template>
<div>
   <div class="centent"  v-show="done">
    <ul class="centent_left">
      <li style="font-size:12px" ref="i" v-for="(v,i) in list" @click="add(v,i)" :key="i">{{v.name}}</li>
    </ul>
    <ul class="centent_rigth">
      <li class="li1">
        <el-carousel :interval="5000">
          <el-carousel-item v-for="(item,index) in img" :key="index">
            <img :src="item.img" alt />
          </el-carousel-item>
        </el-carousel>
      </li>
      <li v-for="(item,i) in this.$store.state.list1" v-show="item.isUse" :key="i">
        <router-link :to="'/user/'+item.id">
          <img :src="item.icon" />
          <span>{{item.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
  <div class="centent cen" style="width:100%;text-align: center" v-show="!done">
    搜索功能
  </div>
</div>
 
</template>

<script>
import HTTP from '../../services/product-service.js'
const _http=new HTTP()
import axios from "axios";
import Img from "../../../static/4.jpg";
export default {
  data() {
    return {
      img: [
        {
          img: Img
        },
        {
          img: Img
        },
        {
          img: Img
        }
      ]
    };
  },
  methods: {
    add(v, i) {
      this.$refs.i.forEach(d => {
        d.style.color = "";
        d.style.borderLeft = "";
        this.$refs.i[i].style.color = "red";
        this.$refs.i[i].style.borderLeft = "5px solid red";
      });
      this.$store.commit("add", v);
    }
  },
  components: {},
  computed: {
    list() {
      return this.$store.state.list;
    },
     done(){
      return this.$store.state.done
    }
  },
  created() {
    _http.detail().then(d=>{
       this.$store.state.list1 = d.data.data;
    })
  },
  mounted() {
    this.$refs.i[0].style.color = "red";
    this.$refs.i[0].style.borderLeft = "5px solid red";
  },
  watch: {
    $router(){
      this.$store.state.list1
    }
  }
};
</script>
<style  scoped>
@import url("../../assets/css/centent/centent.css");
.cen{
  text-align: center;
}
</style>