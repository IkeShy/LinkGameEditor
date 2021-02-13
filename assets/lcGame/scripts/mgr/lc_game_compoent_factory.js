/**
 * 内容：组件工厂
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameCompoentFactory = cc.Class({

    extends:cc.Component,

    properties : {
        comMap: null, // 组件列表
    },

    init : function () {
        this._initComMap();
    },

    /**
     * 初始化组件库
     * @private
     */
    _initComMap () {
        this.comMap = {};
        this.comMap[lc.GameType.ComType.Chance] = lc.ComponentChance;
        this.comMap[lc.GameType.ComType.Shape] = lc.ComponentShape;
        this.comMap[lc.GameType.ComType.Move] = lc.ComponentMove;
        this.comMap[lc.GameType.ComType.Remove] = lc.ComponentRemove;
        this.comMap[lc.GameType.ComType.Beat] = lc.ComponentBeat;
        this.comMap[lc.GameType.ComType.Crash] = lc.ComponentCrash;
        this.comMap[lc.GameType.ComType.Crashed] = lc.ComponentCrashed;
    },

    /**
     * 通过类型创建组件
     */
    createComByType (type) {
        let com = null;
        if(this.comMap[type]) {
            com = this.comMap[type];
        }

        return com;
    },

    /**
     * 释放函数
     */
    onDestroy () {
        tm.notifierCenter.ignoreScope(this);

        if(lc.game) {
            lc.game.ignoreScope(this);
        }
    }
});