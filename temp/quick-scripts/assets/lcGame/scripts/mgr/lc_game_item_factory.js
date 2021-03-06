(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/mgr/lc_game_item_factory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '29448Td+/tIg6lFjqTKu8Wb', 'lc_game_item_factory', __filename);
// lcGame/scripts/mgr/lc_game_item_factory.js

"use strict";

/**
 * 内容：元素工厂
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameItemFactory = cc.Class({

    extends: cc.Component,

    properties: {
        _itemFactory: null // 队列工厂
    },

    init: function init() {
        this.initItemFactory();
    },

    /**
     * 初始化元素队列
     */
    initItemFactory: function initItemFactory() {
        this._itemFactory = {};

        // 糖果
        this._itemFactory[lc.GameType.SweetsType.Blue] = lc.game.sweetsFactory;
        this._itemFactory[lc.GameType.SweetsType.Yellow] = lc.game.sweetsFactory;
        this._itemFactory[lc.GameType.SweetsType.Pink] = lc.game.sweetsFactory;
        this._itemFactory[lc.GameType.SweetsType.Green] = lc.game.sweetsFactory;
        this._itemFactory[lc.GameType.SweetsType.Red] = lc.game.sweetsFactory;

        // 箱子
        this._itemFactory[lc.GameType.HinderType.Box] = lc.game.hinderFactory;

        // 火箭道具
        this._itemFactory[lc.GameType.PropType.Rocket] = lc.game.GamePropFactory;
    },

    /**
     * 通过类型创建糖果
     */
    createItemByType: function createItemByType(type) {
        var item = null;
        var factory = this._itemFactory[type];
        if (factory) {
            item = factory.createItemByType(type);
        }

        return item;
    },


    /**
     * 释放函数
     */
    onDestroy: function onDestroy() {
        tm.notifierCenter.ignoreScope(this);

        if (lc.game) {
            lc.game.ignoreScope(this);
        }
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
        //# sourceMappingURL=lc_game_item_factory.js.map
        