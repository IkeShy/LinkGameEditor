"use strict";
cc._RF.push(module, '68b454e/VNNtKGyKmroNHhN', 'lc_map_select_ui');
// lcGame/edit/scripts/lc_map_select_ui.js

"use strict";

/**
 * 编辑器 -- 地图选择ui
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {},

    onLoad: function onLoad() {
        this._super();
    },


    onShow: function onShow(data) {
        this._super();
    },

    // -
    onRightTop: function onRightTop() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightTop);
    },

    onRightBottom: function onRightBottom() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightBottom);
    },

    onLeftBottom: function onLeftBottom() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftBottom);
    },

    onLeftTop: function onLeftTop() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftTop);
    },

    // -
    onTop: function onTop() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.Top);
    },

    onRight: function onRight() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.Right);
    },

    onBottom: function onBottom() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.Bottom);
    },

    onLeft: function onLeft() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.Left);
    },

    //-
    onRightTopIn: function onRightTopIn() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightTopIn);
    },

    onRightBottomIn: function onRightBottomIn() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightBottomIn);
    },

    onLeftBottomIn: function onLeftBottomIn() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftBottomIn);
    },

    onLeftTopIn: function onLeftTopIn() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftTopIn);
    },

    //-
    onRightTopGap: function onRightTopGap() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightTopGap);
    },

    onRightBottomGap: function onRightBottomGap() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightBottomGap);
    },

    onLeftBottomGap: function onLeftBottomGap() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftBottomGap);
    },

    onLeftTopGap: function onLeftTopGap() {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftTopGap);
    },

    // -
    onOpenMap: function onOpenMap(data) {
        var isChecked = data.isChecked;
        this.trigger(lc.Event.Edit.IsOpenMap, isChecked);
    }

});

cc._RF.pop();