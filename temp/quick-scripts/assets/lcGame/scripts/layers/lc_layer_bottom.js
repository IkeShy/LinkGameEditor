(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/layers/lc_layer_bottom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b50b7EoB0ZAQZJs9mo/4DGO', 'lc_layer_bottom', __filename);
// lcGame/scripts/layers/lc_layer_bottom.js

"use strict";

/**
 * 下方ui元素
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        m_propRocket: cc.Node, // 火箭
        m_propBrush: cc.Node, // 刷子
        m_propBomb: cc.Node, // 炸弹
        m_propHammer: cc.Node // 锤子
    },

    onLoad: function onLoad() {
        this._super();
    },
    onShow: function onShow() {
        this._super();
    },
    onDestroy: function onDestroy() {
        this._super();
    },


    /**
     * 火箭道具
     */
    onPropRocketFunc: function onPropRocketFunc() {},


    /**
     * 刷子道具
     */
    onPropBrushFunc: function onPropBrushFunc() {},


    /**
     * 炸弹道具道具
     */
    onPropBombFunc: function onPropBombFunc() {},


    /**
     * 锤子道具
     */
    onHammerFunc: function onHammerFunc() {
        this.trigger(lc.Event.PropEvent.UseHammer, { use: true });
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
        //# sourceMappingURL=lc_layer_bottom.js.map
        