/**
 * 游戏元素：障碍物 箱子
 */
window.lc = window.lc || {};

lc.HinderBox = cc.Class({
    extends: require("../lc_game_item_base"),

    properties: {

    },

    ctor () {
        this._itemPriority = lc.GamePriority.HinderBox;
        this._itemType =  lc.GameType.HinderType.Box;
    },

    onLoad () {
        this._super();
    },

    initUseCom () {
        this.addComByType(lc.GameType.ComType.Shape);
        this.addComByType(lc.GameType.ComType.Beat);
        this.addComByType(lc.GameType.ComType.Crashed);
    },


    onBeatOver () {

    }


});
