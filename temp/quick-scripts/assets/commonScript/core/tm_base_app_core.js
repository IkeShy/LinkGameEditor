(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/core/tm_base_app_core.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '76249mjrAxAoKfm62wz0tF+', 'tm_base_app_core', __filename);
// commonScript/core/tm_base_app_core.js

"use strict";

/**
 *
 * 内容:
 *
 * 所有游戏，应用，独立个体的基类
 *
 */

window.tm = window.tm || {};
tm.BaseAppCore = cc.Class({

    properties: {
        gameId: -1,
        notifierCenter: null,
        modelMgr: null
    },

    ctor: function ctor() {
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
    register: function register(eventName, handler, scope) {
        this.notifierCenter.register(eventName, handler, scope);
    },

    trigger: function trigger(eventName, params) {
        this.notifierCenter.trigger(eventName, params);
    },

    ignoreScope: function ignoreScope(scope) {
        this.notifierCenter.ignoreScope(scope);
    },

    /**
     * 监听网络请求
     * 例子：
     * this.listenMsg("game_getShareAddBall",           this.onGameConfig,              this);
     */
    listenMsg: function listenMsg(protocolName, handler, scoper) {
        this.modelMgr.listenMsg(protocolName, handler, scoper);
    },

    /**
     * 发送网络请求
     * 例子：
     * this.requestMsg("game_getShareAddBall", {"isOpen": false});
     */
    requestMsg: function requestMsg(protocolName, params) {
        this.modelMgr.request(protocolName, params);
    },

    ignoreMsg: function ignoreMsg(protocolName, handler, scoper) {
        this.modelMgr.ignoreMsg(protocolName, params);
    },

    getModel: function getModel(modelName) {
        return this.modelMgr.fgetModel(modelName);
    },

    destroy: function destroy() {

        this.notifierCenter.destroy();
        this.modelMgr.destroy();
        tm.netSocketIo.removeNetDispatch(this.gameId);

        this._super();
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=tm_base_app_core.js.map
        