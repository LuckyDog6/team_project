// pages/my/index.js
const app=getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    total:'',
    done:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo()
    db.collection('todos').where({
      _openid: this.data.openid // 填入当前用户 openid
    }).count().then(res => {
      this.setData({
        total:res.total
      })
    })
    db.collection('todosed').where({
      _openid: this.data.openid // 填入当前用户 openid
    }).count().then(res => {
      this.setData({
        done:res.total
      })
    })
  },
  getInfo(){
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      that.setData({
        user: app.globalData.userInfo,
        openid: app.globalData.openid
      })
      wx.hideLoading()
    }, 1000)
    
    
  },
  look() {
    wx.navigateTo({
      url: '/pages/myInfo/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
   },
  doing() {
    wx.navigateTo({
      url: '/pages/doing/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
   },
  done() {
    wx.navigateTo({
      url: '/pages/done/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
   },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})