//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    row: 12,//扫雷游戏的行数
    column: 8,//扫雷游戏的列数
    bomb: 8,//包含雷的总数
    dialog_warn: false,//通过修改此数据值，改变弹框的显示状态
    dialog_suc: false, //游戏成功，设为true，视图层通过wx:if来判断是否渲染该弹窗
    count: null,//翻牌计数，初始值为app.row*app.column
    gamearr: [],//游戏地图的基础数据（二维数组），根据此来生成游戏
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
  setgamearr: function (row, column, bomb) {//根据行列设置游戏二维数组（地图）
    var that = this;
    var arrmap = [];//二维初始数组，全为空
    for (var i = row - 1; i >= 0; i--) {
      arrmap[i] = [];
      for (var j = column - 1; j >= 0; j--) { arrmap[i][j] = { val: "", cover: true }; }//val用来记录周边雷的数量，cover用来记录是否翻开：无dom操作只能用数据记录状态
    }
    var arr = [];//一维自然数
    for (var k = row * column - 1; k >= 0; k--) { arr[k] = k }
    //随机炸弹位置
    for (var h = bomb - 1; h >= 0; h--) {
      var seat = arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
      var r = Math.floor(seat / column), c = Math.floor(seat % column);
      //console.log(seat+'\n'+r+","+c);
      arrmap[r][c].val = "B";
      arrmap = that.addcount(r, c, arrmap)//给炸弹周围九宫格增加标记数
    }
    that.setData({ gamearr: arrmap })
  },
  addcount: function (r, c, arrmap) {
    var that = this;
    if (r - 1 >= 0) {//九宫格上三个
      if (c - 1 >= 0 && arrmap[r - 1][c - 1].val != "B") { arrmap[r - 1][c - 1].val++ }
      if (arrmap[r - 1][c].val != "B") { arrmap[r - 1][c].val++ }
      if (c + 1 < app.column && arrmap[r - 1][c + 1].val != "B") { arrmap[r - 1][c + 1].val++ }
    }
    if (r + 1 < app.row) {//九宫格下三个
      if (c - 1 >= 0 && arrmap[r + 1][c - 1].val != "B") { arrmap[r + 1][c - 1].val++ }
      if (arrmap[r + 1][c].val != "B") { arrmap[r + 1][c].val++ }
      if (c + 1 < app.column && arrmap[r + 1][c + 1].val != "B") { arrmap[r + 1][c + 1].val++ }
    }
    //九宫格左右两个
    if (c - 1 >= 0 && arrmap[r][c - 1].val != "B") { arrmap[r][c - 1].val++ }
    if (c + 1 < app.column && arrmap[r][c + 1].val != "B") { arrmap[r][c + 1].val++ }
    return arrmap;
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
