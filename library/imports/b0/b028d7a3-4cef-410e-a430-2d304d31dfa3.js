"use strict";
cc._RF.push(module, 'b028dejTO9BDqQwLTBNMd+j', 'boot');
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