(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/compoent/lc_game_component_shape.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '967dbE/GEFHxqkjqecSPa+X', 'lc_game_component_shape', __filename);
// lcGame/scripts/compoent/lc_game_component_shape.js

"use strict";

/**
 *  形状组件
 */
window.lc = window.lc || {};
lc.ComponentShape = cc.Class({
    extends: lc.ComponentBase,

    properties: {
        _shapeNode: null // 形状精灵
    },

    ctor: function ctor() {
        this._type = lc.GameType.ComType.Shape;
    },
    init: function init() {
        if (this._item) {
            var spf = this._item.spf[0];
            var comNode = this._item.comNode;

            this._shapeNode = new cc.Node();
            var sp = this._shapeNode.addComponent(cc.Sprite);
            sp.spriteFrame = spf;
            sp.node.width = sp.node.width / 2;
            sp.node.height = sp.node.height / 2;
            comNode.addChild(this._shapeNode);
        }
    },
    doLogic: function doLogic() {
        // 如果开启
        if (this.enabled) {}
    },


    /**
     * 改变形状 -- 贴图
     */
    changeShape: function changeShape(spf) {
        if (this._shapeNode) {
            var sp = this._shapeNode.getComponent("cc.Sprite");
            if (sp) {
                sp.spriteFrame = spf;
            }
        }
    },
    destroy: function destroy() {
        if (this._shapeNode) {
            this._shapeNode.removeFromParent(true);
            this._shapeNode = null;
        }

        this._super();
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
        //# sourceMappingURL=lc_game_component_shape.js.map
        