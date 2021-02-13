"use strict";
cc._RF.push(module, '8657aGXfaxCNJ2k3oHHo6kF', 'lc_layer_map');
// lcGame/scripts/layers/gameArea/lc_layer_map.js

'use strict';

/**
 * 游戏元素 -- 游戏区域
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        _startX: 0, // 初始化x坐标
        _startY: 0, // 初始化y坐标


        _curLevelInfo: null, // 当前地图数据
        _mapList: null,

        // creator
        mapNode: cc.Node
    },

    onLoad: function onLoad() {
        this._super();
        this._mapList = [];
        this._startX = -this.mapNode.getContentSize().width / 2;
        this._startY = -(this.mapNode.getContentSize().height - 45);

        this._parseInfo();
    },


    _parseInfo: function _parseInfo() {
        this._curLevelInfo = this.game.levelMgr.getLevelInfo();
        this._createMap();
    },

    /**
     * 创建地图
     * @private
     */
    _createMap: function _createMap() {
        var oneWidth = 81;
        var oneHeight = 81;
        for (var col = 0; col < this._curLevelInfo.length; col++) {
            this._mapList[col] = [];
            var oneCol = this._curLevelInfo[col];
            if (oneCol) {
                for (var raw = 0; raw < oneCol.length; raw++) {
                    var oneMapInfo = oneCol[raw];

                    var x = this._startX + oneWidth / 2 + oneWidth * col;
                    var y = this._startY + oneHeight * raw;

                    // 地图
                    var oneMap = this.game.mapMgr.createMapByType(lc.GameType.ItemType.Map);
                    var mLogic = oneMap.getComponent('lc_game_map');

                    this.mapNode.addChild(oneMap);

                    mLogic.setPos(x, y);
                    mLogic.setMap(oneMapInfo);

                    this._mapList[col][raw] = oneMap;
                }
            }
        }
    }

});

cc._RF.pop();