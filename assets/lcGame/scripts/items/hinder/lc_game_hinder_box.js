/**
 * 游戏元素：障碍物 箱子
 */
window.lc = window.lc || {};

lc.HinderBox = cc.Class({
    extends: require("../lc_game_item_base"),

    properties: {
        _hinderType: lc.GameType.HinderType.Box,

        HinderType: {
            visible: false,
            get: function () {
                return this._hinderType;  //  障碍物类型
            }
        },
    },

    ctor () {
        this._itemPriority = lc.GamePriority.HinderBox;
        this._itemType =  lc.GameType.ItemType.Hinder;
        this._hinderType = lc.GameType.HinderType.Box;
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
