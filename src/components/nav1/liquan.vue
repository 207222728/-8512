<!--  -->
<template>
<div class='posi'>
    <div class="posi_top1">
      <div class="div">
        <router-link to="/">
          <i class="el-icon-arrow-left"></i>
        </router-link>
      </div>

      <div class="input">
          <input type="text" placeholder="请输入礼券码">
          <button>兑换</button>
      </div>
    </div>
    <div class="posibottom">
        <div>
            <div>
                <div class="left"><span>1</span>元</div>
                <div class="cen">
                    <p>满减1</p>
                    <p>满100元使用</p>
                </div>
                <div class="right">
                    <span>立即领取</span>
                </div>
            </div>
            <p class="p">领取 7 天内有效</p>
        </div>
        <div>
            <div>
                <div class="left"><span>1</span>元</div>
                <div class="cen">
                    <p>满减1</p>
                    <p>满100元使用</p>
                </div>
                <div class="right">
                    <span>立即领取</span>
                </div>
            </div>
            <p class="p">领取 7 天内有效</p>
        </div>
    </div>
</div>
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
@import url("../../assets/css/shouye/shouye.css");
</style>