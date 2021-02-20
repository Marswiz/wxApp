// leancloud 引用
const AV = require('./libs/av-weapp-min.js');

// leancloud 初始化
AV.init({
  appId: "q6l2lJWXpU3O6byuVroJe7fz-MdYXbMMI",
  appKey: "Nk6G5G3b8axLfDJeieFU2rc6"
});

// leancloud 福利券获取函数
const getDataForRender = couponsGot => ({
  couponId: couponsGot.get('objectId'),
  couponName: couponsGot.get('couponName'),
  couponNum: couponsGot.get('couponNum'),
  createdAt: couponsGot.get('createdAt').toLocaleString(),
  updatedAt: couponsGot.get('updatedAt').toLocaleString(),
  couponOwner: couponsGot.get('couponOwner'),
  couponContent: couponsGot.get('couponContent'),
  couponOwnerID: couponsGot.get('couponOwnerID'),
  verifiedNum: couponsGot.get('verifiedNum')
});


Page({

  coupons: [],

  loadCoupons: function(){
    let query = new AV.Query('coupons');
    query.notEqualTo('couponNum','0');
    query.find().then(
        couponsGot => {
          this.setData({
            coupons: couponsGot.map(getDataForRender)
          });
        }
      )
      .catch(console.error);
  },

  bindGetUserInfo: function(e){

  },

  /**
   * 页面的初始数据
   */
  data: {
    coupons:[],
    id: 'noID'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let thatt = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
              thatt.setData({
                id: res.userInfo.nickName
              });
            }
          })
        }
      }
    });

    wx.setNavigationBarTitle({
      title: '大小宝 ★ Coupons'
    });

    let a, b;
    let that = this;
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
    this.loadCoupons();
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

  // 福利券使用函数
  couponUse: function(e){
    let that = this;
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.num;
    let owner = item.couponOwner;

    if (item.verifiedNum > 0){
      if ((owner == '刘揣子' && that.data.id == 'm.liu') || (owner == '姚大宝' && that.data.id == 'Ｍars')){
        wx.showModal({
          title: ['确认使用 【',item.couponName,'】1张 ？'].toString().replace(/,/g,''),
          content: item.couponContent,
          success(res) {        
            if (res.confirm) {
              // 确定使用后操作
              let updatedCoupon = AV.Object.createWithoutData('coupons', item.couponId);
              updatedCoupon.set('couponNum',(item.couponNum-1).toString());
              console.log(updatedCoupon);
              updatedCoupon.save();
              
              // 更新数据
              let newCoupon = that.data.coupons;
              newCoupon[index].couponNum--;
              that.setData({
                coupons: newCoupon
              });

              wx.showToast({
                title: '使用成功！',
                icon: 'none'
              });        
            } else if (res.cancel) {
              // 取消后操作
              wx.showToast({
                title: '那就再考虑考虑叭~',
                icon: 'none'
              })
            }
          }
        });
      } else if (owner == '刘揣子' && that.data.id == 'Ｍars') {
        wx.showToast({
          title: '不许偷摸使用小宝的券哦~',
          icon: 'none'
        });
      } else if (owner == '姚大宝' && that.data.id == 'm.liu') {
        wx.showToast({
          title: '不许偷摸使用大宝的券哦~',
          icon: 'none'
        });
      }
    }
  },
  verify: function(e){
    
    let that = this;
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.num;
    let owner = item.couponOwner;

    if ((owner == '刘揣子' && that.data.id == 'Ｍars') || (owner == '姚大宝' && that.data.id == 'm.liu')) {
      // 弹出确认提示框
      wx.showModal({
        title: ['确认发放【', item.couponName, '】',item.couponNum,'张 ？'].toString().replace(/,/g, ''),
        content: [item.couponContent, '发放后即刻生效，不许反悔。'].toString().replace(/,/g, ''),
        success(res) {
          if (res.confirm) {
            // 确定使用后操作
            let updatedCoupon = AV.Object.createWithoutData('coupons', item.couponId);
            updatedCoupon.set('verifiedNum', Number(item.couponNum));
            console.log(updatedCoupon);
            updatedCoupon.save();

            // 更新数据
            let newCoupon = that.data.coupons;
            newCoupon[index].verifiedNum = newCoupon[index].couponNum;
            newCoupon[index].createdAt = (new Date()).toLocaleDateString();
            that.setData({
              coupons: newCoupon
            });

            wx.showToast({
              title: '√ 已确认，即刻生效，反悔是小狗。',
              icon: 'none'
            });
          } else if (res.cancel) {
            // 取消后操作
            wx.showToast({
              title: '那就再考虑考虑叭~',
              icon: 'none'
            })
          }
        }
      });

    }
    else if (owner == '刘揣子' && that.data.id == 'm.liu'){

    } else if (owner == '姚大宝' && that.data.id == 'Ｍars'){

    }
  }
});



