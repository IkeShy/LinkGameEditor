/**
 *
 * 内容: 平台App
 *
 */
require("../msgProtocol/lc_protocol_main");

require("../mgr/lc_login_manage");
require("../mgr/lc_game_manage");
require("../mgr/lc_game_assets_manager");
require("../mgr/lc_game_compoent_factory");
require("../mgr/lc_game_sweets_factory");
require("../mgr/lc_game_prop_factory");
require("../mgr/lc_game_item_factory");
require("../mgr/lc_game_hinder_factory");
require("../mgr/lc_game_map_manage");
require("../mgr/lc_game_level_manage");

window.lc = window.lc || {};
lc.AppCore = cc.Class({

    extends: tm.BaseAppCore,

    properties:{
        loginMgr : null, //登陆管理器
        gameMgr: null,  // 游戏管理器
        comFactory: null, // 组件工厂

        localDt:{
            get (){
                return this._localDt;
            }
        }
    },

    ctor:function () {
        //平台协议、消息初始化
        lc.msgProtocol.init();

        //服务器时间
        this.timeStamp = 0;
        this._localDt = 0;

        this.initListen();
    },
    
    init:function () {
        //注册网络消息事件
        this.modelMgr.init(lc.msgProtocol.msg, this.notifierCenter);

        this.asssetMgr = new lc.GameAsssetsMgr();
        this.asssetMgr.init();

        // 登陆管理器
        this.loginMgr = new lc.LoginMgr();
        this.loginMgr.init();

        // 游戏管理器
        this.gameMgr = new lc.GameMgr();
        this.gameMgr.init();

        // 组件工厂
        this.comFactory = new lc.GameCompoentFactory();
        this.comFactory.init();

        // 关卡管理器
        this.levelMgr = new lc.GameLevelMgr();
        this.levelMgr.init();
    },

    /**
     * 初始化监听
     */
    initListen () {
        // 资源加载完毕
        tm.notifierCenter.register(tm.Event.EVT_RES_RELOAD_FINISH, this.onResLoadFinish,this);

    },

    /**
     * 资源加载完毕 在这里进行需要用到瑜伽在资源的工厂初始化处理
     */
    onResLoadFinish: function () {

        // 糖果工厂
        this.sweetsFactory = new lc.GameSweetsFactory();
        this.sweetsFactory.init();

        // 地图工厂
        this.mapMgr = new lc.GameMapMgr();
        this.mapMgr.init();

        // 障碍物工厂
        this.hinderFactory = new lc.GameHinderFactory();
        this.hinderFactory.init();

        // 道具工厂
        this.propFactory = new lc.GamePropFactory();
        this.propFactory.init();

        // 对象工厂
        this.itemFactory = new lc.GameItemFactory();
        this.itemFactory.init();

    },

    setServerTimeStamp(t){
        this.timeStamp = t;

        this._localDt = new Date().getTime() - t;

        tm.LOGD("lc.AppCore ms localDt: ", this._localDt);
    },

    getServerTimeStamp(){
        return this.timeStamp;
    },

    destroy : function () {
        if(this.loginMgr && this.loginMgr.destroy){
            this.loginMgr.destroy();
        }

        if(this.gameMgr && this.gameMgr.destroy){
            this.gameMgr.destroy();
        }
    }
});