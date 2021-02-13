(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/account/index.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d7aehm7vlMbKcM29KZLs6E', 'index', __filename);
// frame/account/index.js

"use strict";

/**
 *
 * 内容:
 *
 *  我的账号 <myAccount> 命名空间初始化
 *
 */

window.myAccount = window.myAccount || {};

myAccount.AuthState = {
  OK: 1, //已经授权
  FIRST: 2, //第一次调用相关接口，自动弹出授权
  REFUSED: 3 //拒绝过的授权
};

module.exports = window.myAccount;

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
        //# sourceMappingURL=index.js.map
        