/**
 *
 * 内容: 资源管理器
 *
 */

window.lc = window.lc || {};

lc.GameAsssetsMgr = cc.Class({

    extends:cc.Component,

    properties : {

        resList: [],
        prefabList: null,

        // pngArray: [],
        // plistArray: [],

        // skeletonArray: [],
        // fontArray:[],
    },

    init () {
        this.prefabList = {};
        this._initResList();
    },

    _initResList () {
        this.resList = [
            // 糖果
            {type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_blue'},
            {type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_yellow'},
            {type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_pink'},
            {type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_green'},
            {type: cc.Prefab, url: 'cn/prefab/sweets/lc_game_sweets_red'},


            // 地图
            {type: cc.Prefab, url: 'cn/prefab/maps/lc_game_map'},

            // 障碍物
            {type: cc.Prefab, url: 'cn/prefab/hinder/lc_game_hinder_box'},

            // 道具
            {type: cc.Prefab, url: 'cn/prefab/prop/lc_game_prop_rocket'},
        ];
    },

    /**
     * 获取资源请求列表
     * @returns {{type: *, url: string}[]|*}
     */
    getResList () {
        return this.resList;
    },

    /**
     * 添加预制件资源
     * @param url
     * @param prefab
     */
    addPrefab: function (url, prefab) {
        if(url && prefab) {
            this.prefabList[prefab.name] = prefab;
        }
    },

    /**
     * 通过名字获取圆形
     * @param name
     * @returns {*}
     */
    getPrefabByName: function (name) {
        return this.prefabList[name];
    }


});