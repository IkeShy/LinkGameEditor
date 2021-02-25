(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/prop/lc_game_prop_rokect.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ce598aEcFHLIxkRaukA2LI', 'lc_game_prop_rokect', __filename);
// lcGame/scripts/items/prop/lc_game_prop_rokect.js

"use strict";

/**
 * 游戏元素： 道具火箭
 */
window.lc = window.lc || {};
lc.PropRokect = cc.Class({
    extends: lc.PropBase,

    properties: {},

    ctor: function ctor() {
        this._propType = lc.GameType.PropType.Rocket;
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
        //# sourceMappingURL=lc_game_prop_rokect.js.map
        