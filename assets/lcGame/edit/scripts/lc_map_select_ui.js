/**
 * 编辑器 -- 地图选择ui
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {

    },

    onLoad () {
        this._super();

    },

    onShow: function (data) {
        this._super();

    },

    // -
    onRightTop : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightTop);
    },

    onRightBottom : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightBottom);
    },

    onLeftBottom : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftBottom);
    },

    onLeftTop : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftTop);
    },

    // -
    onTop : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.Top);
    },

    onRight : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.Right);
    },

    onBottom : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.Bottom);
    },

    onLeft : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.Left);
    },

    //-
    onRightTopIn : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightTopIn);
    },

    onRightBottomIn : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightBottomIn);
    },

    onLeftBottomIn : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftBottomIn);
    },

    onLeftTopIn : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftTopIn);
    },

    //-
    onRightTopGap : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightTopGap);
    },

    onRightBottomGap : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.RightBottomGap);
    },

    onLeftBottomGap : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftBottomGap);
    },

    onLeftTopGap : function () {
        this.trigger(lc.Event.Edit.ShowMapBound, lc.GameType.MapType.LeftTopGap);
    },


    // -
    onOpenMap: function (data) {
        let isChecked = data.isChecked;
        this.trigger(lc.Event.Edit.IsOpenMap, isChecked);
    }

});
