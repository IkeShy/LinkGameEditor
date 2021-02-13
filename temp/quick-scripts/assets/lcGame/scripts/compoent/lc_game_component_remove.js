(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/compoent/lc_game_component_remove.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ef580f/BvdCRr/1VFKETt3/', 'lc_game_component_remove', __filename);
// lcGame/scripts/compoent/lc_game_component_remove.js

"use strict";

/**
 *  消除组件
 */
window.lc = window.lc || {};
lc.ComponentRemove = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Remove;
    },
    init: function init() {
        this.enabled = true;
    },
    doLogic: function doLogic() {
        var flag = false;
        // 如果开启
        if (this.enabled) {
            flag = true;
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
        //# sourceMappingURL=lc_game_component_remove.js.map
        