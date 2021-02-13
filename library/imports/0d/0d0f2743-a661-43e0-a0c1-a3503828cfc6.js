"use strict";
cc._RF.push(module, '0d0f2dDpmFD4KDBo1A4KM/G', 'lc_game_hinder_box');
// lcGame/scripts/items/hinder/lc_game_hinder_box.js

"use strict";

/**
 * 游戏元素：障碍物 箱子
 */
window.lc = window.lc || {};

lc.HinderBox = cc.Class({
    extends: require("../lc_game_item_base"),

    properties: {},

    ctor: function ctor() {
        this._itemPriority = lc.GamePriority.HinderBox;
        this._itemType = lc.GameType.HinderType.Box;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this.addComByType(lc.GameType.ComType.Shape);
        this.addComByType(lc.GameType.ComType.Beat);
        this.addComByType(lc.GameType.ComType.Crashed);
    },
    onBeatOver: function onBeatOver() {}
});

cc._RF.pop();