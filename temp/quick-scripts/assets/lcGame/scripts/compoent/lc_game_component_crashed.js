(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/compoent/lc_game_component_crashed.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '59cc5Yf2ddFprAeT2PQp8J1', 'lc_game_component_crashed', __filename);
// lcGame/scripts/compoent/lc_game_component_crashed.js

"use strict";

/**
 *  被撞击组件
 */
window.lc = window.lc || {};
lc.ComponentCrashed = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Crashed;
    },
    init: function init() {
        if (this._item) {
            this.enabled = true;
        }
    },
    doLogic: function doLogic() {
        // 如果开启
        var flag = false;
        if (this.enabled) {
            this._item.beatCount--;
            if (this._item.beatCount <= 0) {
                flag = true;
            }
        }

        return flag;
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
        //# sourceMappingURL=lc_game_component_crashed.js.map
        