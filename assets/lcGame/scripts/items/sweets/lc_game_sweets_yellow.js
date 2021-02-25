/**
 * 游戏元素： 黄色糖果
 */
window.lc = window.lc || {};
lc.SweetsYellow = cc.Class({
    extends: lc.SweetsBase,

    properties: {

    },

    ctor () {
        this._sweetType = lc.GameType.SweetsType.Yellow;
    },

    onLoad () {
       this._super();
    },

    initUseCom () {
        this._super();
    }

});
