"use strict";
cc._RF.push(module, 'eb2d743181JfpSgpNssH8La', 'lc_hinder_select_ui ');
// lcGame/edit/scripts/lc_hinder_select_ui .js

"use strict";

/**
 * 编辑器 -- 障碍物选择ui
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

    // - 选择障碍物箱子
    onChooseBox: function onChooseBox() {
        this.trigger(lc.Event.Edit.ChooseHinder, lc.GameType.HinderType.Box);
    }

});

cc._RF.pop();