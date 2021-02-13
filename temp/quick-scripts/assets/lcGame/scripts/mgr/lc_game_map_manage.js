(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/mgr/lc_game_map_manage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '10061yAsVVIupIq1QefM+lw', 'lc_game_map_manage', __filename);
// lcGame/scripts/mgr/lc_game_map_manage.js

"use strict";

/**
 * 地图管理器
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameMapMgr = cc.Class({

    extends: cc.Component,

    properties: {
        mapList: null, // 地图列表

        _row: 8, // 行
        _cow: 8 // 列
    },

    init: function init() {
        this._initMapList();
    },

    _initMapList: function _initMapList() {
        this.mapList = {};
        this.mapList[lc.GameType.ItemType.Map] = lc.game.asssetMgr.getPrefabByName("lc_game_map");
    },


    /**
     * 通过类型创建一个地图
     * 预留
     * @param type
     */
    createMapByType: function createMapByType(type) {
        var map = null;
        var prefab = this.mapList[type];

        if (prefab) {
            map = cc.instantiate(prefab);
        } else {
            tm.LOGD(true, "没有这个地图的prefab" + type);
        }

        return map;
    },


    /**
     * 获取默认地图
     * 包括
     * isOpen -- 地图是否开启
     *
     * map = {
     *     type -- 地图类型，可以有多个，表示边
     * }
     *
     * container = [] 容器里面为存在的元素
     * 一个格子上面可以有多个东西组成，障碍物可以重复，但是糖果不能。
     * 每个item 根据自己的属性加入到map的item中
     *
     */
    getDefaultMap: function getDefaultMap() {
        var map = [];
        for (var i = 0; i < this._cow; i++) {
            map[i] = [];
            for (var j = 0; j < this._row; j++) {
                var obj = {
                    'isOpen': true,
                    'map': {
                        'type': []
                    },
                    'container': []
                };

                map[i].push(obj);
            }
        }

        return map.slice(0);
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
        //# sourceMappingURL=lc_game_map_manage.js.map
        