/**
 * 游戏场景
 */
cc.Class({
    extends: tm.BaseScene,

    properties: {
        mapNode: cc.Node,
        mapPrefab: cc.Prefab,

        containerNode: cc.Node,
        containerPrefab: cc.Prefab,
    },

    onLoad () {
        this._super();
        this.game.levelMgr.loadCurMapInfo(1);
        this.register(lc.Event.GameEvent.LevelLoadSuccess, this._onLevelLoadSuccess, this);
    },

    _onLevelLoadSuccess () {
        this._addMap();
        this._addContainer();
    },

    /**
     * 添加地图
     * @private
     */
    _addMap () {
        let mapP = cc.instantiate(this.mapPrefab);
        if(mapP) {
            this.mapNode.addChild(mapP);
        }
    },

    /**
     * 添加容器
     * @private
     */
    _addContainer () {
        let containerP = cc.instantiate(this.containerPrefab);
        if(containerP) {
            this.containerNode.addChild(containerP);
        }
    }

});