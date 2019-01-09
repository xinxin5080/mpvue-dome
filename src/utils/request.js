// 1.定义一个request函数
// 2.返回值是一个Promise对象
// 3.Promise有两个参数,resolve,reject
//   通过对象的属性来调用.then和.catch分别对应的resolve,reject
// 4.调用wx.requset,并设置默认参数
// 5.将其抛出,那边页面引进
function request(url,method="GET",data={}) {
  return new Promise((resolve,reject) => {
    wx.request({
      url,
      method,
      data,
      success: res => {
        resolve(res)
      }
    })
  })
}
export default request;