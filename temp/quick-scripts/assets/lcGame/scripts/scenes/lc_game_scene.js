(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/scenes/lc_game_scene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '55bb6LS/LhCCaI2V3GmIQXw', 'lc_game_scene', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=lc_game_scene.js.map
        