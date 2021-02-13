(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/edit/scripts/lc_hinder_select_ui .js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eb2d743181JfpSgpNssH8La', 'lc_hinder_select_ui ', __filename);
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
        //# sourceMappingURL=lc_hinder_select_ui .js.map
        