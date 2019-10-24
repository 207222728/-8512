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
  zhuche(data) {
    console.log(data)
    return _http.request({
      type: "post",
      url: `verification/sms/get?mobile=${data.mobile}&key=${data.kay}&picCode=${data.picCode}`
    })
  }
}

export default Product
