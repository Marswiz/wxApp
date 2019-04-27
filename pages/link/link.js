// pages/link/link.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marsPhoneNum : '17743513537',
    daPhoneNum : '18610818986'  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let a,b;
    wx.setNavigationBarTitle({
      title: '小连线'
    })
    var screenHeight = wx.getSystemInfo({
      success: function (res) {
        a = 0.905*res.windowHeight;
        b = res.windowWidth;
      }
    });
    this.setData({
      screenHeight: a,
      screenWidth: b
    });
  },

  callMars:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.marsPhoneNum
    });
  },

  callDa: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.daPhoneNum
    });
  },

  toRandom:function(){
    wx.navigateTo({
      url: './random/random'
    });
  },

  toFood: function () {
    wx.navigateTo({
      url: './food/food'
    });
    
  },
  toList: function () {
    wx.navigateTo({
      url: './thingList/thingList'
    });

  },
})