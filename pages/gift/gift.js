//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '不要点我',
    userInfo: {},
    map: {
      1: '男',
      2: '女',
      3: '男',
    },
    hasUserInfo: false,
    clickNum: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  clickMe: function () {
    this.setData({ clickNum: this.data.clickNum + 1 });
    var temp = this.data.userInfo;

    switch (this.data.clickNum) {
      case 0:
        this.setData({ motto: "真的不要点我了" });
        break;
      case 1:
        this.setData({ motto: "你再点一次试试" });
        break;
      case 2:
        this.setData({ motto: "再点 我就改你名字" });
        break;
      case 3:
        this.setData({ motto: "😏😏  知道厉害了吧" });
        temp.nickName = '看我 改你名字了';
        this.setData({
          userInfo: temp,
        })
        break;
      case 4:
        temp.gender = temp.gender + 1;
        this.setData({
          userInfo: temp,
        })
        this.setData({ motto: "我真无奈" });
        break;
      case 5:
        this.setData({ motto: "好的 你赢了" });
 
        break;
      default:
        this.setData({ motto: "不要点我" });
        this.setData({ clickNum: 0 });
        this.setData({
          userInfo: app.globalData.userInfo,
        })
        break;
    }
    console.log(this.data.clickNum);
  },
  goHome() {
    wx.navigateTo({
      url: '../test/index'
    })
  },
  onLoad: function () {
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
