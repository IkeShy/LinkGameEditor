/**
 * 游戏元素： 绿色糖果
 */
window.lc = window.lc || {};
lc.SweetsGreen = cc.Class({
    extends: lc.SweetsBase,

    properties: {

    },

    ctor () {
        this._sweetType = lc.GameType.SweetsType.Green;
    },

    onLoad () {
       this._super();


    },

    initUseCom () {
        this._super();
    }

});
