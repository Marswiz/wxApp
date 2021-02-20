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

  /**
   * 页面的初始数据
   */
  data: {
    bookHeightWeight:0.08,
    wordLib: 'colins_3400',
    libSelectedName: '柯林斯3400词',
    libSelectedId: 'colins_3400',

    // ★ 在这里增加需要上传的单词库
    // 格式： 一个单词和单词含义为一组，用二元数组表示，第一个元素是单词，第二个元素是含义，都是字符串格式。
    //       所有单词用','间隔，合并用[]括起来，表示成一个数组，放在wordToUplaod 后面即可。
    wordToUpload: [[' democracy', 'n. 民主，民主主义；民主政治'],
    [' pro-democracy', '支持民主的'],
      [' take to the street', '走上街头（抗议、游行等）'],
      [' baton', 'n. 指挥棒；接力棒；警棍；司令棒 '],
    [' detain', 'vt. 拘留；留住；耽搁'],
    [' demonstrator', 'n. 示威者；论证者；指示者；证明者'],
    [' demonstration', 'n. 示范；证明；示威游行 '],
      [' barricade', 'n. 街垒；路障；争论之处 vt. 设路障；阻碍'],
        [' suspension', 'n. 悬浮；暂停；停职'],
        [' suspend', 'vt. 延缓，推迟；使暂停；使悬浮 vi. 悬浮；禁赛'],
        [' parliament', ' n. 议会，国会'],
        [' rally', 'v. 召集；（军队）重新集合；复原；价格回升；集结；联合；（使）重新振作；参加汽车拉力赛；对……善意打趣；嘲笑 n. 公众集会；汽车拉力赛；往返拍击；止跌回升；竞赛'],
        [' coup', 'n. 政变；妙计；出乎意料的行动；砰然的一击 vt. 使…颠倒；使…倾斜 vi. 推倒；倾斜；溢出'],
        [' set out', '出发；动身；开始；摆放'],
        [' militant', 'adj. 好战的 n. 富有战斗性的人；好斗者；激进分子'],
      [' rebel', 'n. 反叛者，叛徒；叛逆者；反抗权威者 v. 反叛，反抗，造反；抗命；不接受，不听使唤 adj. 反抗的；造反的 n. (Rebel) （美、德、荷、法、俄）勒贝尔（人名）'],
        [' militia', 'n. 民兵组织；自卫队；义勇军；国民军'],
          [' Democratic Republic of Congo', '刚果民主共和国'],
          [' demobilize', ' vt. 遣散；使复员；使退伍（demobilise）'],
          [' undermine', 'vt. 破坏，渐渐破坏；挖掘地基'],
            [' revise', 'vt. 修正；复习；校订 vi. 修订；校订；复习功课 n. 修订；校订'],
            [' decree', 'n. 法令；判决 vt. 命令；颁布；注定；判决 vi. 注定；发布命令'],
            [' legislation', 'n. 立法；法律'],
            [' formula two racing driver', '二级方程式赛车手'],
            [' Secretary of State',' n.国务卿'],
            [' congressional', ' adj. 国会的；会议的；议会的'],
            [' committee', 'n. 委员会'],
            [' intimidate', 'vt. 恐吓，威胁；胁迫'],
            [' bully', 'n. 欺凌弱小者；土霸 adj. [口]第一流的；特好的 vt. 欺负；威吓 vi. 欺侮人 adv. 很；十分'],
            [' impeachment', 'n. 弹劾；控告；怀疑；指摘'],
            [' inquiry', 'n. 探究；调查；质询'],
            [' the House Foreign Affairs Committee', '众议院外交事务委员会'],
            [' controversial', ' adj. 有争议的；有争论的'],
            [' clash', 'n. 冲突，不协调；碰撞声，铿锵声 vi. 冲突，抵触；砰地相碰撞，发出铿锵声 vt. 使碰撞作声'],
            [' corruption', 'n. 贪污，腐败；堕落'],
            [' implication', 'n. 含义；暗示；牵连，卷入'],
            [' volcanic', 'adj. 火山的；猛烈的；易突然发作的 n. 火山岩'],
            [' fire tear gas', '引燃催泪瓦斯'],
            [' protest', 'vi. 抗议；断言 vt. 抗议；断言 n. 抗议 adj. 表示抗议的；抗议性的'],
            [' rule on sth', '对sth作出裁决'],
            [' be due to do sth', '预计做sth；预定做sth；'],
            [' priest', 'n. 牧师；神父；教士 vt. 使成为神职人员；任命…为祭司'],
            [' smuggle', 'vt. 走私；偷运 vi. 走私，私运；偷带'],
      [' metropolitan', 'adj. 大都市的；大主教辖区的；宗主国的 n. 大城市人；大主教；宗主国的公民 '],
      [' stock market have closed 3% down', '股票市场收盘跌落3 %'],
              [' recession', 'n. 衰退；不景气；后退；凹处'],
              [' US goverment bonds', '美国国债'],
              [' inverted yield curve', '反向收益曲线'],
              [' harbinger', 'n. 先驱；前兆；预告者 vt. 预告；充做…的前驱'],
              [' parliamentary ethics commissioner', '议会伦理委员'],
              [' Attorney General', '司法部长'],
              [' settle a criminal case', '结案'],
              [' alleviate', 'vt. 减轻，缓和'],
              [' impact', 'n. 影响；效果；碰撞；冲击力 vt. 挤入，压紧；撞击；对…产生影响 vi. 影响；撞击；冲突；压紧（on，upon，with）'],
              [' presidential primary', '总统预选'],
              [' sustain a defeat', '遭遇失败'],
              [' pristine', 'adj. 崭新的，清新的，干净的；未开发的，原始的'],
              [' contaminate', 'vt. 污染，弄脏'],
              [' interior minister', '内政部长'],
              [' migrant', 'n. （为工作）移居者；候鸟；流动季节工 adj. 有迁徙习性的'],
              [' grant the permission', '授予许可'],
              [' ultimatum', 'n. 最后通牒；最后结论；基本原理'],
              [' legal proceeding', '司法程序'],
              [' penalty', 'n. 罚款，罚金；处罚;'],
              [' exploitation', 'n. 开发，开采；利用；广告推销；剥削'],
              [' cleric', 'n. （基督教的）教牧人员；（任一宗教的）牧师 adj. 牧师的，教士的'],
              [' controversial', 'adj. 有争议的；有争论的'],
              [' religious', 'adj. 宗教的；虔诚的；严谨的；修道的 n. 修道士；尼姑'],
              [' undercover', 'adj. 秘密的，秘密从事的；从事间谍活动的'],
              [' shrine', 'n. 圣地；神殿；神龛；圣祠 vt. 将…置于神龛内；把…奉为神圣'],
              [' carry out', 'vt.执行，实行；贯彻；实现；完成'],
              [' ceremony', 'n. 典礼，仪式；礼节，礼仪；客套，虚礼'],
              [' unrest', 'n. 不安；动荡的局面；不安的状态'],
              [' tackle', 'v. 应付，处理（难题或局面）；与某人交涉；（足球、曲棍球等）抢球；（橄榄球或美式足球）擒抱摔倒；抓获；对付，打（尤指罪犯） n. （足球等中的）抢断球；（橄榄球或美式足球）擒抱摔倒；（美式橄榄球的）阻截队员；体育器械（尤指渔具）；男性性器官'],
              [' grant', 'v. （合法地）授予，允许；（勉强）承认，同意 n. （政府）拨款，补助金；授予，给予；合法转让，正式授予'],
              [' grave', 'n. 墓穴，坟墓；死亡；沉音符；（废旧机器等的）堆积处 adj. 重大的；严肃的；黯淡的；有沉音符的；（乐）缓慢的 v. 雕刻；铭记；拷铲油漆（船底） adv. （乐）缓慢地，庄严地'],
              [' mounting a campaign', '发起一场运动'],
              [' rival', 'n. 竞争对手；可与……匹敌的人；同行者 v. 与…竞争；比得上某人；赶上（某人）；竞争 adj. 竞争的'],
              [' ethical', 'adj. 伦理的；道德的；凭处方出售的 n. 处方药'],
              [' patriotic', 'adj. 爱国的'],
              [' quid pro quo', '（拉丁）补偿物；相等物；交换条件；让步条件'],
              [' encrypt', 'v. 把……加密，将……译成密码'],
              [' chief executive officer', '首席执行官'],
              [' halt', 'v. （使）停止，（使）立定；突然停下；完全停止；（口令）立定；阻止（新闻报道）；跛行；(尤指逻辑或诗韵)有缺陷；踌躇，犹豫 n. 停止；（英）小火车站；跛，瘸；（口令）立定 adj. 跛的，瘸的'],
              [' recipient', 'n. 容器，接受者；容纳者 adj. 容易接受的；容纳的'],
              [' law enforcement agencies', '执法机构'],
              [' child sexual exploitation', '儿童性剥削'],
              [' erode', 'vt. 腐蚀，侵蚀 vi. 侵蚀；受腐蚀'],
              [' rocketry', 'n. 火箭学，火箭技术；火箭（集合称）；火箭研究'],
              [' interstellar', 'adj. [航][天] 星际的'],
              [' interplanetary', 'adj. 太阳系内的；行星间的'],
              [' ferry', 'n. 渡船；摆渡；渡口 vt. （乘渡船）渡过；用渡船运送；空运 vi. 摆渡；来往行驶'],
              [' colony', 'n. 殖民地；移民队；种群；动物栖息地'],
              [' pair with', '与…成对，与…配对'],
              [' orbit', 'n. 轨道；眼眶；势力范围；生活常规 vi. 盘旋；绕轨道运行 vt. 绕…轨道而行'],
              [' squeak', 'vi. 告密；吱吱叫；侥幸成功 n. 吱吱声；机会 vt. 以短促尖声发出']]
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
      libSelectedId: a['libId']
    });
  },

  // 上传词库函数
  uploadWords: function(){
    let that = this;
    for(let i=0; i<this.data.wordToUpload.length; i++){
      let updatedWord = new AV.Object(this.data.libSelectedId);
      updatedWord.set('word', this.data.wordToUpload[i][0]);
      updatedWord.set('wordMeaning', this.data.wordToUpload[i][1]);
      updatedWord.save();
      updatedWord = null;
    };
    console.log(this.data.wordToUpload.length +' 个词汇上传到：'+this.data.libSelectedName+' 完毕！');
    wx.showModal({
      title: 'FINISHED',
      content: String([that.data.wordToUpload.length+' 个词汇上传到：'+that.data.libSelectedName+' 完毕！'])
    })
  },
  
})