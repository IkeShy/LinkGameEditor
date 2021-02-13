(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/account/my_account_config.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '77f21r+JGxCvYCyo7nbCL28', 'my_account_config', __filename);
// frame/account/my_account_config.js

"use strict";

/**
 * 内容: 配置信息
 */
require("./index");

// 是否是线上版本
var IS_ONLINE = false;

if (IS_ONLINE) {
    window.myAccount.config = {
        ip: "http://39.106.230.205", //"http://39.107.31.221:30000",  http://39.106.230.205
        clientId: "texas_app_v1_0_0",
        v: "1.0"
    };
} else {
    window.myAccount.config = {
        ip: "http://192.168.8.118:9017",
        clientId: "debug_texas_app_v1_0_0",
        v: "1.0"
    };
}

/**
 * 语言设置
 * @type {{lang: string}}
 */
window.myAccount.setting = {
    lang: "zh_CN"
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
        //# sourceMappingURL=my_account_config.js.map
        