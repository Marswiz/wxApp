//—————————————————————————————————— leancloud 设定——————————————————————————————————————————
// leancloud 引用
const AV = require('./libs/av-weapp-min.js');

// leancloud 初始化
AV.init({
  appId: 'NleawU4gGjhh4yItWNUSkDzB-MdYXbMMI',
  appKey: '2TMndJ4KtuvqDSbETR12PHbd',
});

// leancloud 单词列表配对清单获取函数
const getWordsPairForRender = wordsGot => ({
  id: wordsGot.get('objectId'),
  libId: wordsGot.get('libId'),
  libName: wordsGot.get('libName')
});

// leancloud 单词列表获取函数
const getWordsForRender = wordsGot => ({
  id: wordsGot.get('objectId'),
  word: wordsGot.get('word'),
  wordMeaning: wordsGot.get('wordMeaning')
});

//—————————————————————————————————— leancloud 设定结束——————————————————————————————————————————


Page({

  // 拉取单词列表名称配对库函数: 用于将 单词库的ID 和 单词库的显示中文名 配对。
  loadWordsLibPair: function () {
    let query = new AV.Query('libPair');
    query.limit(1000);
    query.find().then(
      wordsGot => {
        console.log('获取的原始单词列表名称配对库长度为：' + wordsGot.length);
        this.setData({
          wordsLibPair: wordsGot.map(getWordsPairForRender)
        });
        console.log('New wordlistPair loaded end!');
        console.log(this.data.wordsLibPair.length);
      }
    )
      .catch(console.error);
  },

  // 拉取单词列表函数
  loadWords: function (wordLib) {
    let query = new AV.Query(wordLib);
    query.limit(1000);
    query.find().then(
      wordsGot => {
        console.log('获取的原始单词列表长度为：' + wordsGot.length);
        this.setData({
          wordList: wordsGot.map(getWordsForRender)
        });
        console.log('New wordlist loaded end!');
        console.log(this.data.wordList.length);
      }
    )
      .catch(console.error);
  },

  // 深复制
  copy: function(arr){
    let a = new Array();
    for (let i=0;i<arr.length;i++){
      a[i] = arr[i];
    };
    return a;
  },

  // 在0~max 之间随机抽取整数函数 
  roll : function(max){
    let a = Math.random();
    return Math.round(max*a);
  },

  // 从数组中随机抽取任意数目的函数组
  chooseArrayRandomly: function (arr = [], num = 3) {
    //打乱数组顺序
    let getArrRandomly = (arr1) => {
      var len = arr1.length;
      for (var i = len - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemIndex = arr1[randomIndex];
        arr1[randomIndex] = arr1[i];
        arr1[i] = itemIndex;
      }
      return arr;
    };
    //截取打乱后的数组的前10（num）位
    const tmpArr = getArrRandomly(arr);
    let arrList = [];
    for (let i = 0; i < num; i++) {
      arrList.push(tmpArr[i]);
    };
    return arrList;
  },

  // 恢复原有样式函数
  cssReset: function(){
    this.setData({
      itemStyle: ['','','','']
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    bookHeightWeight:0.08,
    itemNum: 4,
    wordLib: 'colins_3400',
    libSelectedName: '柯林斯3400词',
    libSelectedId: 'colins_3400',
    wordList:[],
    wordsForDisturb: [],
    items: [],
    wordSelected: {word: 'Tap To Start!'},
    itemStyle: ['','','','']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let a, b;
    let that = this;
    wx.setNavigationBarTitle({
      title: ''
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 加载单词列表配对信息 和 单词列表
    this.loadWordsLibPair();
    this.loadWords('colins_3400');

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

  // 改变顶端单词库选择器触发函数
  changeLib: function (e) {
    let a = this.data.wordsLibPair[e.detail.value];
    this.setData({
      libSelectedName: a['libName'],
      libSelectedId: a['libId'],
      wordsForDisturb: [],
      items: [],
      itemStyle: ['', '', '', ''],
      wordSelected: { word: 'Tap To Start!' } // 初始化wordSelected
    });

    // 将选择的单词库拉取，并替换现有单词列表wordList
    this.loadWords(this.data.libSelectedId);

  },

  // 切换词汇函数
  changeWord: function(){
    // 选取一个目标单词
    let chooseNum = this.roll(this.data.wordList.length - 1);
    let wordSelectedTemp = this.data.wordList[chooseNum];
    // 选取三个干扰项
    let wordListTemp = this.copy(this.data.wordList);
    console.log(wordListTemp);
    wordListTemp.splice(chooseNum,1);
    let wordsForDisturb = this.chooseArrayRandomly(wordListTemp,3);
    // 目标单词与干扰项合并，打乱，显示
    let itemsTemp = this.chooseArrayRandomly([wordsForDisturb[0], wordsForDisturb[1], wordsForDisturb[2],wordSelectedTemp], 4)
    this.setData({
      wordSelected: wordSelectedTemp,
      wordsForDisturb: wordsForDisturb,
      items: itemsTemp
    });
    this.cssReset();
  },

  // 选择选项触发函数
  chooseItem : function(e){
    let that = this;
    let choosedItemNum = e.target.dataset.chooseditemnum;
    console.log(choosedItemNum);
    if (this.data.items[choosedItemNum].id == this.data.wordSelected.id){
      wx.showToast({
        title: '回答正确！',
        icon: 'success',
        duration: 800,
        success: function(){
          let a = that.copy(that.data.itemStyle);
          a[choosedItemNum] = 'color: #7CCD7C; font-weight: bold;';
          that.setData({
            itemStyle: a
          });
          setTimeout(that.changeWord,600);         
        }
      });  
    } else {
      wx.showToast({
        title: '回答错误！',
        icon: 'none',
        duration: 800,
        success: function(){
          let a = that.copy(that.data.itemStyle);
          a[choosedItemNum] = 'color: tomato; font-weight: bold;';
          that.setData({
            itemStyle: a
          });
        }
      });       
    }
  },

})