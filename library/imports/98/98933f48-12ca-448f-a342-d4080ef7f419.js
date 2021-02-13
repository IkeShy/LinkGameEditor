"use strict";
cc._RF.push(module, '989339IEspEj6NC1AgO9/QZ', 'lc_game_sweets_red');
// lcGame/scripts/items/sweets/lc_game_sweets_red.js

"use strict";

/**
 * 游戏元素： 黄色糖果
 */
window.lc = window.lc || {};
lc.SweetsRed = cc.Class({
    extends: lc.SweetsBase,

    properties: {},

    ctor: function ctor() {
        this._itemType = lc.GameType.SweetsType.Red;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this._super();
    }
});

cc._RF.pop();