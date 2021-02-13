"use strict";
cc._RF.push(module, 'c2f4byGuLxDMo9z6SdBbt0l', 'lc_game_sweets_blue');
// lcGame/scripts/items/sweets/lc_game_sweets_blue.js

"use strict";

/**
 * 游戏元素： 蓝色糖果
 */
window.lc = window.lc || {};
lc.SweetsBlue = cc.Class({
    extends: lc.SweetsBase,

    properties: {},

    ctor: function ctor() {
        this._itemType = lc.GameType.SweetsType.Blue;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this._super();
    }
});

cc._RF.pop();