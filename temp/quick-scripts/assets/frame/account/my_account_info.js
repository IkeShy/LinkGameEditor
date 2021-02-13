(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/account/my_account_info.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ae703l1EpFJoJIgJPrkGQNW', 'my_account_info', __filename);
// frame/account/my_account_info.js

"use strict";

/**
 *
 * 内容: 账号信息
 *
 */

require("index");
myAccount.account = {
    avatar: -1, // 头像
    nickName: "",
    phone: -1,
    sex: 0,
    token: "",
    trueName: null,
    userId: "",
    identity: null, // 认证字段
    invite: null, // 邀请id

    accountNum: null, // 玩家游戏账号
    password: null, // 娃家游戏密码

    goldTypeInfo: null, // 金币类型数据
    goldTypeName: "GRT", // 金币类型名字

    server_ip: null, // socket ip
    server_port: null, // socket 端口

    isMe: function isMe(userId) {
        return userId === this.userId;
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
        //# sourceMappingURL=my_account_info.js.map
        