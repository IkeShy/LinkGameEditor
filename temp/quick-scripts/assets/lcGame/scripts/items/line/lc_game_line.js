(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/line/lc_game_line.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '30c9dJAPxNALosMfqQjPad5', 'lc_game_line', __filename);
// lcGame/scripts/items/line/lc_game_line.js

"use strict";

/**
 * 游戏的线
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        line: cc.Node // 连线8方向
    },

    onLoad: function onLoad() {
        this._super();
    },
    show: function show() {
        this.node.active = true;
    },
    pos: function pos(x, y) {
        this.node.x = x;
        this.node.y = y;
    },
    setHigh: function setHigh(value) {
        this.line.height = value;
    },
    hide: function hide() {
        this.node.active = false;
    },
    setRotation: function setRotation(value) {
        this.node.rotation = value;
    },


    /**
     * 设置线的颜色
     * @param color
     */
    setLineColor: function setLineColor(color) {
        this.line.color = cc.color(0, 0, 0).fromHEX(color);
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
        //# sourceMappingURL=lc_game_line.js.map
        