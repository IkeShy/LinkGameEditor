(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/frame/account/my_account_bi_util.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd748cMb9YBACL8ljSLjEODa', 'my_account_bi_util', __filename);
// frame/account/my_account_bi_util.js

"use strict";

/**
 *
 * 内容: BI 数据统计
 *
 */

require("./index");

myAccount.bi = {
    /**
     *
     * @param shareId  分享方案ID
     * @param shareScene  分享场景
     * @param shareType 分享触发类型
     * @param state 分享状态
     * @param params 透传参数,目前没有
     */
    reportShareInfo: function reportShareInfo(info) {
        var url = mySdk.config.ip + "/api/bi/userShare";

        var data = {
            shareId: info.shareId,
            sceneType: info.sceneType, //分享场景
            shareType: info.shareType, //分享类型
            state: info.state,
            target: info.target || "DEF",
            clientId: mySdk.config.clientId
        };

        data.shareUserId = mySdk.account.userId;

        var params = info['params'];
        if (params) {
            data['params'] = params;
        }

        tm.netHttpCore.post(url, data);
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
        //# sourceMappingURL=my_account_bi_util.js.map
        