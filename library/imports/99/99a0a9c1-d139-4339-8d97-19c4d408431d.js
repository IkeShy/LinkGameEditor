"use strict";
cc._RF.push(module, '99a0anB0TlDOY2XGcTUCEMd', 'lc_sweets_select_ui');
// lcGame/edit/scripts/lc_sweets_select_ui.js

"use strict";

/**
 * 编辑器 -- 糖果选择ui
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

    // - 蓝色
    onChooseBlue: function onChooseBlue() {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Blue);
    },

    // - 绿色
    onChooseGreen: function onChooseGreen() {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Green);
    },

    // - 粉色
    onChoosePink: function onChoosePink() {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Pink);
    },

    // - 红色
    onChooseRed: function onChooseRed() {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Red);
    },

    // - 黄色
    onChooseYellow: function onChooseYellow() {
        this.trigger(lc.Event.Edit.ChooseSweets, lc.GameType.SweetsType.Yellow);
    }

});

cc._RF.pop();