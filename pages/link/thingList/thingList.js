// pages/link/thingList/thingList.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

thingList:{
    '0': ['钱包','牙刷','洗漱包','毛巾','衣服','袜子','U型枕','充电宝','充电接头','数据线','纸质笔记本','伞（视天气情况)','笔','挂耳咖啡包','纸杯','降噪耳麦','面巾纸','书','奥利司他'],
    '1': ['钱包', '旅游年卡', '牙刷', '洗漱包', '润肤霜', '防晒霜', '毛巾', '衣服+袜子', 'U型枕', '游泳套装', '充电宝', '充电接头', '旅行电水壶', '小音箱', '数据线', '伞（视天气情况）', '挂耳咖啡包', '纸杯', '降噪耳麦', '润唇膏', '面巾纸', '创可贴', '奥利司他', '润滑油', 'TT', '防过敏喷雾', '沐浴用品', '自封袋'],
    '2': ['钱包(身份证、银行卡、换好的现金)', '防抢腰包', '护照+签证', '当地电话卡','取卡针','免冲洗手液', '电源转换接头', '旅行攻略', '牙刷', '洗漱包', '旅行电水壶', '润肤霜 (<100ml）', '防晒霜 (<100ml）', '毛巾', '衣服+袜子', '人字拖', 'U型枕', '游泳套装', '药品（止泻、抗过敏、止痛）', '驱蚊液', '充电宝', '充电接头', '小音箱', '数据线', '伞（视天气情况）', '挂耳咖啡包', '纸杯', '降噪耳麦', '润唇膏', '面巾纸', '创可贴', '奥利司他', '润滑油', 'TT', '防过敏喷雾', '沐浴用品', '自封袋'],
    '3':['牙刷','毛巾','田字格本','笔','Mars面霜','钱包','充电宝和线','耳机','手机']
},

checked:{
  '0':[],
  '1':[],
  '2':[],
  '3':[]
},

lists:['出差','国内旅行','国外旅行','小宝'],

listSelect:0

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  // 初始化列表check情况：均为false

    let c=[];
    let d = this.data.checked;
    for (let j=0;j<3;j++){
      for (let i = 1; i <= this.data.thingList[j].length; i++) {
        c.push(0);
      };
      d[j] = c;
      c = [];
    };

    this.setData({
      checked: d
    });
    console.log(this.data.checked);
    console.log(this.data.thingList[this.data.listSelect].length);
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

  },

  changeList: function (e) {
    this.setData({
      listSelect: e.detail.value
    });
  },

  checkClear: function () {
    let c = [];
    for (let i = 1; i <= this.data.thingList[this.data.listSelect].length; i++) {
      c.push(0);
    };

    let d = this.data.checked;
    d[this.data.listSelect] = c;

    this.setData({
      checked: d
    });
    console.log(this.data.checked);
    console.log(this.data.thingList[this.data.listSelect].length);
  },

  check:function(e){
    let index = e.target.dataset.num;
    let d = this.data.checked;
    d[this.data.listSelect][index] = !d[this.data.listSelect][index];
    this.setData({
      checked:d
    });
    // this.checked[this.data.listSelect](index)
    console.log(this.data.checked);
  }

})