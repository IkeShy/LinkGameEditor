(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/utils/tm_local_storage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '416451ZCH9CSIkkMOp2r7Si', 'tm_local_storage', __filename);
// commonScript/utils/tm_local_storage.js

"use strict";

/**
 *
 * 内容: 本地存储
 *
 */

window.tm = window.tm || {};

tm.localStorage = {

    getItem: function getItem(key) {
        var info = cc.sys.localStorage.getItem(key);
        if (info != "null" && info != "" && info != null) {
            return JSON.parse(info);
        }
        return "null";
    },

    setItem: function setItem(key, value) {
        if (!key) {
            return;
        }
        cc.sys.localStorage.setItem(key, JSON.stringify(value));
    }
};

tm.localStorageKey = {

    SETTING_MUSIC_KEY: "MUSIC_VALUE", // 音乐音效设置 {effect:0.5, music:0.5, isMute: 1}  //音效，音乐， 静音(0:关，1:开)

    GOLD_UPDATE_TYPE: "GOLD_UPDATE_TYPE" // 玩家当前金币类型
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
        //# sourceMappingURL=tm_local_storage.js.map
        