let queue = [{
  message: "在干嘛。",
  checked: 1,
  showTools: 0
}, {
  message: "Silly Bee",
  checked: 1,
  showTools: 0
},
{
  message: "汪汪汪。",
  checked: 0,
  showTools: 0
}];
let b;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listItem:queue,
    inputValue: '',
    scrollTop: 0,
    slideStartX:0,
    slideStartY: 0,
    slideEndX: 0,
    slideEndY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let a;
    wx.setNavigationBarTitle({
      title: '小期待'
    })
    var screenHeight = wx.getSystemInfo({
      success: function (res) {
        a = 0.905*res.windowHeight
      }
    });
    this.setData({
      screenHeight: a
    });
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
  },


  /* 提交list*/
  submit: function(){
    let a = queue.push({ 
      message: this.data.inputValue,
      checked: 0,
      showTools: 0
     });
    this.setData({
      listItem: queue,
      scrollTop: this.data.scrollTop + 1 / 7 * 0.8 * this.data.screenHeight
    });
    this.setData({
      inputValue:''
    });
  },
  userInput: function(e){
    this.setData({
      inputValue: e.detail.value
    });
  },

  /*checkbox 点击*/
  check: function(e){
    let index = e.target.dataset.num; //找到对应的listitem 索引
    queue[index].checked = !queue[index].checked;
    this.setData({
      listItem: queue
    });
  },

  /*滑动删除listitem*/
  slideStart:function(e){
    this.setData({
    slideStartX:e.touches[0].clientX,
    slideStartY:e.touches[0].clientY
  });
  },

  slideEnd:function(e){
    this.setData({      
      slideEndX : e.changedTouches[0].clientX,
      slideEndY: e.changedTouches[0].clientY
    });
    let index = e.currentTarget.dataset.order;
    //删除item.
    let x1 = this.data.slideStartX;
    let x2 = this.data.slideEndX;
    let y1 = this.data.slideStartY;
    let y2 = this.data.slideEndY;
    let sh = this.data.screenHeight;
    //设置删除阈值
    if (Math.abs( x1-x2 ) >= 150 && Math.abs(y1-y2) <= 1/7*0.8*sh && this.data.slided==1){
    queue.splice(index, 1);
    this.setData({
      listItem: queue
    });}
    console.log(e.currentTarget.dataset.slided);
  },

  slideItem:function(e){
    this.setData({
      slided:1
    });    
  }
})

