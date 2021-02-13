"use strict";
cc._RF.push(module, '70e36XUUmhNvosW442N+fRj', 'lc_game_sweets_pink');
// lcGame/scripts/items/sweets/lc_game_sweets_pink.js

"use strict";

/**
 * 游戏元素： 粉色糖果
 */
window.lc = window.lc || {};
lc.SweetsPink = cc.Class({
    extends: lc.SweetsBase,

    properties: {},

    ctor: function ctor() {
        this._itemType = lc.GameType.SweetsType.Pink;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this._super();
    }
});

cc._RF.pop();