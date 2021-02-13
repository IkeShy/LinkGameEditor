"use strict";
cc._RF.push(module, '2b3bdaraohHGZWf4IPhGaOF', 'lc_game_hinder_factory');
// lcGame/scripts/mgr/lc_game_hinder_factory.js

"use strict";

/**
 * 内容：障碍物工厂
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameHinderFactory = cc.Class({

    extends: cc.Component,

    properties: {
        hinderMap: null // 障碍物列表
    },

    init: function init() {
        this._initHinderMap();
    },

    /**
     * 初始化组件库
     * @private
     */
    _initHinderMap: function _initHinderMap() {
        this.hinderMap = {};

        var hinderBox = lc.game.asssetMgr.getPrefabByName("lc_game_hinder_box");
        this.hinderMap[lc.GameType.HinderType.Box] = hinderBox;
    },


    /**
     * 通过类型创建糖果
     */
    createHinderByType: function createHinderByType(type) {
        var hinder = null;
        var prefab = this.hinderMap[type];

        if (prefab) {
            hinder = cc.instantiate(prefab);
            var logic = hinder.getComponent('lc_game_item_base');
            hinder.priority = logic.Priority;
            hinder.itemType = logic.ItemType;
        } else {
            tm.LOGD(true, "没有这个障碍物的prefab：" + type);
        }

        return hinder;
    },


    /**
     * 通过类型创建元素
     */
    createItemByType: function createItemByType(type) {
        var hinder = this.createHinderByType(type);

        return hinder;
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