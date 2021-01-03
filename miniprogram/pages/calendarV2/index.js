import todo from '../../component/v2/plugins/todo'
import selectable from '../../component/v2/plugins/selectable'
import solarLunar from '../../component/v2/plugins/solarLunar/index'
import timeRange from '../../component/v2/plugins/time-range'
import week from '../../component/v2/plugins/week'
import holidays from '../../component/v2/plugins/holidays/index'
import plugin from '../../component/v2/plugins/index'
import calendar from '../../component/v2/index'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js'
// 导入插件
plugin
  .use(todo)
  .use(solarLunar)
  .use(selectable)
  .use(week)
  .use(timeRange)
  .use(holidays)
  .use(calendar)

const db = wx.cloud.database();
const app = getApp()



Page({
  data: {
    calendarConfig: {
      theme: 'default',
      weekMode: false,
      showHolidays: true,
      showLunar: true,
      emphasisWeek: true, // 是否高亮显示周末日期
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      showFestival: true, // 显示节日信息（如教师节等），需引入holidays插件
      emphasisWeek: true,
      // chooseAreaMode: true
      defaultDate: "",
      autoChoosedWhenJump: true,

    },
    todos: '',
    todosed: '',
    date: '',
    event:'',
    result:'',
    color:''
  },
  onShow: function (options) {
    console.log(app.globalData.back)
    if(app.globalData.back==1){
      this.afterTapDate(this.data.event)
      app.globalData.back=0
    }
  },
   // 查看当天日程
  afterTapDate(e) {
    this.setData({
      event: e
    })
    var date = e.detail.year + '-' + e.detail.month + '-' + e.detail.date
    this.setData({
      date: date
    })
    db.collection('todos').where({
      date: e.detail.year + '-' + e.detail.month + '-' + e.detail.date,
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          todos: res.data
        })
        console.log(this.data.todos[0])
      },
      fail: err => {
        console.log(err.data)
      }
    })
    db.collection('todosed').where({
      date: e.detail.year + '-' + e.detail.month + '-' + e.detail.date,
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          todosed: res.data
        })
        
      },
      fail: err => {
        console.log(err.data)
      }
    })
  },
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail)
  },
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail)
  },
  takeoverTap(e) {
    console.log('takeoverTap', e.detail)
  },
  // 查看今天日程
  afterCalendarRender(e) {
   
    
    var date = e.detail.calendar.curYear + '-' + e.detail.calendar.curMonth + '-' + e.detail.calendar.curDate
    this.setData({
      date: date
    })
    console.log('afterCalendarRender', e)

    db.collection('todos').where({
      date: date,
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          todos: res.data
        })
      },
      fail: err => {
        console.log(err.data)
      }
    })
    db.collection('todosed').where({
      date: date,
      _openid: app.globalData.openid
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          todosed: res.data
        })
      },
      fail: err => {
        console.log(err.data)
      }
    })
    // 获取日历组件上的 calendar 对象
    // const calendar = this.selectComponent('#calendar').calendar
    // console.log('afterCalendarRender -> calendar', calendar)
  },
  /**
   * 页面上拉触底事件的处理函数  切换周模式
   */
  onReachBottom: function() {
    const calendar = this.selectComponent('#calendar').calendar
    calendar.switchView('week').then(() => { });
  },
  // 切换月模式
  onPullDownRefresh: function() {
    const calendar = this.selectComponent('#calendar').calendar
    calendar.switchView('month').then(() => { });
    
  },
})