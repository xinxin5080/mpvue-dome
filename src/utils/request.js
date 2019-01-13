// 1.定义一个request函数
// 2.返回值是一个Promise对象
// 3.Promise有两个参数,resolve,reject
//   通过对象的属性来调用.then和.catch分别对应的resolve,reject
// 4.调用wx.requset,并设置默认参数
// 5.将其抛出,那边页面引进
function request(url,method="GET",data={}, header={}) {
  return new Promise((resolve,reject) => {
    wx.request({
      url,
      method,
      data,
      header,
      success: res => {
        resolve(res)
      }
    })
  })
}
// 拓展get请求
request.get = function(url, data){
  // 返回promise
  return request(url, "GET", data);
}
// 拓展post请求
request.post = function(url, data){
  // 返回promise
  return request(url, "POST", data);
}

// 需要授权访问的请求
request.auth = function(url, data){

  // 从本地获取token
  if(!wx.getStorageSync("token")){
      wx.navigateTo({
          url: "/pages/enter_order/main"
      });
      return new Promise(() => {});
  }

  // 返回promise
  // 注意，第四个参数是header头信息
  return request(url, "POST", data, {
      "Authorization" : wx.getStorageSync("token")
  });
}
export default request;