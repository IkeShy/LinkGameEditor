(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/boot.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b028dejTO9BDqQwLTBNMd+j', 'boot', __filename);
// lcGame/scripts/boot.js

"use strict";

require("./lc_config.js");
require("./utils/lc_event_type.js");
require("./utils/lc_game_type.js");
require("./utils/lc_game_enum.js");
require("./utils/lc_game_priority.js");
require("./core/lc_app_core.js");

window.lc = window.lc || {};
if (CC_DEBUG) {
    lc.TDBUG = {};
}

lc.interface = {

    init: function init() {
        lc.game = tm.appMgr.createGame(lc.config.gameId, lc.AppCore);
        lc.game.init();
    }
};

/**
 * 游戏启动事件
 */
cc.game.once(cc.game.EVENT_ENGINE_INITED, function (res) {

    // 公告代码初始化
    tm.init();

    lc.interface.init();
}, undefined);

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
        //# sourceMappingURL=boot.js.map
        