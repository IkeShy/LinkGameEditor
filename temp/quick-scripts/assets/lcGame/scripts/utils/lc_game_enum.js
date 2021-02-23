(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/utils/lc_game_enum.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3e68bMD0OBC073w9YpUe4U1', 'lc_game_enum', __filename);
// lcGame/scripts/utils/lc_game_enum.js

"use strict";

/**
 *
 * 内容: 游戏用到的枚举
 *
 */

window.lc = window.lc || {};

lc.GameEnum = lc.GameEnum || {};
lc.GameEnum = {};

lc.GameEnum.CrashToType = cc.Enum({
    "Invalid": 0, // 无效
    "Left": 1, // 左
    "Right": 2, // 右
    "Up": 3, // 上
    "Down": 4, // 下

    "LeftUpAndRightDown": 5, // 左上和右下
    "LeftDownAndRightUp": 6, // 左下和右上

    "Row": 7, // 行
    "Col": 8, // 竖
    "Cross": 9, // 十字

    "X": 10 // X字
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
        //# sourceMappingURL=lc_game_enum.js.map
        