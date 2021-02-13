(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/mgr/lc_login_manage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bfee5AcwABCuK5UkboWtXga', 'lc_login_manage', __filename);
// lcGame/scripts/mgr/lc_login_manage.js

"use strict";

/**
 *
 * 内容: 用户登陆管理
 *
 */

window.lc = window.lc || {};

lc.LoginMgr = cc.Class({

    extends: cc.Component,

    properties: {
        _bLogin: false,
        _bCheckLogin: false,
        _playerStatusInfo: null // 玩家状态
    },

    init: function init() {},

    /**
     * 登陆成功
     * @param data
     */
    onLoginSuccess: function onLoginSuccess(data) {
        this.beginCheckLogin();
    },

    /**
     * 释放函数
     */
    onDestroy: function onDestroy() {
        tm.notifierCenter.ignoreScope(this);

        if (lc.game) {
            lc.game.ignoreScope(this);
        }
    },

    /**
     * 开始检测登录
     */
    beginCheckLogin: function beginCheckLogin() {
        if (!this._bCheckLogin) {
            this.schedule(this._stepCheckLogin, 0.1);
        }

        this._bCheckLogin = true;
    },

    /**
     * 登陆成功
     * @private
     */
    _stepCheckLogin: function _stepCheckLogin() {
        if (this._bLogin) {
            this._enterLobbyScene();
        }
    },

    /**
     * 进入大厅
     * @private
     */
    _enterLobbyScene: function _enterLobbyScene() {
        this._cleanUp();
        tm.sceneMgr.preloadScene("pltLobbyScene");
    },

    /**
     * 清除
     * @private
     */
    _cleanUp: function _cleanUp() {
        this.unschedule(this._stepCheckLogin);
        this._bLogin = false;
        this._bCheckLogin = false;
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
        //# sourceMappingURL=lc_login_manage.js.map
        