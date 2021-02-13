/**
 * 游戏元素： 蓝色糖果
 */
window.lc = window.lc || {};
lc.SweetsBlue = cc.Class({
    extends: lc.SweetsBase,

    properties: {
    },

    ctor () {
        this._itemType = lc.GameType.SweetsType.Blue;
    },

    onLoad () {
       this._super();
    },

    initUseCom () {
        this._super();
    }

});
