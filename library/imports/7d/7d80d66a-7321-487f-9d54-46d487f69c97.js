"use strict";
cc._RF.push(module, '7d80dZqcyFIf51URtSH9pyX', 'tm_index');
// commonScript/tm_index.js

"use strict";

/**
 * 初始化公共代码仓库
 * @type {*|{}}
 */

window.tm = window.tm || {};

tm.destroy = function () {};

tm.init = function () {
    // 系统信息
    tm.systemInfo = {};

    // 启动参数
    tm.launchOptionsInfo = {};

    // 全局监听
    tm.notifierCenter = new tm.NotifierCenter();

    // socketIo
    tm.netSocketIo = new tm.NetSocketCore();

    // 音乐控制
    tm.soundCore = new tm.SoundCore();

    // 错误日志
    tm.notifierCenter.register(tm.Event.APP_CATCH, function (e) {
        tm.LOGD("Error Crash Message:", e.message);
        tm.LOGD("Error Crash Stack:", e.stack);
    }, this);

    // 应用切换到前台
    cc.game.on(cc.game.EVENT_SHOW, function (res) {
        tm.notifierCenter.trigger(tm.Event.EVT_SYS_GAME_SHOW);
    }, this);

    // 应用切换到后台
    cc.game.on(cc.game.EVENT_HIDE, function (res) {
        tm.notifierCenter.trigger(tm.Event.EVT_SYS_GAME_HIDE);
    }, this);

    //
    myAccount.api.init();
};

cc._RF.pop();