"use strict";
cc._RF.push(module, '0cd53bG4IFEiJJk4X71kdbh', 'lc_game_sweets_base');
// lcGame/scripts/items/sweets/lc_game_sweets_base.js

"use strict";

/**
 * 游戏元素：糖果父类
 */
window.lc = window.lc || {};

lc.SweetsBase = cc.Class({
    extends: lc.ItemBase,

    properties: {
        beatCount: 1 // 受打击数量
    },

    ctor: function ctor() {
        this._itemPriority = lc.GamePriority.Sweets;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this.addComByType(lc.GameType.ComType.Shape);
        this.addComByType(lc.GameType.ComType.Chance);
        this.addComByType(lc.GameType.ComType.Beat);
        this.addComByType(lc.GameType.ComType.Remove);
        this.addComByType(lc.GameType.ComType.Crash);
        this.addComByType(lc.GameType.ComType.Crashed);
    }
});

cc._RF.pop();