(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/compoent/lc_game_component_crash.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '870b0xXJTRLILQjzrZRdv42', 'lc_game_component_crash', __filename);
// lcGame/scripts/compoent/lc_game_component_crash.js

'use strict';

/**
 *  撞击组件
 */
window.lc = window.lc || {};
lc.ComponentCrash = cc.Class({
    extends: lc.ComponentBase,

    properties: {},

    ctor: function ctor() {
        this.type = lc.GameType.ComType.Crash;
    },
    init: function init() {
        if (this._item) {
            this.enabled = true;
        }
    },
    doLogic: function doLogic(info) {
        // 如果开启
        var flag = false;
        if (this.enabled && info) {
            flag = true;

            info['to'] = this._item.crashToType;
            info['count'] = this._item.crashCount;

            lc.game.trigger(lc.Event.GameEvent.CrashOtherContainer, info);
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
        //# sourceMappingURL=lc_game_component_crash.js.map
        