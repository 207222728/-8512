<template>
  <div id="app">
    <Hello></Hello>
  </div>
</template>

<script>
import Hello from "./components/nav2/HelloWorld"
import './assets/js/index'
export default {
  name: 'App',
  components:{
    Hello
  }
}
</script>
<style>
@import url('./assets/css/App/index.css');
.bottom{
  width: 100%;
  height: 50px;
  background: #fff;
  position: absolute;
  bottom: 0;
}
.hello{
  box-sizing: border-box;
  padding-bottom: 50px;
}
.Nav{
  width: 100%;
  height: 100%;
}
input:focus{outline:none;}
.cen_t{
  width: 100px;
  margin: 0 auto;
  text-align: center;
}
.div{
  top: 0;
}
</style>
