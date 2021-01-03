// pages/addTodos/addTodos.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js'
const app=getApp()
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    date:'',
    category:'',
    master:'',
    group:'',
    detail:'',
    show:false,
    categ:false,
    mast:false,
    grou:false,
    deta:false,
    todo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.todo.date=options.date
    this.setData({
      todo:this.data.todo
    })
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      that.data.todo.openid = app.globalData.openid
      that.setData({
        todo: that.data.todo
      })
      wx.hideLoading()
    }, 1000)
    
  },

  confirm(e) {
    console.log(e)
    this.data.todo.title = this.data.title
    this.data.todo.category = this.data.category
    this.data.todo.master = this.data.master
    this.data.todo.group = this.data.group
    this.data.todo.detail = this.data.detail
    this.setData({
      show: false,
      categ:false,
      mast:false,
      grou:false,
      deta:false
    })
    this.setData({
      todo: this.data.todo,
    })
  },

  showTitle(e) {
    this.setData({
      show:true
    })
  },
  showCate(e) {
    this.setData({
      categ:true
    })
  },
  showMaster(e) {
    this.setData({
      mast:true
    })
  },
  showGroup(e) {
    this.setData({
      grou:true
    })
  },
  showDetail(e) {
    this.setData({
      deta:true
    })
  },

  title(e){
    this.setData({
      title: e.detail.trim(),
    })
  },
  category(e) {
    this.setData({
      category: e.detail.trim(),
    })
  },
  master(e) {
    this.setData({
      master: e.detail.trim(),
    })
  },
  group(e) {
    this.setData({
      group: e.detail.trim(),
    })
  },
  detail(e) {
    this.setData({
      detail: e.detail.trim(),
    })
  },
  onClose() {
    this.setData({ 
      show: false ,
      categ:false,
      mast:false,
      grou:false,
      deta:false
      });
  },

  
  
  startTime(e){
    this.data.todo.startTime = e.detail.value
    this.setData({
      todo:this.data.todo
    })
    // console.log(e)
  },
  endTime(e){
    this.data.todo.endTime = e.detail.value
    this.setData({
      todo: this.data.todo
    })
    // console.log(e)
  },
  chooseLocation(e) {
    wx.chooseLocation({
      success: res => {
        console.log(res)
        let locationObj = {
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name,
          address: res.address
        }
        this.data.todo.location = locationObj
        this.setData({
          todo: this.data.todo
        })
      },
    })
  },
  submit(){
    if (this.data.todo.title != '' && this.data.todo.location != undefined && this.data.todo.startTime != undefined && this.data.todo.endTime != undefined && this.data.todo.category != undefined && this.data.todo.master != undefined && this.data.todo.group != undefined && this.data.todo.detail != undefined )
    {
     
      db.collection('todos').add({
        data: this.data.todo
      }).then(console.log)
      wx.navigateBack({
        delta: 1,

      })
      app.globalData.back = 1
    }else{
      Dialog.confirm({
        title: '请完善信息',
        // message: '已完成计划',
      })
        .then(() => {
        })
        .catch(() => {
          // on cancel
        });
    }
    
    
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