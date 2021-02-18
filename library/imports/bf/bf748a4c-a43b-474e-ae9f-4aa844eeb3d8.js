"use strict";
cc._RF.push(module, 'bf748pMpDtHTq6fSqhE7rPY', 'lc_game_component_beat');
// lcGame/scripts/compoent/lc_game_component_beat.js

"use strict";

/**
 *  击打组件
 */
window.lc = window.lc || {};
lc.ComponentBeat = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Beat;
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
            this._item.beatCount--;
            if (this._item.beatCount <= 0) {
                flag = true;
            }
        }

        return flag;
    },
    destroy: function destroy() {
        this._super();
    }
});

cc._RF.pop();