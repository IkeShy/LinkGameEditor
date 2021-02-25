(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/mgr/lc_game_prop_factory.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '13707W4mNZGAZ2mm4A1QR8M', 'lc_game_prop_factory', __filename);
// lcGame/scripts/mgr/lc_game_prop_factory.js

"use strict";

/**
 * 内容：道具工厂
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GamePropFactory = cc.Class({

    extends: cc.Component,

    properties: {
        propMap: null // 糖果列表
    },

    init: function init() {
        this._initPropMap();
    },

    /**
     * 初始化组件库
     * @private
     */
    _initPropMap: function _initPropMap() {
        this.propMap = {};

        var prop_rocket = lc.game.asssetMgr.getPrefabByName("lc_game_prop_rocket");
        this.propMap[lc.GameType.PropType.Rocket] = prop_rocket;
    },


    /**
     * 通过类型创建道具
     */
    createPropByType: function createPropByType(type) {
        var prop = null;
        var prefab = this.sweetsMap[type];

        if (prefab) {
            prop = cc.instantiate(prefab);
            var logic = prop.getComponent('lc_game_prop_base');
            prop.priority = logic.Priority;
            prop.itemType = logic.ItemType;
        } else {
            tm.LOGD(true, "没有这个道具的prefab：" + type);
        }

        return prop;
    },


    /**
     * 通过类型创建元素
     */
    createItemByType: function createItemByType(type) {
        var prop = this.createPropByType(type);
        return prop;
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
        //# sourceMappingURL=lc_game_prop_factory.js.map
        