<!--  -->
<template>
  <div class="bottom">
    <ul>
      <li>
        <router-link to="/nav1">
          <i class="el-icon-s-home"></i>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link to="/nav2">
          <i class="el-icon-s-cooperation"></i>
          <p>分类</p>
        </router-link>
      </li>
      <li>
        <router-link to="/nav3">
          <i class="el-icon-shopping-cart-2"></i>
          <p>购物车</p>
        </router-link>
      </li>
      <li>
        <router-link to="/nav4">
          <i class="el-icon-s-custom"></i>
          <p>个人中心</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  scoped>
.bottom li {
  box-sizing: border-box;
  padding: 5px 0;
}
i{
  font-size: 20px;
}
</style>