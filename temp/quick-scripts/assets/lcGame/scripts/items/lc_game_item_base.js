(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/lc_game_item_base.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '70128KLc9VOWI3w4HQjRmOU', 'lc_game_item_base', __filename);
// lcGame/scripts/items/lc_game_item_base.js

'use strict';

/**
 * 游戏元素：元素父类 -- 所有东西都继承他
 */
window.lc = window.lc || {};
lc.ItemBase = cc.Class({
    extends: tm.GameWapper,

    properties: {
        comNode: cc.Node, // 组件的节点
        spf: [cc.SpriteFrame], // 贴图
        crashToType: { // 爆炸朝向
            visible: true,
            default: lc.GameEnum.CrashToType.Invalid,
            type: lc.GameEnum.CrashToType
        },

        crashCount: 1, // 爆炸关联数量

        _comMap: null, // 组件列表

        Priority: {
            visible: false,
            get: function get() {
                return this._itemPriority;
            }
        }, // 优先级

        ItemType: {
            visible: false,
            get: function get() {
                return this._itemType;
            }
        } // 物体类型

    },

    ctor: function ctor() {
        this._itemPriority = lc.GamePriority.Invalid;
        this._itemType = lc.GameType.ItemType.Invalid;
    },
    onLoad: function onLoad() {
        this._super();
        this._comMap = {};
        this.initUseCom();
    },
    onDestroy: function onDestroy() {
        this._removeAllCom();

        this._super();
    },


    /**
     * 移除所有组件
     * @private
     */
    _removeAllCom: function _removeAllCom() {
        for (var key in this._comMap) {
            var oneCom = this._comMap[key];
            if (oneCom) {
                oneCom.destroy();
            }
        }
    },


    /**
     * 初始化组件
     */
    initUseCom: function initUseCom() {
        return;
    },

    /**
     * 添加组件
     */
    addComByType: function addComByType(type) {
        var clazz = this.game.comFactory.createComByType(type);
        if (clazz) {
            var com = new clazz();
            com.item = this;
            com.init();

            this._comMap[type] = com;
        } else {
            tm.LOGE(false, 'addComByType error : ' + type);
        }
    },


    /**
     * 移除组件
     */
    removeComByType: function removeComByType(type) {},


    /**
     * 是否可选择
     */
    isCanChance: function isCanChance() {
        return this._doComLogicByType(lc.GameType.ComType.Chance);
    },
    onBeat: function onBeat() {
        return this._doComLogicByType(lc.GameType.ComType.Beat);
    },
    onRemove: function onRemove() {
        return this._doComLogicByType(lc.GameType.ComType.Remove);
    },


    /**
     * 是否可以爆炸
     * @returns
     */
    onCrash: function onCrash(info) {
        return this._doComLogicByType(lc.GameType.ComType.Crash, info);
    },


    /**
     * 是否可以被爆炸
     * @returns
     */
    onCrashed: function onCrashed() {
        return this._doComLogicByType(lc.GameType.ComType.Crashed);
    },
    _doComLogicByType: function _doComLogicByType(type, info) {
        var flag = false;
        var com = this._comMap[type];
        if (com) {
            flag = com.doLogic(info);
        }

        return flag;
    },


    /**
     * 设置物体的坐标
     * @private
     */
    setPos: function setPos(x, y) {
        this.node.setPosition(x, y);
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
        //# sourceMappingURL=lc_game_item_base.js.map
        