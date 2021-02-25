/**
 * 内容：道具工厂
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GamePropFactory = cc.Class({

    extends:cc.Component,

    properties : {
        propMap: null, // 糖果列表
    },

    init : function () {
        this._initPropMap();
    },

    /**
     * 初始化组件库
     * @private
     */
    _initPropMap () {
        this.propMap = {};

        let prop_rocket = lc.game.asssetMgr.getPrefabByName("lc_game_prop_rocket");
        this.propMap[lc.GameType.PropType.Rocket] = prop_rocket;
    },

    /**
     * 通过类型创建道具
     */
    createPropByType (type) {
        let prop = null;
        let prefab = this.sweetsMap[type];

        if(prefab) {
            prop = cc.instantiate(prefab);
            let logic = prop.getComponent('lc_game_prop_base');
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
    createItemByType (type) {
        let prop = this.createPropByType(type);
        return prop;
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