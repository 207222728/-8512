/**
 * index.js Created by SmallFour on 2019/9/28/9:07
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 状态管理对象
  state: {
    list: [
      {
        name: '全部分类',
        done: false,
        type: '',
        done1: false
      },
      {
        name: '居家生活',
        done: false,
        type: 'jujia2',
        done1: false
      },
      {
        name: '配饰装饰',
        done: false,
        type: 'peishi2',
        done1: false
      },
      {
        name: '新品服装',
        done: false,
        type: 'fuzhuang2',
        done1: false
      },
      {
        name: '日用电器',
        done: false,
        type: 'dianqi2',
        done1: false
      }
    ],
    list1: [],
    // 列表图片
    list2: [],
    // 列表详情
    list3: [],
    // 专栏数据
    list4: [],
    done: true,
    // 登录的token值
    token: [],
    // 购物车的物品
    gouwu: [],
    // 地址
    address1: [],
    //地址判断
    done1:false,
    //确认订单
    Order:[],
    //获取订单号
    huo:[],
    //个人信息
    xin: [],
    //判断登录状态
    done2: false,
    //订单号
    tijiao:[]
  },
  // mutations
  mutations: {
    // 筛选
    add (state, v) {
      v.done = true
      if (v.done === true) {
        state.list1.forEach(d => {
          if (v.type === '') {
            console.log()
            d.isUse = true
          } else if (v.type === d.type) {
            d.isUse = true
          } else {
            d.isUse = false
          }
        })
      }
    },
    bl (state) {
      state.done = false
    },
    bl1 (state) {
      state.done = true
    },
    zhuc (state, v) {
      let Telephone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
      if (Telephone.test(v.Telephone)) {
        if (v.password.length > 6) {
          if (v.password1 === v.password) {

          } else {
            alert('两次密码不同，请重新输入')
          }
        } else {
          alert('长度不能小于6')
        }
      } else {
        alert('错误')
      }
    }
  }
})

export default store
