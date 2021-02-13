/**
 *
 * 经常用到的API,封装，类似语法冰糖
 *
 */

window.tm = window.tm || {};

tm.GameWapper = cc.Class({
    extends: cc.Component,

    properties: {
        gameId:{
            default: 888,
            type: cc.Integer
        }
    },

    ctor:function () {

    },

    onLoad:function () {
        this.game = tm.appMgr.getGame(this.gameId);
    },

    onShow: function () {
        this.node.active = true;
    },

    onHide: function () {
        this.node.active = false;
    },

    onCloseFunc: function () {
        this.onHide();
    },

    onDestroy(){
        if(tm.notifierCenter){
            tm.notifierCenter.ignoreScope(this);
        }

        if(this.game){
            this.game.ignoreScope(this);
        }

        this.game = null;
    },

    /**
     * 触发一个事件
     * @param msg
     * @param opt_params
     */
    trigger: function (msg, opt_params) {
        this.game.trigger.apply(this.game, arguments);
    },

    /**
     * 监听一个事件
     * @param cmd
     * @param handler
     * @param scoper
     */
    register: function (cmd, handler, scoper) {
        this.game.register(cmd, handler, scoper);
    },

    /**
     * 监听服务器返回消息
     * @param protocolName
     * @param handler
     * @param scoper
     */
    listenMsg: function(protocolName, handler, scoper){
        this.game.listenMsg(protocolName, handler, scoper);
    },

    /**
     * 请求消息
     *
     * @param protocolName
     * @param params
     */
    requestMsg: function(protocolName, params){
        this.game.requestMsg(protocolName, params);
    },


    getModel: function(protocolName){
        if(!this.game){
            return;
        }
        return this.game.getModel(protocolName);
    },

    /**
     * 取消监听服务器返回消息
     * @param protocolName
     * @param handler
     * @param scoper
     */
    ignoreMsg: function(protocolName, handler, scoper){
        this.game.ignoreMsg(protocolName, handler, scoper);
    },

    /***************************Http Api****************************/

    httpGet:function(url, params, callback, scoper){
        tm.netHttpCore.get(url, params, callback, scoper);
    },

    httpPost:function(url, params, callback, scoper){
        tm.netHttpCore.post(url, params, callback, scoper);
    },
    
    onVoid:function () {
        
    }
});

module.exports = tm.GameWapper;