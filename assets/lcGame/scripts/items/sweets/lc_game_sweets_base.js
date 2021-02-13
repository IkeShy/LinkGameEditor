/**
 * 游戏元素：糖果父类
 */
window.lc = window.lc || {};

lc.SweetsBase = cc.Class({
    extends: lc.ItemBase,

    properties: {
        beatCount: 1, // 受打击数量
    },

    ctor () {
        this._itemPriority = lc.GamePriority.Sweets;
    },

    onLoad () {
        this._super();
    },

    initUseCom () {
        this.addComByType(lc.GameType.ComType.Shape);
        this.addComByType(lc.GameType.ComType.Chance);
        this.addComByType(lc.GameType.ComType.Beat);
        this.addComByType(lc.GameType.ComType.Remove);
        this.addComByType(lc.GameType.ComType.Crash);
        this.addComByType(lc.GameType.ComType.Crashed);
    }



});
