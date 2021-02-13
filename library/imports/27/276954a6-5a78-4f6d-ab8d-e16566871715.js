"use strict";
cc._RF.push(module, '27695SmWnhPbauN4WVmhxcV', 'tm_game_wapper');
// commonScript/common/tm_game_wapper.js

"use strict";

/**
 *
 * 经常用到的API,封装，类似语法冰糖
 *
 */

window.tm = window.tm || {};

tm.GameWapper = cc.Class({
    extends: cc.Component,

    properties: {
        gameId: {
            default: 888,
            type: cc.Integer
        }
    },

    ctor: function ctor() {},

    onLoad: function onLoad() {
        this.game = tm.appMgr.getGame(this.gameId);
    },

    onShow: function onShow() {
        this.node.active = true;
    },

    onHide: function onHide() {
        this.node.active = false;
    },

    onCloseFunc: function onCloseFunc() {
        this.onHide();
    },

    onDestroy: function onDestroy() {
        if (tm.notifierCenter) {
            tm.notifierCenter.ignoreScope(this);
        }

        if (this.game) {
            this.game.ignoreScope(this);
        }

        this.game = null;
    },


    /**
     * 触发一个事件
     * @param msg
     * @param opt_params
     */
    trigger: function trigger(msg, opt_params) {
        this.game.trigger.apply(this.game, arguments);
    },

    /**
     * 监听一个事件
     * @param cmd
     * @param handler
     * @param scoper
     */
    register: function register(cmd, handler, scoper) {
        this.game.register(cmd, handler, scoper);
    },

    /**
     * 监听服务器返回消息
     * @param protocolName
     * @param handler
     * @param scoper
     */
    listenMsg: function listenMsg(protocolName, handler, scoper) {
        this.game.listenMsg(protocolName, handler, scoper);
    },

    /**
     * 请求消息
     *
     * @param protocolName
     * @param params
     */
    requestMsg: function requestMsg(protocolName, params) {
        this.game.requestMsg(protocolName, params);
    },

    getModel: function getModel(protocolName) {
        if (!this.game) {
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
    ignoreMsg: function ignoreMsg(protocolName, handler, scoper) {
        this.game.ignoreMsg(protocolName, handler, scoper);
    },

    /***************************Http Api****************************/

    httpGet: function httpGet(url, params, callback, scoper) {
        tm.netHttpCore.get(url, params, callback, scoper);
    },

    httpPost: function httpPost(url, params, callback, scoper) {
        tm.netHttpCore.post(url, params, callback, scoper);
    },

    onVoid: function onVoid() {}
});

module.exports = tm.GameWapper;

cc._RF.pop();