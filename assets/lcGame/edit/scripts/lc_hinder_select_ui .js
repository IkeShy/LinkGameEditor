/**
 * 编辑器 -- 障碍物选择ui
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

    // - 选择障碍物箱子
    onChooseBox : function () {
        this.trigger(lc.Event.Edit.ChooseHinder, lc.GameType.HinderType.Box);
    },


});
