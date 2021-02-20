// pages/link/loseWeight/loseWeight.js

//—————————————————————————————————— leancloud 设定——————————————————————————————————————————
// leancloud 引用
const AV = require('./libs/av-weapp-min.js');

// leancloud 初始化
  AV.init({
    appId: 'YBCmzLGKstH4kD3dH7WPLtf0-MdYXbMMI',
    appKey: 'oBrsYM2mX3XW4Q3vSRaSaEiQ',
  });

// leancloud 食物列表获取函数
  const getDataForRender = foodsGot => ({
    id: foodsGot.get('objectId'),
    name: foodsGot.get('foodName'),
    fat: foodsGot.get('fat'),
    pro: foodsGot.get('protein'),
    cab: foodsGot.get('sugar')
  });

// leancloud 历史数据获取函数
const getDataForRender1 = recordGot => ({
  date: recordGot.get('date'),
  dailyData: recordGot.get('data')
});
//—————————————————————————————————— leancloud 设定结束——————————————————————————————————————————

// 标准设定：--------------------------------------------

  let standSet = [105.68, 176.13, 40.8];
  let propSaved = ['totalFat', 'date', 'color', 'sheng', 'rows', 'standard', 'totalPro','totalCab'];

// 标准设定完毕------------------------------------------

function addStr(arr1,str2){
  let a = arr1;
  a.push(str2);
  return a;
}

