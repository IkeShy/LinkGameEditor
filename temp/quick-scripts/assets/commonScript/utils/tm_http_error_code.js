(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/utils/tm_http_error_code.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '32908VtUIVOnrVT36OpfrES', 'tm_http_error_code', __filename);
// commonScript/utils/tm_http_error_code.js

"use strict";

/**
 * http 错误码
 * @type {*|{}}
 */

window.tm = tm || {};

tm.httpErrorCode = {
    "1000": '手机号格式有误',
    "1001": '该用户不存在',
    "1002": '密码错误',
    "1003": '手机号格式有误',
    "1004": '手机号或密码错误',
    "1100": '手机号或验证码不能为空',
    "1101": '邀请码有误',
    "1102": '验证码有误',
    "1103": '注册失败',
    "1104": '该手机号已存在，请直接登陆',
    "1105": '请稍后再试',
    "1109": '短信发送失败',
    "1200": '该手机号不存在，请检查',
    "1300": '两次输入的密码不一致',
    "1301": '修改密码失败',
    "1302": '修改昵称失败',
    "1303": '修改性别失败',
    "1304": '修改头像失败',
    "1305": '暂无本场战绩',
    "1400": '兑换失败',
    "1401": '短信验证码发送失败',
    "1402": '登录密码错误',
    "1403": 'iet密码错误',
    "1404": '用户余额信息有误',
    "1405": '积分不足',
    "1406": '金币不足',
    "1407": '验证码有误',
    "1408": '该登陆手机号未注册IET系统',
    "1410": '订单不存在或者已经支付',
    "1411": '充值失败',
    "1412": '提现失败',
    "6000": 'token过期或者有误',
    "6001": '用户信息有误'
};

tm.httpErrorCode.showHit = function (code) {
    tm.httpErrorCode.handle(code);
};

/**
 *  错误码操作
 * @param code
 */
tm.httpErrorCode.handle = function (code) {
    var codeStr = "未知错误";
    if (tm.httpErrorCode[code]) {
        codeStr = tm.httpErrorCode[code];
    }

    switch (code) {
        case 6000:
        case 6001:
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
        //# sourceMappingURL=tm_http_error_code.js.map
        