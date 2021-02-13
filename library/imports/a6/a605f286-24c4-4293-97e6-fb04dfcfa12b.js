"use strict";
cc._RF.push(module, 'a605fKGJMRCk5fm+wTfz6Er', 'lc_game_sweets_factory');
// lcGame/scripts/mgr/lc_game_sweets_factory.js

"use strict";

/**
 * 内容：糖果工厂
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameSweetsFactory = cc.Class({

    extends: cc.Component,

    properties: {
        sweetsMap: null // 糖果列表
    },

    init: function init() {
        this._initSweetsMap();
    },

    /**
     * 初始化组件库
     * @private
     */
    _initSweetsMap: function _initSweetsMap() {
        this.sweetsMap = {};

        var sweets_blue = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_blue");
        this.sweetsMap[lc.GameType.SweetsType.Blue] = sweets_blue;

        var sweets_yellow = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_yellow");
        this.sweetsMap[lc.GameType.SweetsType.Yellow] = sweets_yellow;

        var sweets_pink = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_pink");
        this.sweetsMap[lc.GameType.SweetsType.Pink] = sweets_pink;

        var sweets_green = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_green");
        this.sweetsMap[lc.GameType.SweetsType.Green] = sweets_green;

        var sweets_red = lc.game.asssetMgr.getPrefabByName("lc_game_sweets_red");
        this.sweetsMap[lc.GameType.SweetsType.Red] = sweets_red;
    },


    /**
     * 通过类型创建糖果
     */
    createSweetsByType: function createSweetsByType(type) {
        var sweets = null;
        var prefab = this.sweetsMap[type];

        if (prefab) {
            sweets = cc.instantiate(prefab);
            var logic = sweets.getComponent('lc_game_sweets_base');
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
    createItemByType: function createItemByType(type) {
        var sweets = this.createSweetsByType(type);
        return sweets;
    },


    /**
     * 释放函数
     */
    onDestroy: function onDestroy() {
        tm.notifierCenter.ignoreScope(this);

        if (lc.game) {
            lc.game.ignoreScope(this);
        }
    }
});

cc._RF.pop();