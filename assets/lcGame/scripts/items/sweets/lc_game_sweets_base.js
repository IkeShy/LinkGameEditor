/**
 * 游戏元素：糖果父类
 */
window.lc = window.lc || {};

lc.SweetsBase = cc.Class({
    extends: lc.ItemBase,

    properties: {
        SweetType: {
            visible: false,
            get: function () {
                return this._sweetType;  // 糖果类型
            }
        }, // 物体类型

        beatCount: 1, // 受打击数量
    },

    ctor () {
        this._itemPriority = lc.GamePriority.Sweets;
        this._itemType = lc.GameType.ItemType.Sweets;
    },

    onLoad () {
        this._super();
    },

    initUseCom () {
        this.addComByType(lc.GameType.ComType.Shape);
        this.addComByType(lc.GameType.ComType.Chance);
        this.addComByType(lc.GameType.ComType.Beat);
        this.addComByType(lc.GameType.ComType.Remove);
    }

});
