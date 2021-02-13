/**
 * 游戏编辑器
 */
cc.Class({
    extends: tm.BaseScene,

    properties: {
        m_raw: 8, // 行
        m_col: 8, // 列

        gameAreaBg: cc.Node, // 背景
        mapNode: cc.Node, // map的节点
        containerNode: cc.Node, // 容器的节点

        mapEleUIPrefab: cc.Prefab, // 地图元素ui
        containerPrefab: cc.Prefab, // 容器原型

        _curMap: null, // 当前选择的地图块
        _mapList: null, // 地图列表
        _containerList: null, // 容器列表
    },

    onLoad () {
        this._super();
        this._startX = -this.gameAreaBg.getContentSize().width / 2;
        this._startY = -this.gameAreaBg.getContentSize().height / 2;
        this._registerListen();
        this._addMapEleUi();

        this._initMap();
    },

    /**
     * 初始化地图
     * 容器也在这时候初始化
     * @private
     */
    _initMap () {
        let mapInfo  = this.game.mapMgr.getDefaultMap();
        if(mapInfo) {
            let oneWidth  = 81;
            let oneHeight = 81;
            this._mapList = [];
            this._containerList = [];

            for (let i = 0; i < mapInfo.length; i++) {
                let oneRow = mapInfo[i];
                this._mapList[i] = [];
                this._containerList[i] = [];

                for (let j = 0; j < oneRow.length; j++) {
                    let x = this._startX + oneWidth / 2 + oneWidth * i;
                    let y = this._startY + oneHeight * j;

                    // 地图
                    let oneMap = this.game.mapMgr.createMapByType(lc.GameType.ItemType.Map);
                    let mLogic = oneMap.getComponent('lc_game_map');
                    mLogic.setPos(cc.v2(x, y), i ,j);
                    this._mapList[i][j] = oneMap;
                    this.gameAreaBg.addChild(oneMap);


                    // 容器
                    let oneContainer = cc.instantiate(this.containerPrefab);
                    let mContainer = oneContainer.getComponent('lc_game_container');
                    mContainer.setPos(cc.v2(x, y), i ,j);
                    this._containerList[i][j] = mContainer;
                    this.gameAreaBg.addChild(oneContainer);
                }
            }
        }
    },

    /**
     * 添加地图元素ui
     * @private
     */
    _addMapEleUi () {
        let mapEleUI = cc.instantiate(this.mapEleUIPrefab);
        this.ui_parent.addChild(mapEleUI);
    },

    _registerListen () {
        this.register(lc.Event.Edit.ChooseMap, this.onChooseMap, this);
        this.register(lc.Event.Edit.IsOpenMap, this.onIsOpenMap, this);
        this.register(lc.Event.Edit.ShowMapBound, this.onMapBound, this);
        this.register(lc.Event.Edit.ChooseSweets, this.onChooseSweets, this);
        this.register(lc.Event.Edit.ChooseHinder, this.onChooseHinder, this);
    },

    /**
     * 选择地图
     */
    onChooseMap (info) {
        let x = info.x;
        let y = info.y;

        if( x != void 0 && y != void 0) {
            this._curMap = this._mapList[x][y];
            this.trigger(lc.Event.Edit.ShowMapEle);
        }
    },

    /**
     * 是否打开地图
     */

    onIsOpenMap (flag) {
        if(this._curMap) {
            let logic = this._curMap.getComponent('lc_game_map');
            logic.onMapOpen(flag);
        }
    },

    /**
     * 选择地图边框
     */
    onMapBound (type) {
        if(this._curMap) {
            let logic = this._curMap.getComponent('lc_game_map');
            logic.onShowMapBound(type);
        }
    },

    /**
     * 选择糖果
     */
    onChooseSweets (type) {
        if(this._curMap && type) {
            // 通过操作的地图获取到相应容器
            // 这里不应该报错
            let mapLogic = this._curMap.getComponent('lc_game_map');
            let container = this._containerList[mapLogic.logicX][mapLogic.logicY];
            let cLogic = container.getComponent('lc_game_container');
            cLogic.addItemByType(type);
        }
    },

    /**
     * 选择障碍物
     */
    onChooseHinder (type) {
        if(this._curMap && type) {
            // 通过操作的地图获取到相应容器
            // 这里不应该报错
            let mapLogic = this._curMap.getComponent('lc_game_map');
            let container = this._containerList[mapLogic.logicX][mapLogic.logicY];
            let cLogic = container.getComponent('lc_game_container');
            cLogic.addItemByType(type);
        }
    },

    /**
     * 下载
     */
    onDownLoad () {
        let mapInfo  = this.game.mapMgr.getDefaultMap();
        if(mapInfo) {
            for (let i = 0; i < mapInfo.length; i++) {
                let oneRow = mapInfo[i];
                let oneMapRow = this._mapList[i];
                let oneContainerRow = this._containerList[i];

                for (let j = 0; j < oneRow.length; j++) {
                    // 处理地图
                    let oneInfo = oneRow[j];

                    let oneMap = oneMapRow[j];
                    let mLogic = oneMap.getComponent('lc_game_map');
                    oneInfo.isOpen = mLogic.isMapOpen();
                    oneInfo.map.type = mLogic.getShowMapBound();

                    let oneContainer = oneContainerRow[j];
                    let cLogic = oneContainer.getComponent('lc_game_container');
                    oneInfo.container =  cLogic.getItemList();
                }
            }
        }



        let file = new File([JSON.stringify(mapInfo)], "LevelConfig.json", { type: "text/plain;charset=utf-8" });
        window.saveAs(file);
    }


});