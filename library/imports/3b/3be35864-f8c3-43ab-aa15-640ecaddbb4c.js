"use strict";
cc._RF.push(module, '3be35hk+MNDq6oVZA7K3btM', 'lc_game_component_chance');
// lcGame/scripts/compoent/lc_game_component_chance.js

"use strict";

/**
 *  选择组件
 */
window.lc = window.lc || {};
lc.ComponentChance = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Chance;
    },
    init: function init() {
        this.enabled = true;
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