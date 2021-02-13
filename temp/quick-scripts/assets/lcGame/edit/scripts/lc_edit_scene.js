(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/edit/scripts/lc_edit_scene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ef70cIrXqpFp5M0allth2pW', 'lc_edit_scene', __filename);
// lcGame/edit/scripts/lc_edit_scene.js

'use strict';

/**
 * 游戏编辑器
 */
cc.Class({
    extends: tm.BaseScene,

    properties: {
        m_raw: 8, // 行
        m_col: 8, // 列

        gameAreaBg: cc.Node, // 背景
        mapNode: cc.Node, // map的节点
        containerNode: cc.Node, // 容器的节点

        mapEleUIPrefab: cc.Prefab, // 地图元素ui
        containerPrefab: cc.Prefab, // 容器原型

        _curMap: null, // 当前选择的地图块
        _mapList: null, // 地图列表
        _containerList: null // 容器列表
    },

    onLoad: function onLoad() {
        this._super();
        this._startX = -this.gameAreaBg.getContentSize().width / 2;
        this._startY = -this.gameAreaBg.getContentSize().height / 2;
        this._registerListen();
        this._addMapEleUi();

        this._initMap();
    },


    /**
     * 初始化地图
     * 容器也在这时候初始化
     * @private
     */
    _initMap: function _initMap() {
        var mapInfo = this.game.mapMgr.getDefaultMap();
        if (mapInfo) {
            var oneWidth = 81;
            var oneHeight = 81;
            this._mapList = [];
            this._containerList = [];

            for (var i = 0; i < mapInfo.length; i++) {
                var oneRow = mapInfo[i];
                this._mapList[i] = [];
                this._containerList[i] = [];

                for (var j = 0; j < oneRow.length; j++) {
                    var x = this._startX + oneWidth / 2 + oneWidth * i;
                    var y = this._startY + oneHeight * j;

                    // 地图
                    var oneMap = this.game.mapMgr.createMapByType(lc.GameType.ItemType.Map);
                    var mLogic = oneMap.getComponent('lc_game_map');
                    mLogic.setPos(cc.v2(x, y), i, j);
                    this._mapList[i][j] = oneMap;
                    this.gameAreaBg.addChild(oneMap);

                    // 容器
                    var oneContainer = cc.instantiate(this.containerPrefab);
                    var mContainer = oneContainer.getComponent('lc_game_container');
                    mContainer.setPos(cc.v2(x, y), i, j);
                    this._containerList[i][j] = mContainer;
                    this.gameAreaBg.addChild(oneContainer);
                }
            }
        }
    },


    /**
     * 添加地图元素ui
     * @private
     */
    _addMapEleUi: function _addMapEleUi() {
        var mapEleUI = cc.instantiate(this.mapEleUIPrefab);
        this.ui_parent.addChild(mapEleUI);
    },
    _registerListen: function _registerListen() {
        this.register(lc.Event.Edit.ChooseMap, this.onChooseMap, this);
        this.register(lc.Event.Edit.IsOpenMap, this.onIsOpenMap, this);
        this.register(lc.Event.Edit.ShowMapBound, this.onMapBound, this);
        this.register(lc.Event.Edit.ChooseSweets, this.onChooseSweets, this);
        this.register(lc.Event.Edit.ChooseHinder, this.onChooseHinder, this);
    },


    /**
     * 选择地图
     */
    onChooseMap: function onChooseMap(info) {
        var x = info.x;
        var y = info.y;

        if (x != void 0 && y != void 0) {
            this._curMap = this._mapList[x][y];
            this.trigger(lc.Event.Edit.ShowMapEle);
        }
    },


    /**
     * 是否打开地图
     */

    onIsOpenMap: function onIsOpenMap(flag) {
        if (this._curMap) {
            var logic = this._curMap.getComponent('lc_game_map');
            logic.onMapOpen(flag);
        }
    },


    /**
     * 选择地图边框
     */
    onMapBound: function onMapBound(type) {
        if (this._curMap) {
            var logic = this._curMap.getComponent('lc_game_map');
            logic.onShowMapBound(type);
        }
    },


    /**
     * 选择糖果
     */
    onChooseSweets: function onChooseSweets(type) {
        if (this._curMap && type) {
            // 通过操作的地图获取到相应容器
            // 这里不应该报错
            var mapLogic = this._curMap.getComponent('lc_game_map');
            var container = this._containerList[mapLogic.logicX][mapLogic.logicY];
            var cLogic = container.getComponent('lc_game_container');
            cLogic.addItemByType(type);
        }
    },


    /**
     * 选择障碍物
     */
    onChooseHinder: function onChooseHinder(type) {
        if (this._curMap && type) {
            // 通过操作的地图获取到相应容器
            // 这里不应该报错
            var mapLogic = this._curMap.getComponent('lc_game_map');
            var container = this._containerList[mapLogic.logicX][mapLogic.logicY];
            var cLogic = container.getComponent('lc_game_container');
            cLogic.addItemByType(type);
        }
    },


    /**
     * 下载
     */
    onDownLoad: function onDownLoad() {
        var mapInfo = this.game.mapMgr.getDefaultMap();
        if (mapInfo) {
            for (var i = 0; i < mapInfo.length; i++) {
                var oneRow = mapInfo[i];
                var oneMapRow = this._mapList[i];
                var oneContainerRow = this._containerList[i];

                for (var j = 0; j < oneRow.length; j++) {
                    // 处理地图
                    var oneInfo = oneRow[j];

                    var oneMap = oneMapRow[j];
                    var mLogic = oneMap.getComponent('lc_game_map');
                    oneInfo.isOpen = mLogic.isMapOpen();
                    oneInfo.map.type = mLogic.getShowMapBound();

                    var oneContainer = oneContainerRow[j];
                    var cLogic = oneContainer.getComponent('lc_game_container');
                    oneInfo.container = cLogic.getItemList();
                }
            }
        }

        var file = new File([JSON.stringify(mapInfo)], "LevelConfig.json", { type: "text/plain;charset=utf-8" });
        window.saveAs(file);
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
        //# sourceMappingURL=lc_edit_scene.js.map
        