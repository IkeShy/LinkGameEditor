/**
 *
 * 内容:
 *
 * 所有游戏，应用，独立个体的基类
 *
 */

window.tm = window.tm || {};
tm.BaseAppCore = cc.Class({

    properties:{
        gameId:-1,
        notifierCenter:null,
        modelMgr:null
    },

    ctor:function () {
        this.gameId = arguments[0] || -1;

        this.notifierCenter = new tm.NotifierCenter();

        this.modelMgr = new tm.ModelMgr(this.gameId);

        //注册网络消息
        tm.netSocketIo.registerNetDispatch(this.gameId, this.notifierCenter);
    },

    /**
     *
     * @param eventName
     * @param handler
     * @param scope
     */
    register:function (eventName, handler, scope) {
        this.notifierCenter.register(eventName, handler, scope)
    },

    trigger: function(eventName, params) {
        this.notifierCenter.trigger(eventName, params);
    },

    ignoreScope:function (scope) {
        this.notifierCenter.ignoreScope(scope);
    },

    /**
     * 监听网络请求
     * 例子：
     * this.listenMsg("game_getShareAddBall",           this.onGameConfig,              this);
     */
    listenMsg: function(protocolName, handler, scoper){
        this.modelMgr.listenMsg(protocolName, handler, scoper);
    },

    /**
     * 发送网络请求
     * 例子：
     * this.requestMsg("game_getShareAddBall", {"isOpen": false});
     */
    requestMsg:function (protocolName, params) {
        this.modelMgr.request(protocolName, params);
    },

    ignoreMsg:function (protocolName, handler, scoper) {
        this.modelMgr.ignoreMsg(protocolName, params);
    },

    getModel:function (modelName) {
        return this.modelMgr.fgetModel(modelName);
    },

    destroy: function () {

        this.notifierCenter.destroy();
        this.modelMgr.destroy();
        tm.netSocketIo.removeNetDispatch(this.gameId);

        this._super();
    }

});