//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ver: app.globalData.ver
  },
  onLoad: function(){
    let a, b;
    wx.setNavigationBarTitle({
      title: '达达与海肠'
    })
    var screenHeight = wx.getSystemInfo({
      success: function (res) {
        a = res.windowHeight;
        b = res.windowWidth;
      }
    });
    this.setData({
      screenHeight: a,
      screenWidth: b
    });
  },
  show: function(){
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
      }
    });
    this.setData({
      latitude: app.globalData.latitude,
      longitude: app.globalData.longitude,
      marker:[{
        id: 1,
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude,
        title: "我在这儿",
        iconPath: "/image/catRight.png",
        width: 35,
        height:35
      }]
    });
  }
})
