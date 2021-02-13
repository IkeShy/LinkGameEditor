(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/account/my_account_event.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd67bfZbHEhMJ4P+gYWZp/mc', 'my_account_event', __filename);
// frame/account/my_account_event.js

"use strict";

/**
 * 内容:
 */

require("./index");

/**
 * 用户性别
 * @type {{MAN: number, WOMAN: number}}
 */
myAccount.Sex = {
  MAN: 1,
  WOMAN: 2
};

/**
 * 用户登陆事件
 */
myAccount.Event = {
  MYACCOUNT_EVENT_LOGIN_OK: "myAccount_event_login_ok",
  MYACCOUNT_EVENT_LOGIN_FAIL: "myAccount_event_login_fail"
};

/**
 * 触发分享方式
 * 统计使用
 * @type {{SYS_RIGHT_TOP_SHARE: string}}
 */
myAccount.ShareType = {
  RT_SHARE: 1, //微信小游戏右上角点击转发,被动转发
  ACCORD_SHARE: 2 //小游戏中，点击转发
};

myAccount.SrImgType = {
  URL: "URL",
  MAKE_LOCALITY: "MAKE_LOCALITY"
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
        //# sourceMappingURL=my_account_event.js.map
        