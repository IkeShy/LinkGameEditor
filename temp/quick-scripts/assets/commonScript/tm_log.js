(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/tm_log.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a21bc4un79F364bfVzwPgwv', 'tm_log', __filename);
// commonScript/tm_log.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *
 * 注意: 标记为Ref的对象为引用对象, 不要在这个类改变属性.
 *
 * 内容: LOG工具函数
 *
 */

require('./tm_index');

tm.LOGD = function (tag, msg) {

    if (!CC_DEBUG) {
        return;
    }

    if ((typeof msg === "undefined" ? "undefined" : _typeof(msg)) == "object") {
        msg = JSON.stringify(msg);
    }

    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var s = "";
            if (_typeof(arguments[i]) == "object") {
                s = JSON.stringify(arguments[i]);
            } else {
                s = arguments[i];
            }
            msg += ' ' + s;
        }
    }

    var curDate = new Date();
    var curTime = curDate.toLocaleTimeString() + ':' + curDate.getMilliseconds();
    var str = '[DEBUG][ ' + curTime + ']\t';

    cc.log(str + "[" + tag + "]" + msg);
};

tm.LOGE = function (tag, msg) {
    if (!CC_DEBUG) {
        return;
    }

    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            msg += ' ' + arguments[i];
        }
    }

    var curDate = new Date();
    var curTime = curDate.toLocaleTimeString() + ':' + curDate.getMilliseconds();
    var str = '[ERROR][ ' + curTime + ']\t';

    cc.error(str + "[" + tag + "]" + msg);
};

tm.ASSERT = function (cond, msg) {
    if (!CC_DEBUG) {
        return;
    }

    if (!cond) {
        if (arguments.length > 2) {
            for (var i = 2; i < arguments.length; i++) {
                msg += ' ' + arguments[i];
            }
        }

        var curDate = new Date();

        var curTime = curDate.toLocaleTimeString() + ':' + curDate.getMilliseconds();
        var str = '[ ' + curTime + ']\t';

        cc.assert(cond, str + msg);
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
        //# sourceMappingURL=tm_log.js.map
        