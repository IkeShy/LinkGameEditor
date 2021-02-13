"use strict";
cc._RF.push(module, '55bb6LS/LhCCaI2V3GmIQXw', 'lc_game_scene');
// lcGame/scripts/scenes/lc_game_scene.js

"use strict";

/**
 * 游戏场景
 */
cc.Class({
    extends: tm.BaseScene,

    properties: {
        mapNode: cc.Node,
        mapPrefab: cc.Prefab,

        containerNode: cc.Node,
        containerPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        this._super();
        this.game.levelMgr.loadCurMapInfo(1);
        this.register(lc.Event.GameEvent.LevelLoadSuccess, this._onLevelLoadSuccess, this);
    },
    _onLevelLoadSuccess: function _onLevelLoadSuccess() {
        this._addMap();
        this._addContainer();
    },


    /**
     * 添加地图
     * @private
     */
    _addMap: function _addMap() {
        var mapP = cc.instantiate(this.mapPrefab);
        if (mapP) {
            this.mapNode.addChild(mapP);
        }
    },


    /**
     * 添加容器
     * @private
     */
    _addContainer: function _addContainer() {
        var containerP = cc.instantiate(this.containerPrefab);
        if (containerP) {
            this.containerNode.addChild(containerP);
        }
    }
});

cc._RF.pop();