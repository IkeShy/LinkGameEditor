(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/sweets/lc_game_sweets_green.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b8a4fUl+VZCdJlozaUet8Eo', 'lc_game_sweets_green', __filename);
// lcGame/scripts/items/sweets/lc_game_sweets_green.js

"use strict";

/**
 * 游戏元素： 绿色糖果
 */
window.lc = window.lc || {};
lc.SweetsGreen = cc.Class({
    extends: lc.SweetsBase,

    properties: {},

    ctor: function ctor() {
        this._sweetType = lc.GameType.SweetsType.Green;
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
        //# sourceMappingURL=lc_game_sweets_green.js.map
        