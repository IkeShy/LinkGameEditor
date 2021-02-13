"use strict";
cc._RF.push(module, '59cc5Yf2ddFprAeT2PQp8J1', 'lc_game_component_crashed');
// lcGame/scripts/compoent/lc_game_component_crashed.js

"use strict";

/**
 *  被撞击组件
 */
window.lc = window.lc || {};
lc.ComponentCrashed = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Crashed;
    },
    init: function init() {
        if (this._item) {
            this.enabled = true;
        }
    },
    doLogic: function doLogic() {
        // 如果开启
        var flag = false;
        if (this.enabled) {
            flag = true;
        }

        return flag;
    },
    destroy: function destroy() {
        this._super();
    }
});

cc._RF.pop();