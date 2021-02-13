/**
 * 游戏元素 -- 游戏区域
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        _startX: 0, // 初始化x坐标
        _startY: 0, // 初始化y坐标


        _curLevelInfo: null, // 当前地图数据
        _mapList: null,

        // creator
        mapNode: cc.Node,
    },

    onLoad () {
        this._super();
        this._mapList = [];
        this._startX = -this.mapNode.getContentSize().width / 2;
        this._startY = -(this.mapNode.getContentSize().height - 45) ;

        this._parseInfo();
    },

    _parseInfo: function  () {
        this._curLevelInfo = this.game.levelMgr.getLevelInfo();
        this._createMap();
    },

    /**
     * 创建地图
     * @private
     */
    _createMap: function () {
        let oneWidth  = 81;
        let oneHeight = 81;
        for (let col = 0; col <  this._curLevelInfo.length; col++) {
            this._mapList[col] = [];
            let oneCol = this._curLevelInfo[col];
            if(oneCol) {
                for (let raw = 0; raw < oneCol.length; raw ++) {
                    let oneMapInfo = oneCol[raw];

                    let x = this._startX + oneWidth / 2 + oneWidth * col;
                    let y = this._startY + oneHeight * raw;

                    // 地图
                    let oneMap = this.game.mapMgr.createMapByType(lc.GameType.ItemType.Map);
                    let mLogic = oneMap.getComponent('lc_game_map');

                    this.mapNode.addChild(oneMap);

                    mLogic.setPos(x, y);
                    mLogic.setMap(oneMapInfo);

                    this._mapList[col][raw] = oneMap;
                }
            }
        }
    }

});
