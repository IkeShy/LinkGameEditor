(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/items/container/lc_game_container.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f97ddkw6wFPzozaX6UCrxqQ', 'lc_game_container', __filename);
// lcGame/scripts/items/container/lc_game_container.js

"use strict";

/**
 * 游戏元素：容器
 */
window.lc = window.lc || {};

lc.Container = cc.Class({
    extends: require("../lc_game_item_base"),

    properties: {
        logicX: {
            visible: false,
            get: function get() {
                return this._logicX;
            }
        }, // 物体的逻辑坐标X

        logicY: {
            visible: false,
            get: function get() {
                return this._logicY;
            }
        }, // 物体的逻辑坐标Y

        itemNode: cc.Node, // 元素节点
        _itemList: null
    },

    ctor: function ctor() {
        this._itemList = [];
        this._itemType = lc.GameType.ItemType.Container;
    },
    onLoad: function onLoad() {
        this._super();
    },
    start: function start() {},


    /**
     * 添加一个元素
     * 不重复添加同一种元素
     * 有限制直接按照数组队列插入
     * 如果已经存在就删除
     * Priority 元素优先级是在工厂里赋值的，
     * 直接继承itembase有个bug
     * @param item
     */
    addItemByType: function addItemByType(type) {
        var item = this.game.itemFactory.createItemByType(type);
        if (item) {
            var priority = item.priority;
            var old = this._itemList[priority];
            if (old) {
                old.destroy();
                old = null;
            }

            this._itemList[priority] = item;
            this.itemNode.addChild(item, priority);
        }
    },


    /**
     * 获取容器中现存的类型列表
     */
    getItemList: function getItemList() {
        var list = [];
        this._itemList.forEach(function (value) {
            var type = value.itemType;
            if (type) {
                list.push(type);
            } else {
                tm.LOGD("地图类型不存在：", type);
            }
        });

        return list;
    },


    /**
     * 设置物体的坐标
     * @private
     */
    setPos: function setPos(pos, x, y) {
        this._logicX = x;
        this._logicY = y;

        this.node.setPosition(pos.x, pos.y);
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
    removeComByType: function removeComByType(type) {
        var com = this._comMap[type];
        if (com) {
            com.destroy();
            com = null;
            delete this._comMap[type];
        }
    },


    /**
     * 通过数据
     * 设置容器
     * @param info
     */
    setContainer: function setContainer(info) {
        if (info.isOpen) {
            var items = info.container;
            for (var i = 0; i < items.length; i++) {
                this.addItemByType(items[i]);
            }
        }
    },


    /**
     * 是否被点击
     * @param location
     * @returns {*}
     */
    isInTouch: function isInTouch(location) {
        var bound = this.node.getBoundingBoxToWorld();
        return bound.contains(location) ? this.node : null;
    },


    /**
     * 是否死亡
     * 条件是当前容器是否还有元素
     * @returns {boolean}
     */
    isDead: function isDead() {
        return this._itemList.length == 0;
    },


    /**
     * 是否可以选择
     * 从容器存储的尾部
     * 开始获取他是否有
     * 可选择组件，如果有的话，
     * 判断是否开启了选择组件。
     */
    isCanChance: function isCanChance() {
        var flag = false;
        var last = this._itemList[this._itemList.length - 1];

        if (last) {
            var logic = last.getComponent('lc_game_item_base');
            flag = logic.isCanChance();
        }

        return flag;
    },


    /**
     * 是否在相同的位置
     * @param x
     * @param y
     * @returns {boolean}
     */
    checkIsSamePos: function checkIsSamePos(x, y) {
        if (x == this._logicX && y == this._logicY) {
            return true;
        }

        return false;
    },


    /**
     * 获取当前类型
     */
    getCurType: function getCurType() {
        var type = null;
        var last = this._itemList[this._itemList.length - 1];
        if (last) {
            var logic = last.getComponent('lc_game_item_base');
            type = logic.ItemType;
        }

        return type;
    },
    getCurSweetsType: function getCurSweetsType() {
        var type = null;
        var last = this._itemList[this._itemList.length - 1];
        if (last) {
            var logic = last.getComponent('lc_game_sweets_base');
            type = logic.SweetType;
        }

        return type;
    },


    /**
     * 是否是同一类型
     * @param type
     * @returns {boolean}
     */
    checkIsSameType: function checkIsSameType(curr) {
        var flag = false;
        var cType = curr.getCurType();
        if (cType == lc.GameType.ItemType.Sweets) {
            var last = this._itemList[this._itemList.length - 1];
            if (last) {
                var _cType = curr.getCurSweetsType();
                var logic = last.getComponent('lc_game_item_base');
                flag = _cType == logic.SweetType;
            }
        } else if (cType == lc.GameType.ItemType.Prop) {
            flag = true;
        }

        return flag;
    },


    /**
     * 是否在区域内
     * @param ele
     * @returns {boolean}
     */
    checkIsInArea: function checkIsInArea(ele) {
        var flag = false;
        var ax = ele.logicX;
        var ay = ele.logicY;

        var bx = this.logicX;
        var by = this.logicY;

        if (ax - 1 == bx && ay + 1 == by || //左上
        ax == bx && ay + 1 == by //上
        || ax + 1 == bx && ay + 1 == by //右上
        || ax - 1 == bx && ay == by //左
        || ax + 1 == bx && ay == by //右
        || ax - 1 == bx && ay - 1 == by //左下
        || ax == bx && ay - 1 == by //下
        || ax + 1 == bx && ay - 1 == by) //右下
            {
                flag = true;
            }

        return flag;
    },


    /**
     * 获取下一个元素与自己的旋转
     * @param ele
     * @returns {number}
     */
    getNextRotation: function getNextRotation(ele) {
        var rotation = 0;
        var ax = ele.logicX;
        var ay = ele.logicY;

        var bx = this.logicX;
        var by = this.logicY;

        // 上
        if (ax == bx && ay + 1 == by) {
            rotation = 180;
        }

        // 右上
        else if (ax + 1 == bx && ay + 1 == by) {
                rotation = 225;
            }

            // 右
            else if (ax + 1 == bx && ay == by) {
                    rotation = 270;
                }

                // 右下
                else if (ax + 1 == bx && ay - 1 == by) {
                        rotation = 315;
                    }

                    // 下
                    else if (ax == bx && ay - 1 == by) {
                            rotation = 0;
                        }

                        // 左下
                        else if (ax - 1 == bx && ay - 1 == by) {
                                rotation = 45;
                            }

                            // 左
                            else if (ax - 1 == bx && ay == by) {
                                    rotation = 90;
                                }

                                // 左上
                                else if (ax - 1 == bx && ay + 1 == by) {
                                        rotation = 135;
                                    }

        return rotation;
    },


    /**
     * 下落
     * @param y
     * @param posX
     * @param posY
     */
    dropTo: function dropTo(y, posX, posY) {
        this._logicY = y;
        this.node.runAction(cc.moveBy(0.5, cc.v2(posX, -posY)).easing(cc.easeBackIn()));
    },


    /**
     * 被打击
     * 选中后消除
     */
    onBeat: function onBeat() {
        var last = this._itemList[this._itemList.length - 1];

        if (last) {
            var logic = last.getComponent('lc_game_item_base');
            if (logic.onBeat()) {
                this.onCrash();
                this.onRemove();
            }
        }
    },


    /**
     * 移除组件
     * 如果成功
     * 移除最后
     * 元素
     */
    onRemove: function onRemove() {
        var last = this._itemList[this._itemList.length - 1];

        if (last) {
            var logic = last.getComponent('lc_game_item_base');
            if (logic.onRemove()) {
                last.destroy();
                last = null;

                this._itemList.pop();
            }
        }
    },


    /**
     * 撞击
     * @private
     */
    onCrash: function onCrash() {
        var last = this._itemList[this._itemList.length - 1];
        if (last) {
            var info = {
                'x': this._logicX,
                'y': this._logicY
            };

            var logic = last.getComponent('lc_game_item_base');
            logic.onCrash(info);
        }
    },


    /**
     * 撞击
     * 消除后被溅射
     */
    onCrashed: function onCrashed() {
        var last = this._itemList[this._itemList.length - 1];
        if (last) {
            var logic = last.getComponent('lc_game_item_base');
            if (logic.onCrashed()) {
                this.onRemove();
            }
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
        //# sourceMappingURL=lc_game_container.js.map
        