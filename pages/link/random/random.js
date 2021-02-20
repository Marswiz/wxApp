// pages/link/random/random.js
let interval;
let chooseInterval;

//音频组件:选择
const choosingAudio = wx.createInnerAudioContext();
choosingAudio.autoplay = false;
choosingAudio.loop = true;
choosingAudio.obeyMuteSwitch = false;
choosingAudio.src = "https://marswiz.com/assets/audio/choosing.mp3";
console.log(choosingAudio.src);
choosingAudio.onPlay(() => {
  console.log('Choosing 音乐播放中...');
});
choosingAudio.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
});

//音频组件:结果1
const resultAudio1 = wx.createInnerAudioContext();
resultAudio1.autoplay = false;
resultAudio1.loop = false;
resultAudio1.obeyMuteSwitch = false;
resultAudio1.src = "https://marswiz.com/assets/audio/result_normal.mp3";
console.log(resultAudio1.src);
resultAudio1.onPlay(() => {
  console.log('Choosing 音乐播放中...');
});
resultAudio1.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
});

//音频组件:结果2
const resultAudio2 = wx.createInnerAudioContext();
resultAudio2.autoplay = false;
resultAudio2.loop = false;
resultAudio2.obeyMuteSwitch = false;
resultAudio2.src = "https://marswiz.com/assets/audio/result_end.mp3";
console.log(resultAudio1.src);
resultAudio2.onPlay(() => {
  console.log('Choosing 音乐播放中...');
});
resultAudio2.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemNum:2,
    items: ['达达','海肠'],
    resultShow:0,
    result: '达达',
    resultNum:0,
    choosing:0,
    boIndex:0,
    boItems: ['BO1', 'BO3', 'BO5', 'BO7', 'BO9'],
    resultArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let a, b;
    let that = this;
    wx.setNavigationBarTitle({
      title: '听骗子说'
    })
    var screenHeight = wx.getSystemInfo({
      success: function (res) {
        a = 0.905 * res.windowHeight;
        b = res.windowWidth;
      }
    });
    this.setData({
      screenHeight: a,
      screenWidth: b
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
    choosingAudio.stop();
    resultAudio1.stop();
    resultAudio2.stop();
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

  numSet:function(e){
    this.setData({
      itemNum: e.detail.value
    });
    console.log(this.data.itemNum);
  },
  itemsSet: function (e) {
    let b = e.detail.value.split(' ');
    for(let i=0;i<b.length;i++){
      if(b[i] == ''){
        b.splice(i,1);
      }
    }
    this.setData({
      items: b
    });
    console.log(this.data.items);
  },
  submit : function(){
    if(this.data.itemNum <= this.data.items.length){
      if(this.data.boIndex == 0){
      this.toggleChoose();
      this.setData({
        resultShow:1,
      });
      }else{
        this.setData({
          resultShow : 1
        }); 
        this.toggleChoose(); 
        let a = setInterval(this.doubleToggleChoose, 1500);
        chooseInterval = a;
      }
    } else {
      wx.showModal({
        title: 'SillyBee~',
        content: "有那么多项嘛.. ",
        cfirmText: "我再改改",
        showCancel: false
      })
    }
  },

  randomPick:function(){
    let a = Math.random();
    let part = 1 / this.data.itemNum;
    for (let i = 0; i < this.data.itemNum; i++) {
      if (a >= i * part && a <= (i + 1) * part) {
        this.setData({
          result: this.data.items[i]
        });
      }
    }
  },

  toggleChoose:function(){
    let a = this.data.choosing;
    this.setData({
      choosing : !a
    });
    if(this.data.choosing){  
      interval = setInterval(this.randomPick, 20);
      choosingAudio.play();
    } else {
      clearInterval(interval);
      choosingAudio.stop();
      if (this.data.resultArray.length < (2 * this.data.boIndex)) {
      resultAudio1.stop();
      resultAudio1.play(); choosingAudio.stop();
      } else {
        resultAudio2.stop();
        resultAudio2.play(); choosingAudio.stop();    
      }
      this.data.resultArray.push(this.data.result);
      let a = this.data.resultArray;
      this.setData({
        resultArray: a
      });
    }
  },

  doubleToggleChoose : function(){
    if (this.data.resultArray.length < (2 * this.data.boIndex)){
    this.toggleChoose();    
    this.toggleChoose();
    } else {
      this.toggleChoose(); 
      clearInterval(chooseInterval);
    }
  },
  
//BO数选择器
  boPickerChange:function(e){   
    this.setData({
      boIndex : e.detail.value
    });
    console.log('BO数设置为' + this.data.boItems[this.data.boIndex]);
  }
})