"use strict";
cc._RF.push(module, '9a9een7UapG8Yz1mR1EMaVb', 'lc_game_map');
// lcGame/scripts/items/map/lc_game_map.js

"use strict";

/**
 * 游戏元素：地图父类
 */
window.lc = window.lc || {};

lc.Map = cc.Class({
    extends: lc.ItemBase,

    properties: {
        showNode: cc.Node, // 是否显示的节点
        boundNode: cc.Node, // 边界节点

        // 包围边框
        rightTop: cc.Node, // 右上角
        rightBottom: cc.Node, // 右下角
        leftBottom: cc.Node, // 左下角
        leftTop: cc.Node, // 左上角

        // 正常边框
        top: cc.Node, // 上
        right: cc.Node, // 右
        bottom: cc.Node, // 下
        left: cc.Node, // 左

        // 内嵌边框
        rightTopIn: cc.Node, // 右上
        rightBottomIn: cc.Node, // 右下
        leftBottomIn: cc.Node, // 左下
        leftTopIn: cc.Node, // 左上

        // 内部线条
        leftTopGap: cc.Node, // 左上
        rightTopGap: cc.Node, // 右上
        rightBottomGap: cc.Node, // 右下
        leftBottomGap: cc.Node, // 左下

        _mapList: null // 地图边框列表

    },

    ctor: function ctor() {
        this._itemType = lc.GameType.ItemType.Map;
    },
    onLoad: function onLoad() {
        this._super();
        this.initMapList();
    },


    /**
     * 初始化地图列表
     */
    initMapList: function initMapList() {
        this._mapList = {};
        this._mapList[lc.GameType.MapType.RightTop] = this.rightTop;
        this._mapList[lc.GameType.MapType.RightBottom] = this.rightBottom;
        this._mapList[lc.GameType.MapType.LeftBottom] = this.leftBottom;
        this._mapList[lc.GameType.MapType.LeftTop] = this.leftTop;

        this._mapList[lc.GameType.MapType.Top] = this.top;
        this._mapList[lc.GameType.MapType.Right] = this.right;
        this._mapList[lc.GameType.MapType.Bottom] = this.bottom;
        this._mapList[lc.GameType.MapType.Left] = this.left;

        this._mapList[lc.GameType.MapType.RightTopIn] = this.rightTopIn;
        this._mapList[lc.GameType.MapType.RightBottomIn] = this.rightBottomIn;
        this._mapList[lc.GameType.MapType.LeftBottomIn] = this.leftBottomIn;
        this._mapList[lc.GameType.MapType.LeftTopIn] = this.leftTopIn;

        this._mapList[lc.GameType.MapType.LeftTopGap] = this.leftTopGap;
        this._mapList[lc.GameType.MapType.RightTopGap] = this.rightTopGap;
        this._mapList[lc.GameType.MapType.RightBottomGap] = this.rightBottomGap;
        this._mapList[lc.GameType.MapType.LeftBottomGap] = this.leftBottomGap;
    },


    /**
     * 地图是否显示
     */
    onMapOpen: function onMapOpen(active) {
        this.setIsActive(active);
    },


    /**
     * 是否地图打开了
     * @returns {*}
     */
    isMapOpen: function isMapOpen() {
        return this.showNode.active;
    },


    /**
     * 点击地图块
     */
    onClickMap: function onClickMap() {
        this.trigger(lc.Event.Edit.ChooseMap, { x: this.logicX, y: this.logicY });
    },


    /**
     * 开启边框
     */
    onShowMapBound: function onShowMapBound(type) {
        var node = this._mapList[type];
        if (node) {
            node.active = !node.active;
        }
    },


    /**
     * 显示开启的边框
     */
    getShowMapBound: function getShowMapBound() {
        var array = [];
        for (var key in this._mapList) {
            if (this._mapList[key] && this._mapList[key].active) {
                array.push(key);
            }
        }

        return array;
    },


    /**
     * 设置地图边框
     * @param array
     */
    setMap: function setMap(info) {
        this.setIsActive(info.isOpen);
        this.setBound(info.map.type);
    },


    /**
     * 设置边框
     * @param bounds
     */
    setBound: function setBound(bounds) {
        var _this = this;

        bounds.forEach(function (value) {
            _this._showBoundActive(value);
        });
    },


    /**
     *
     * @param type
     * @private
     */
    _showBoundActive: function _showBoundActive(type) {
        var node = this._mapList[type];
        if (node) {
            node.active = true;
        }
    },


    /**
     * 设置是否可见
     * @param active
     */
    setIsActive: function setIsActive(active) {
        this.showNode.active = active;
    }
});

cc._RF.pop();