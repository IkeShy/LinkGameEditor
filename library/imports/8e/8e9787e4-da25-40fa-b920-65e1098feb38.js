"use strict";
cc._RF.push(module, '8e978fk2iVA+rkgZeEJj+s4', 'lc_game_level_manage');
// lcGame/scripts/mgr/lc_game_level_manage.js

"use strict";

/**
 * 地图管理器
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameLevelMgr = cc.Class({

    extends: cc.Component,

    properties: {
        levelPool: null, // 关卡
        curLevel: null, // 当前关卡数据
        curLevelNum: 1, // 当前关卡
        sweetsType: null // 糖果的类型
    },

    init: function init() {
        this.levelPool = {};
        this.curLevel = null;
        this.curLevelNum = 1;
        this._initSweetsType();
    },

    /**
     * 初始化糖果类型
     * @private
     */
    _initSweetsType: function _initSweetsType() {
        this.sweetsType = [lc.GameType.SweetsType.Blue, lc.GameType.SweetsType.Green, lc.GameType.SweetsType.Pink, lc.GameType.SweetsType.Red, lc.GameType.SweetsType.Yellow];
    },


    /**
     * 注意：需要把json的文件放在resources中
     *
     */
    loadCurMapInfo: function loadCurMapInfo(level) {
        var _this = this;

        this.curLevelNum = level || this.curLevelNum;

        if (this.curLevelNum >= 0) {
            var _level = this.levelPool[this.curLevelNum];
            if (_level) {
                this.curLevel = _level;
                lc.game.trigger(lc.Event.GameEvent.LevelLoadSuccess);
            } else {

                var jsonUrl = 'mapInfo/level_%d'.replace("%d", this.curLevelNum);
                cc.loader.loadRes(jsonUrl, function (err, data) {
                    if (err) {
                        tm.LOGE("加载地图出错：" + err);
                    } else {
                        _this.curLevel = data.json;
                        _this.levelPool[_this.curLevelNum] = data.json;
                        lc.game.trigger(lc.Event.GameEvent.LevelLoadSuccess);
                    }
                });
            }
        }
    },


    /**
     * 通过关卡说去数据
     * @param level
     * @returns {*}
     */
    getLevelInfo: function getLevelInfo(level) {
        this.curLevelNum = level || this.curLevelNum;
        return this.levelPool[this.curLevelNum];
    },


    /**
     * 当前当前地图等级
     */
    setCurLevelNum: function setCurLevelNum(level) {
        this.curLevelNum = level;
    },


    /**
     * 获取当前关卡数
     */
    getCurLevelNum: function getCurLevelNum() {
        return this.curLevel || 1;
    },


    /**
     * 获取一个随机的糖果
     */
    getOneRandomSweetInfo: function getOneRandomSweetInfo() {
        var info = {
            "isOpen": true,
            "container": [lc.GameType.SweetsType.Blue]
        };

        var length = this.sweetsType.length;
        var index = tm.utils.randomInt(0, length);
        var type = this.sweetsType[index];

        if (type) {
            info.container[0] = type;
        }

        return info;
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