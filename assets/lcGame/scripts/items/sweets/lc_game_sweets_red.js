/**
 * 游戏元素： 黄色糖果
 */
window.lc = window.lc || {};
lc.SweetsRed = cc.Class({
    extends: lc.SweetsBase,

    properties: {

    },

    ctor () {
        this._itemType = lc.GameType.SweetsType.Red;
    },

    onLoad () {
       this._super();

    },

    initUseCom () {
        this._super();
    }

});
