"use strict";
cc._RF.push(module, 'b8a4fUl+VZCdJlozaUet8Eo', 'lc_game_sweets_green');
// lcGame/scripts/items/sweets/lc_game_sweets_green.js

"use strict";

/**
 * 游戏元素： 绿色糖果
 */
window.lc = window.lc || {};
lc.SweetsGreen = cc.Class({
    extends: lc.SweetsBase,

    properties: {},

    ctor: function ctor() {
        this._itemType = lc.GameType.SweetsType.Green;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this._super();
    }
});

cc._RF.pop();