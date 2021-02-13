(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/compoent/lc_game_component_move.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dc3b1u5vdtKR7UbqlAUpoRe', 'lc_game_component_move', __filename);
// lcGame/scripts/compoent/lc_game_component_move.js

"use strict";

/**
 *  移动组件
 */
window.lc = window.lc || {};
lc.ComponentMove = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Move;
    },
    init: function init() {},
    doLogic: function doLogic() {
        // 如果开启
        if (this.enabled) {}
    },
    destroy: function destroy() {
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
        //# sourceMappingURL=lc_game_component_move.js.map
        