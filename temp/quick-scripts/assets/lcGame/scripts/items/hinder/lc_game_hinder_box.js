(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/hinder/lc_game_hinder_box.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d0f2dDpmFD4KDBo1A4KM/G', 'lc_game_hinder_box', __filename);
// lcGame/scripts/items/hinder/lc_game_hinder_box.js

"use strict";

/**
 * 游戏元素：障碍物 箱子
 */
window.lc = window.lc || {};

lc.HinderBox = cc.Class({
    extends: require("../lc_game_item_base"),

    properties: {
        _hinderType: lc.GameType.HinderType.Box,

        HinderType: {
            visible: false,
            get: function get() {
                return this._hinderType; //  障碍物类型
            }
        }
    },

    ctor: function ctor() {
        this._itemPriority = lc.GamePriority.HinderBox;
        this._itemType = lc.GameType.ItemType.Hinder;
        this._hinderType = lc.GameType.HinderType.Box;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
        this.addComByType(lc.GameType.ComType.Shape);
        this.addComByType(lc.GameType.ComType.Beat);
        this.addComByType(lc.GameType.ComType.Crashed);
    },
    onBeatOver: function onBeatOver() {}
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
        //# sourceMappingURL=lc_game_hinder_box.js.map
        