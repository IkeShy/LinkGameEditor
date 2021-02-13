/**
 * 内容：元素工厂
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameItemFactory = cc.Class({

    extends:cc.Component,

    properties : {
        _itemFactory: null, // 队列工厂
    },

    init : function () {
        this.initItemFactory();
    },

    /**
     * 初始化元素队列
     */
    initItemFactory: function () {
        this._itemFactory = {};

        // 糖果
        this._itemFactory[lc.GameType.SweetsType.Blue] = lc.game.sweetsFactory;
        this._itemFactory[lc.GameType.SweetsType.Yellow] = lc.game.sweetsFactory;
        this._itemFactory[lc.GameType.SweetsType.Pink] = lc.game.sweetsFactory;
        this._itemFactory[lc.GameType.SweetsType.Green] = lc.game.sweetsFactory;
        this._itemFactory[lc.GameType.SweetsType.Red] = lc.game.sweetsFactory;

        // 箱子
        this._itemFactory[lc.GameType.HinderType.Box] = lc.game.hinderFactory;

    },

    /**
     * 通过类型创建糖果
     */
    createItemByType (type) {
        let item = null;
        let factory = this._itemFactory[type];
        if(factory) {
            item = factory.createItemByType(type);
        }
        

        return item;
    },

    /**
     * 释放函数
     */
    onDestroy () {
        tm.notifierCenter.ignoreScope(this);

        if(lc.game) {
            lc.game.ignoreScope(this);
        }
    }
});