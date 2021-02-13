"use strict";
cc._RF.push(module, 'ef580f/BvdCRr/1VFKETt3/', 'lc_game_component_remove');
// lcGame/scripts/compoent/lc_game_component_remove.js

"use strict";

/**
 *  消除组件
 */
window.lc = window.lc || {};
lc.ComponentRemove = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Remove;
    },
    init: function init() {
        this.enabled = true;
    },
    doLogic: function doLogic() {
        var flag = false;
        // 如果开启
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