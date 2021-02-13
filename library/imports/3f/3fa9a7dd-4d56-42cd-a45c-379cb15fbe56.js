"use strict";
cc._RF.push(module, '3fa9afdTVZCzaRcN5yxX75W', 'lc_logic_chance');
// lcGame/scripts/layers/logic/lc_logic_chance.js

"use strict";

/**
 * 游戏逻辑 -- 选择逻辑
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        _curEle: null, // 当前选择的元素
        _selectList: [], // 当前选择的所有
        _crashList: [], // 爆炸列表
        mixCount: 1 // 最小移除数量
    },

    onLoad: function onLoad() {
        this._super();
    },


    /**
     * 切换当前的元素
     * @param ele
     */
    changeCurEle: function changeCurEle(ele) {
        this.playEleEffect(ele);
        this._curEle = ele;
        this._selectList.push(ele);
    },


    /**
     * 是否和已有列表中的最后一个是相同的
     * @param gameEle
     * @private
     */
    isSame: function isSame(ele) {
        if (this._selectList.find(function (value) {
            return value === ele;
        })) {
            if (this._selectList.length > 1) {
                var last = this._selectList[this._selectList.length - 2];
                if (last) {
                    if (this._checkIsSamePos(last, ele)) {
                        this._popLastEle();
                    }
                }
            }

            return true;
        }

        return false;
    },

    /**
     * 检测是否是同一个
     * @private
     */
    _checkIsSamePos: function _checkIsSamePos(eleA, eleB) {
        var flag = false;
        if (eleA && eleB) {
            var logicX = eleA.logicX;
            var logicY = eleA.logicY;
            flag = eleB.checkIsSamePos(logicX, logicY);
        }

        return flag;
    },

    /**
     * 弹出最后一个游戏元素
     * @private
     */
    _popLastEle: function _popLastEle() {
        var ele = this._selectList.pop();
        if (ele) {
            this.stopEleEffect(ele);
        }

        ele = this._selectList[this._selectList.length - 1];
        if (ele) {
            this._curEle = ele;
            this.trigger(lc.Event.GameEvent.HideLastLine);
        }
    },

    /**
     * 是同一类型
     */
    isSameType: function isSameType(ele) {
        var flag = false;
        if (this._curEle) {
            if (ele.checkIsSameType(this._curEle)) {
                tm.LOGD("同一种类型的格子");
                flag = true;
            }
        } else {
            tm.LOGD("还没开始选择到格子");
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
        if (this._curEle) {
            if (ele.checkIsInArea(this._curEle)) {
                tm.LOGD("在区域内");
                flag = true;
            }
        } else {
            tm.LOGD("还没开始选择到格子");
        }

        return flag;
    },

    /**
     * 移除选中的网格
     */
    removeSelectList: function removeSelectList() {
        var isRemove = this._selectList.length >= this.mixCount ? true : false;
        if (isRemove) {
            this._cleanSelectList(isRemove);
        }
    },

    _cleanSelectList: function _cleanSelectList(isRemove) {
        this._selectList.forEach(function (value) {
            if (isRemove) {
                value.onBeat();
            }
        });

        this._selectList.length = 0;
    },


    /**
     * 添加被被撞物体
     * @param ele
     */
    addCrashedContainer: function addCrashedContainer(ele) {
        if (ele) {
            this._crashList.push(ele);
        }
    },


    /**
     * 触发被碰撞物体
     * @param info
     */
    onCrashedContainer: function onCrashedContainer() {
        var tmpList = [];
        for (var i = 0; i < this._crashList.length; i++) {
            var one = this._crashList[i];
            tmpList.push(one);
        }

        this._crashList.length = 0;

        tmpList.forEach(function (value) {
            value.onCrashed();
        });
    },
    getCurEle: function getCurEle() {
        return this._curEle;
    },
    playEleEffect: function playEleEffect(ele) {},
    stopEleEffect: function stopEleEffect(ele) {}
});

cc._RF.pop();