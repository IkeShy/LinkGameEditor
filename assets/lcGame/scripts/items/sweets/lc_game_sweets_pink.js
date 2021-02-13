/**
 * 游戏元素： 粉色糖果
 */
window.lc = window.lc || {};
lc.SweetsPink = cc.Class({
    extends: lc.SweetsBase,

    properties: {

    },

    ctor () {
        this._itemType = lc.GameType.SweetsType.Pink;
    },

    onLoad () {
        this._super();
    },

    initUseCom () {
        this._super();
    }

});
