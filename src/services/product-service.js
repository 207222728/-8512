/**
 * product-service.js Created by SmallFour on 2019/10/22/14:16
 */

// 第二个文件：M层

/*
* M : 数据
* V： 视图
* C： 业务逻辑层
* */

import HTTP from '../utils/http'
const _http = new HTTP()
class Product {
  // list方法
  list() {
    return _http.request({
      url: 'banner/list'
    })
  }
  // detail方法分类渲染
  detail() {
    return _http.request({
      url: 'shop/goods/category/all'
    })
  }
  // 分类列表页
  liebiao() {
    return _http.request({
      url: 'shop/goods/list'
    })
  }
  zhuc(data) {
    return _http.request({
      type: "post",
      url: 'user/m/login?deviceId=007&deviceName=monkey',
      data: {
        mobile: data.mobile,
        pwd: data.pwd
      }
    })
  }
  //获取验证码
  zhuche(data) {
    return _http.request({
      type: "post",
      url: 'verification/sms/get',
      data: {
        mobile: data.mobile,
        key: data.key,
        picCode: data.picCode
      }
    })
  }
  //确认注册
  zhuc1(data) {
    return _http.request({
      type: "post",
      url: 'verification/sms/check',
      data: {
        mobile: data.mobile,
        code: data.code
      }
    })
  }
  //手机注册用户注册
  shouji(data) {
    return _http.request({
      type: "post",
      url: 'user/m/register',
      data: {
        mobile: data.mobile,
        pwd: data.password,
        code: data.code,
        nick: data.name
      }
    })
  }
  //商品评价
  pingjia(data) {
    return _http.request({
      type: "post",
      url: "shop/goods/reputation",
      data: {
        goodsId: data
      }
    })
  }
  //选择规格
  guige(data) {
    return _http.request({
      type: "post",
      url: "shop/goods/price",
      data: {
        goodsId: data.n,
        propertyChildIds: data.d
      }
    })
  }
}

export default Product
