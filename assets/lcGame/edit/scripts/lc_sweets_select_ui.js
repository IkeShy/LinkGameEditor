/**
 * 编辑器 -- 糖果选择ui
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

    // - 蓝色
    onChooseBlue : function () {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Blue);
    },

    // - 绿色
    onChooseGreen : function () {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Green);
    },

    // - 粉色
    onChoosePink : function () {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Pink);
    },

    // - 红色
    onChooseRed : function () {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Red);
    },

    // - 黄色
    onChooseYellow : function () {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Yellow);
    },


});
