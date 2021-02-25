(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/lcGame/scripts/mgr/lc_game_assets_manager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8d1f23kq2ZJ+6RT/OYDiHcJ', 'lc_game_assets_manager', __filename);
// lcGame/scripts/mgr/lc_game_assets_manager.js

'use strict';

/**
 *
 * 内容: 资源管理器
 *
 */

window.lc = window.lc || {};

lc.GameAsssetsMgr = cc.Class({

    extends: cc.Component,

    properties: {

        resList: [],
        prefabList: null

        // pngArray: [],
        // plistArray: [],

        // skeletonArray: [],
        // fontArray:[],
    },

    init: function init() {
        this.prefabList = {};
        this._initResList();
    },
    _initResList: function _initResList() {
        this.resList = [
        // 糖果
        { type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_blue' }, { type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_yellow' }, { type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_pink' }, { type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_green' }, { type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_red' },

        // 地图
        { type: cc.Prefab, url: 'cn/prefab/maps/lc_game_map' },

        // 障碍物
        { type: cc.Prefab, url: 'cn/prefab/hinder/lc_game_hinder_box' },

        // 道具
        { type: cc.Prefab, url: 'cn/prefab/prop/lc_game_prop_rocket' }];
    },


    /**
     * 获取资源请求列表
     * @returns {{type: *, url: string}[]|*}
     */
    getResList: function getResList() {
        return this.resList;
    },


    /**
     * 添加预制件资源
     * @param url
     * @param prefab
     */
    addPrefab: function addPrefab(url, prefab) {
        if (url && prefab) {
            this.prefabList[prefab.name] = prefab;
        }
    },

    /**
     * 通过名字获取圆形
     * @param name
     * @returns {*}
     */
    getPrefabByName: function getPrefabByName(name) {
        return this.prefabList[name];
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
        //# sourceMappingURL=lc_game_assets_manager.js.map
        