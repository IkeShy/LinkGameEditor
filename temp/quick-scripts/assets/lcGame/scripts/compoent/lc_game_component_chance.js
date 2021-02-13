(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/compoent/lc_game_component_chance.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3be35hk+MNDq6oVZA7K3btM', 'lc_game_component_chance', __filename);
// lcGame/scripts/compoent/lc_game_component_chance.js

"use strict";

/**
 *  选择组件
 */
window.lc = window.lc || {};
lc.ComponentChance = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Chance;
    },
    init: function init() {
        this.enabled = true;
    },
    doLogic: function doLogic() {
        // 如果开启
        var flag = false;
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
        //# sourceMappingURL=lc_game_component_chance.js.map
        