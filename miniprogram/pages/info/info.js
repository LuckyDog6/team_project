// pages/info/info.js
const db = wx.cloud.database()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todo: '',
    id: ''
  },
  success() {
    Dialog.confirm({
        title: '已完成计划？',
        // message: '已完成计划',
      })
      .then(() => {
        db.collection('todos').where({
          _id: this.data.id
        }).field({
          category: true,
          date: true,
          detail: true,
          group: true,
          master: true,
          title: true,
          startTime: true,
          endTime: true,
          location:true
        })
        .get({
          success: res => {
           
            db.collection('todosed').add({
              data: res.data[0]
            }).then(console.log)
          },
          fail: err => {
            console.log(err.data)
          }
        })
        db.collection('todos').where({
          _id: this.data.id
        }).remove()
        app.globalData.back = 1
        wx.navigateBack({
          delta: 1,
        })
        app.globalData.back=1
      })
      .catch(() => {
        // on cancel
      });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    db.collection('todos').where({
      _id: options.id
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          todo: res.data[0]
        })
      },
      fail: err => {
        console.log(err.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})