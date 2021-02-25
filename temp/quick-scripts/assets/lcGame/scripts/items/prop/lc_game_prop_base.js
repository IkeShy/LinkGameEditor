(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/prop/lc_game_prop_base.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b3993DBLDVKUKL2TrQqeRm6', 'lc_game_prop_base', __filename);
// lcGame/scripts/items/prop/lc_game_prop_base.js

"use strict";

/**
 * 游戏元素：道具父类
 */
window.lc = window.lc || {};

lc.PropBase = cc.Class({
    extends: lc.ItemBase,

    properties: {
        crashToType: { // 爆炸朝向
            visible: true,
            default: lc.GameEnum.CrashToType.Invalid,
            type: lc.GameEnum.CrashToType
        },

        crashCount: 1, // 爆炸关联数量

        PropType: {
            visible: false,
            get: function get() {
                return this._propType; //  道具类型
            }
        }
    },

    ctor: function ctor() {
        this._itemPriority = lc.GamePriority.Prop;
        this._itemType = lc.GameType.ItemType.Prop;
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
        //# sourceMappingURL=lc_game_prop_base.js.map
        