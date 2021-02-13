"use strict";
cc._RF.push(module, '8845bf+yZhIlb6+Hzq2Lvvk', 'lc_protocol_main');
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