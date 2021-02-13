"use strict";
cc._RF.push(module, 'dc3b1u5vdtKR7UbqlAUpoRe', 'lc_game_component_move');
// lcGame/scripts/compoent/lc_game_component_move.js

"use strict";

/**
 *  移动组件
 */
window.lc = window.lc || {};
lc.ComponentMove = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Move;
    },
    init: function init() {},
    doLogic: function doLogic() {
        // 如果开启
        if (this.enabled) {}
    },
    destroy: function destroy() {
        this._super();
    }
});

cc._RF.pop();