/**
 * 游戏元素： 道具火箭
 */
window.lc = window.lc || {};
lc.PropRokect = cc.Class({
    extends: lc.PropBase,

    properties: {

    },

    ctor () {
        this._propType = lc.GameType.PropType.Rocket;
    },

    onLoad () {
        this._super();
    },

    initUseCom () {
        this._super();
    }

});
