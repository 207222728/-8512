import Vue from 'vue'
import Router from 'vue-router'
import Nav1 from '@/views/products/Nav1'
import Nav2 from '@/components/Nav2'
import Nav3 from '@/components/Nav3'
import Nav4 from '@/components/Nav4'
import centent from '@/components/nav2/Centent_nav'
import centent1 from '@/components/nav2/Centent_nav1'
import centent2 from '@/components/nav2/Centent_nav2'
import Qiandao from '@/components/nav1/qiandao'
import Liquan from '@/components/nav1/liquan'
import Kanjia from '@/components/nav1/kanjia'
import Zhuanlan from '@/components/nav1/zhuanlan'
import Zhuanti from '@/components/nav1/zhuanti'
import Zhuc from '@/components/nav4/zhuc'
import Zhuche from '@/components/nav4/zhuche'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Nav1,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/nav1',
      component: Nav1,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/nav2',
      component: Nav2,
      meta: {
        title: '分类'
      }
    },
    {
      path: '/nav3',
      component: Nav3
    },
    {
      path: '/nav4',
      component: Nav4
    },
    {
      path: '/user/:id?',
      component: centent
    },
    {
      path: '/user1/',
      component: centent1
    },
    {
      path: '/user2/',
      component: centent2
    },
    {
      path: '/liquan',
      component: Liquan
    },
    {
      path: '/qiandao',
      component: Qiandao
    },
    {
      path: '/kanjia',
      component: Kanjia
    },
    {
      path: '/zhuanlan',
      component: Zhuanlan
    },
    {
      path: '/zhuanti/:id?',
      component: Zhuanti
    },
    {
      path: '/zhuc',
      component: Zhuc
    },
    {
      path: '/zhuche',
      component: Zhuche
    }


  ]
})
