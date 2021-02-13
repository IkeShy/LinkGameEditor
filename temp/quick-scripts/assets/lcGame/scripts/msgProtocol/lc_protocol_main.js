(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/msgProtocol/lc_protocol_main.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8845bf+yZhIlb6+Hzq2Lvvk', 'lc_protocol_main', __filename);
// lcGame/scripts/msgProtocol/lc_protocol_main.js

"use strict";

/**
 * 内容: 平台消息协议配置
 *
 */

/**
 *
 * "key" : {           //key: 消息/model/协议 的key
 *     modelClass:lottory.baseModel,  //
 *     bCache:false,   //  是否缓存
 *     triggerKey: "",
 *     cmd:"",         // 命令类型
 *     params:{        // 命令参数
 *        action:""
 *     }
 * }
 *
 * @type {{}}
 */

window.lc = window.lc || {};

lc.msgProtocol = function () {

    var msg = {};
    var bInit = false;

    function init() {
        if (bInit) return;
    }

    return {
        init: init,
        msg: msg
    };
}();

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
        //# sourceMappingURL=lc_protocol_main.js.map
        