/**
 * 内容：糖果工厂
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameSweetsFactory = cc.Class({

    extends:cc.Component,

    properties : {
        sweetsMap: null, // 糖果列表
    },

    init : function () {
        this._initSweetsMap();
    },

    /**
     * 初始化组件库
     * @private
     */
    _initSweetsMap () {
        this.sweetsMap = {};

        let sweets_blue = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_blue");
        this.sweetsMap[lc.GameType.SweetsType.Blue] = sweets_blue;

        let sweets_yellow = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_yellow");
        this.sweetsMap[lc.GameType.SweetsType.Yellow] = sweets_yellow;

        let sweets_pink = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_pink");
        this.sweetsMap[lc.GameType.SweetsType.Pink] = sweets_pink;

        let sweets_green = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_green");
        this.sweetsMap[lc.GameType.SweetsType.Green] = sweets_green;

        let sweets_red = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_red");
        this.sweetsMap[lc.GameType.SweetsType.Red] = sweets_red;
    },

    /**
     * 通过类型创建糖果
     */
    createSweetsByType (type) {
        let sweets = null;
        let prefab = this.sweetsMap[type];

        if(prefab) {
            sweets = cc.instantiate(prefab);
            let logic = sweets.getComponent('lc_game_sweets_base');
            sweets.priority = logic.Priority;
            sweets.itemType = logic.ItemType;
        } else {
            tm.LOGD(true, "没有这个糖果的prefab：" + type);
        }

        return sweets;
    },

    /**
     * 通过类型创建元素
     */
    createItemByType (type) {
        let sweets = this.createSweetsByType(type);
        return sweets;
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