Page({

  // 拉取食物列表函数
  loadFoods: function () {
    let query = new AV.Query('foods');
    query.limit(1000);
    query.find().then(
      foodsGot => {
        console.log('获取的原始食物长度为：'+foodsGot.length);
        this.setData({
          foods: foodsGot.map(getDataForRender)
        });
        console.log('New foodlist loaded end!');
        console.log(this.data.foods.length);
      }
    )
      .catch(console.error);
  },

  // 拉取某日历史数据函数
  loadRecord: function (date) {
    let query = new AV.Query('dailyRecord');
    query.equalTo('date',date);
    query.find().then(
      recordGot => {
        this.setData({
          recordLoaded: recordGot.map(getDataForRender1)
        });
        if (this.data.recordLoaded[0] != undefined){
          let info = addStr(['★ Copyright © 2019 Mars. All rights reserved.'], '★ ' + this.data.date + ' Data Loaded.');
          this.setData({'recordLoaded[0].dailyData.tip' :info});
          this.setData(this.data.recordLoaded[0].dailyData);
          console.log(this.data.date+' loaded!');
        } else {
          this.setData({
            rows: [[0, '无名美食', 0, 0, 0, 0]],
            date: this.data.date,
            totalPro: 0,
            totalFat: 0,
            totalCab: 0,
            standard: standSet,
            sheng: standSet,
            color: ['green', 'green', 'green'],
            tip: addStr(['★ Copyright © 2019 Mars. All rights reserved.'], '★ No Original Data Found.')
          });
        }
      }
    )
      .catch(console.error);
  },

  /**
   * 页面的初始数据
   */
  data: {
    rows: [[0,'无名美食',0,0,0,0]],
    date: '',
    totalPro: 0,
    totalFat: 0,
    totalCab: 0,
    standard: standSet,
    sheng: standSet,
    color:['green','green','green'],
    tip: ['★ Copyright © 2019 Mars. All rights reserved.']
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
    
    // 拉取foods列表
    this.loadFoods();

    let that = this;
    
    this.setData({
      date: '【务必先选择日期】',
    });
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

  addRow: function(e){
    let b = this.data.foods[e.detail.value];
    let a = this.data.rows;
    a.push([a.length,b.name, b.pro, b.cab, b.fat, 0]);
    this.setData({
      rows: a
    });

    // 计算修改total值
    let d = this.data.rows;
    let t_pro = 0, t_cab = 0, t_fat = 0;
    for (let i = 0; i < d.length; i++) {
      t_pro += d[i][2] * d[i][5] / 100;
      t_cab += d[i][3] * d[i][5] / 100;
      t_fat += d[i][4] * d[i][5] / 100;
    }
    this.setData({
      totalPro: t_pro.toFixed(2),
      totalFat: t_fat.toFixed(2),
      totalCab: t_cab.toFixed(2),
      sheng: [(this.data.standard[0] - t_pro).toFixed(2), (this.data.standard[1] - t_cab).toFixed(2), (this.data.standard[2] - t_fat).toFixed(2)]
    });

    for (let i = 0; i < this.data.sheng.length; i++) {
      if (this.data.sheng[i] < 0) {
        let a = this.data.color;
        a[i] = 'tomato';
        this.setData({
          color: a
        });
      } else {
        let a = this.data.color;
        a[i] = 'green';
        this.setData({
          color: a
        });
      }
    }
  },

  rmvRow: function () {
    let a = this.data.rows;
    a.pop();
    this.setData({
      rows: a
    });

    // 计算修改total值
    let d = this.data.rows;
    let t_pro = 0, t_cab = 0, t_fat = 0;
    for (let i = 0; i < d.length; i++) {
      t_pro += d[i][2] * d[i][5] / 100;
      t_cab += d[i][3] * d[i][5] / 100;
      t_fat += d[i][4] * d[i][5] / 100;
    }
    this.setData({
      totalPro: t_pro.toFixed(2),
      totalFat: t_fat.toFixed(2),
      totalCab: t_cab.toFixed(2),
      sheng: [(this.data.standard[0] - t_pro).toFixed(2), (this.data.standard[1] - t_cab).toFixed(2), (this.data.standard[2] - t_fat).toFixed(2)]
    });

    for (let i = 0; i < this.data.sheng.length; i++) {
      if (this.data.sheng[i] < 0) {
        let a = this.data.color;
        a[i] = 'tomato';
        this.setData({
          color: a
        });
      } else {
        let a = this.data.color;
        a[i] = 'green';
        this.setData({
          color: a
        });
      }
    }
  },

  change: function (e) {
    // 定點修改data參數
    let a = e.target.dataset['pos1'];
    let b = e.target.dataset['pos2'];
    let c = this.data.rows;
    c[a][b] = e.detail.value;
    this.setData({
      rows: c
    }); 

    // 计算修改total值
    let d = this.data.rows;
    let t_pro = 0, t_cab = 0,t_fat = 0;
    for (let i=0; i<d.length; i++){
      t_pro += d[i][2] * d[i][5] / 100;
      t_cab += d[i][3] * d[i][5] / 100;
      t_fat += d[i][4] * d[i][5] / 100;
    }
    this.setData({
      totalPro: t_pro.toFixed(2),
      totalFat: t_fat.toFixed(2),
      totalCab: t_cab.toFixed(2),
      sheng: [(this.data.standard[0] - t_pro).toFixed(2), (this.data.standard[1] - t_cab).toFixed(2), (this.data.standard[2] - t_fat).toFixed(2)]
    });

    for (let i=0; i<this.data.sheng.length; i++){
      if(this.data.sheng[i] < 0){
        let a = this.data.color;
        a[i] = 'tomato';
        this.setData({
          color: a
        });
      } else {
        let a = this.data.color;
        a[i] = 'green';
        this.setData({
          color: a
        });
      }
    }
  },

  changeDate: function(e){
    this.setData({
      date: e.detail.value
    });    

    // 自动载入
    let that = this;
    let b = this.data.date;
    if (b === '【务必先选择日期】') {
      console.log(this.data.tip);
      this.setData({
        tip: addStr(['★ Copyright © 2019 Mars. All rights reserved.'],'★ Please Select the Date First.')
      });
      return;
    };

    // 载入食物库
    this.loadFoods();

    // 载入当日饮食记录
    this.loadRecord(b);

// 原从webStorage 加载当日饮食情况函数，需修改成从leancloud加载。
    // wx.getStorage({
    //   key: b,
    //   success: function (res) {
    //     let info = addStr(['★ Copyright © 2019 Mars. All rights reserved.'], '★ ' + that.data.date + ' Data Loaded.');
    //     let resu = res.data;
    //     resu.tip = info;
    //     that.setData(resu);
    //     console.log(resu);
    //   },
    //   fail: function () {
    //     that.setData({
    //       rows: [[0, '无名美食', 0, 0, 0, 0]],
    //       date: that.data.date,
    //       totalPro: 0,
    //       totalFat: 0,
    //       totalCab: 0,
    //       standard: standSet,
    //       sheng: standSet,
    //       color: ['green', 'green', 'green'],
    //       tip: addStr(['★ Copyright © 2019 Mars. All rights reserved.'], '★ No Original Data Found.')
    //     });
    //   }
    // });
// ________________________________________________________________________________________________________________
  },

  save: function(){

      let that = this;
      let a = this.data.date;
      let b = this.data.foods;
      let c = this.data.rows;

      // 自动保存库中没有的食物
      let foodList =[];
      for (let t = 0; t < b.length; t++) {
        foodList.push(b[t].name);
      }

      for (let i=0; i<c.length; i++){
        let ifHas = foodList.some(
          function(item,index,array){
            return (item == c[i][1]);
          }
        );

        // 确定食物库中没有，则向库中添加
        if (!ifHas){
          let updatedFood = new AV.Object('foods');
          updatedFood.set('protein', Number(c[i][2]));
          updatedFood.set('fat', Number(c[i][4]));
          updatedFood.set('sugar', Number(c[i][3]));
          updatedFood.set('foodName', c[i][1]);
          console.log('食物【'+c[i][1]+'】因为库里没有，已经上传!');
          updatedFood.save();

          // 防止点击过快拉取食物表单更新不及时，等时间间隔拉取进行确认，直到食物表单更新完成
          let loadInterval = setInterval(function () {
            if (that.data.foods == b) {
              that.loadFoods();
              console.log('foods reloaded');
            } else {
              clearInterval(loadInterval);
              console.log('interval canceled');
            }
          }, 500);   

          // APP下方提示栏提示
          let info = '★ 食物【' + c[i][1] + '】已经被添加进食物库。';
          that.setData({
            tip: addStr(that.data.tip, info)
          });
        };
      };

   

      // 根据是否选择了日期，更新提示栏
      if (a === '【务必先选择日期】') {
        console.log(this.data.tip);
        this.setData({
          tip: addStr(['★ Copyright © 2019 Mars. All rights reserved.'], '★ Please Select the Date First.')
        });
        console.log(that.data.tip);
        return;
      };

      // 保存当日数据      
      let query = new AV.Query('dailyRecord');
      query.equalTo('date', a);
      query.find().then(res => {
        if (res.length != 0){    
          let recordId = res[0].id;
          let updatedRecord = AV.Object.createWithoutData('dailyRecord', recordId);

          let dataRecorded = {};
          for (let i = 0; i < propSaved.length; i++) {
            dataRecorded[propSaved[i]] = that.data[propSaved[i]];
          };        
            
          updatedRecord.set('data', dataRecorded);
          updatedRecord.save();          
          console.log('日期：'+ a +'data found and modified.'); 
        } else {
          let updatedRecord = new AV.Object('dailyRecord');

          let dataRecorded = {};
          for (let i = 0; i < propSaved.length; i++) {
            dataRecorded[propSaved[i]] = that.data[propSaved[i]];
          };

          updatedRecord.set('date', a);
          updatedRecord.set('data', dataRecorded);
          updatedRecord.save();
          console.log('日期：'+ a + '新的饮食记录存储了！');
        }
        }).catch(console.error);
        
      let info = '★ ' + this.data.date + ' Data Saved.';
      console.log(that.data.tip);
      that.setData({
        tip: addStr(that.data.tip, info)
      });
      console.log(this.data.date + 'data Saved!');
  },

  load: function(){
    let that = this;
    let b = this.data.date;
    if (b === '【务必先选择日期】'){
      this.setData({
        tip: addStr(['★ Copyright © 2019 Mars. All rights reserved.'], '★ Please Select the Date First.')            
      });
      return;
    }    
    wx.getStorage({
      key: b,
      success: function(res) {
        that.setData(res.data);
        console.log(res.data);
        let info = '★ ' + that.data.date + ' Data Loaded.';
        that.setData({
          tip: addStr(that.data.tip, info)   
        });
      },
      fail: function(){
        that.setData({
          rows: [[0, '无名美食', 0, 0, 0, 0]],
          date: that.data.date,
          totalPro: 0,
          totalFat: 0,
          totalCab: 0,
          standard: standSet,
          sheng: standSet,
          color: ['green', 'green', 'green'],
          tip: addStr(['★ Copyright © 2019 Mars. All rights reserved.'], '★ No Original Data Found.')        
        });
      }
    });
  }
})