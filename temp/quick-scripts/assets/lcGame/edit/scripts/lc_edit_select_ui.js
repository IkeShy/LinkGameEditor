(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/edit/scripts/lc_edit_select_ui.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '29cd2eEwZhExamwZvsXrUSh', 'lc_edit_select_ui', __filename);
// lcGame/edit/scripts/lc_edit_select_ui.js

"use strict";

/**
 * 编辑器 -- 编辑器选择ui
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        mapNode: cc.Node, // 地图节点
        sweetsNode: cc.Node, // 糖果节点
        hinderNode: cc.Node // 障碍物节点
    },

    onLoad: function onLoad() {
        this._super();
        this.onClickMap();
    },


    onShow: function onShow(data) {
        this._super();
    },

    /**
     * 点击地图选项
     */
    onClickMap: function onClickMap() {
        this.mapNode.active = true;
        this.sweetsNode.active = false;
        this.hinderNode.active = false;
    },

    /**
     * 点击糖果选项
     */
    onClickSweet: function onClickSweet() {
        this.sweetsNode.active = true;
        this.mapNode.active = false;
        this.hinderNode.active = false;
    },

    /**
     * 点击障碍物选项
     */
    onClickHinder: function onClickHinder() {
        this.hinderNode.active = true;
        this.mapNode.active = false;
        this.sweetsNode.active = false;
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
        //# sourceMappingURL=lc_edit_select_ui.js.map
        