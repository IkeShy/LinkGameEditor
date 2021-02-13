(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/sweets/lc_game_sweets_base.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0cd53bG4IFEiJJk4X71kdbh', 'lc_game_sweets_base', __filename);
// lcGame/scripts/items/sweets/lc_game_sweets_base.js

"use strict";

/**
 * 游戏元素：糖果父类
 */
window.lc = window.lc || {};

lc.SweetsBase = cc.Class({
    extends: lc.ItemBase,

    properties: {
        beatCount: 1 // 受打击数量
    },

    ctor: function ctor() {
        this._itemPriority = lc.GamePriority.Sweets;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this.addComByType(lc.GameType.ComType.Shape);
        this.addComByType(lc.GameType.ComType.Chance);
        this.addComByType(lc.GameType.ComType.Beat);
        this.addComByType(lc.GameType.ComType.Remove);
        this.addComByType(lc.GameType.ComType.Crash);
        this.addComByType(lc.GameType.ComType.Crashed);
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
        //# sourceMappingURL=lc_game_sweets_base.js.map
        