"use strict";
cc._RF.push(module, 'f9a5bF2wzpJGpuWoAfZ6Dz5', 'tm_socket_error_code');
// commonScript/utils/tm_socket_error_code.js

'use strict';

/**
 * socket 错误码
 * @type {*|{}}
 */

window.tm = tm || {};

tm.socketErrorCode = {
    '2001': '用户未登陆',
    '3001': '客户端错误',
    '3004': '牌桌ID不存在',
    '3005': '用户已经加入牌桌',
    '3011': '金币不足',
    '3101': '发送消息不能为空',
    '3102': '房间不存在',
    '3103': '用户不在桌子上',
    '4001': '用户状态错误',
    '5000': '服务器错误'
};

/**
 *  展示错误码
 * @param code
 */
tm.socketErrorCode.showHit = function (code) {
    tm.socketErrorCode.handle(code);
};

/**
 *  错误码操作
 * @param code
 */
tm.socketErrorCode.handle = function (code) {
    var codeStr = "未知错误";
    if (tm.socketErrorCode[code]) {
        codeStr = tm.socketErrorCode[code];
    }

    switch (code) {
        case 2001:
            tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_DIALOG_BOX, {
                "msg": codeStr,
                "cb": function cb(error, flag) {
                    if (flag) {
                        tm.sceneMgr.preloadScene("pltLoginScene");
                    }
                } });
            break;

        default:
            tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_SM_HINT, codeStr);
            break;
    }
};

cc._RF.pop();