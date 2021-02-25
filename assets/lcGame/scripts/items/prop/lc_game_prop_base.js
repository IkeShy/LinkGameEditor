/**
 * 游戏元素：道具父类
 */
window.lc = window.lc || {};

lc.PropBase = cc.Class({
    extends: lc.ItemBase,

    properties: {
        crashToType: { // 爆炸朝向
            visible: true,
            default: lc.GameEnum.CrashToType.Invalid,
            type: lc.GameEnum.CrashToType
        },

        crashCount: 1, // 爆炸关联数量

        PropType: {
            visible: false,
            get: function () {
                return this._propType;  //  道具类型
            }
        },
    },

    ctor () {
        this._itemPriority = lc.GamePriority.Prop;
        this._itemType = lc.GameType.ItemType.Prop;
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
