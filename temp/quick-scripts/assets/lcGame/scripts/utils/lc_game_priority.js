(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/utils/lc_game_priority.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5e4fcVIQGpJ7JgqGDEYBgh0', 'lc_game_priority', __filename);
// lcGame/scripts/utils/lc_game_priority.js

"use strict";

/**
 *
 * 内容: 游戏用到的优先级
 *
 */

window.lc = window.lc || {};

lc.GamePriority = lc.GamePriority || {};

lc.GamePriority = {};

// 优先级
lc.GamePriority = {
  "Invalid": -1, // 无效
  "Sweets": 0, // 糖果
  "Prop": 0, // 道具
  "HinderBox": 1 // 障碍物--箱子
};

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
        //# sourceMappingURL=lc_game_priority.js.map
        