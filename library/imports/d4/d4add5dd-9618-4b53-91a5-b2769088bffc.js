"use strict";
cc._RF.push(module, 'd4addXdlhhLU5GlsnaQiL/8', 'lc_game_sweets_yellow');
// lcGame/scripts/items/sweets/lc_game_sweets_yellow.js

"use strict";

/**
 * 游戏元素： 黄色糖果
 */
window.lc = window.lc || {};
lc.SweetsYellow = cc.Class({
    extends: lc.SweetsBase,

    properties: {},

    ctor: function ctor() {
        this._itemType = lc.GameType.SweetsType.Yellow;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this._super();
    }
});

cc._RF.pop();