(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/sweets/lc_game_sweets_blue.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c2f4byGuLxDMo9z6SdBbt0l', 'lc_game_sweets_blue', __filename);
// lcGame/scripts/items/sweets/lc_game_sweets_blue.js

"use strict";

/**
 * 游戏元素： 蓝色糖果
 */
window.lc = window.lc || {};
lc.SweetsBlue = cc.Class({
    extends: lc.SweetsBase,

    properties: {},

    ctor: function ctor() {
        this._sweetType = lc.GameType.SweetsType.Blue;
    },
    onLoad: function onLoad() {
        this._super();
    },
    initUseCom: function initUseCom() {
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
        //# sourceMappingURL=lc_game_sweets_blue.js.map
        