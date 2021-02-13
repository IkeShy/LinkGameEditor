/**
 * 游戏元素 -- 游戏区域
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        m_col: 8,
        m_raw: 8,

        _startX: 0, // 初始化x坐标
        _startY: 0, // 初始化y坐标

        _m_colSize: 0,
        _m_rawSize: 0,

        _m_currGameEle: null, // 当前的游戏元素
        _m_eleLineList: null, // 元素线列表
        _m_gameEleList: null, // 游戏元素列表

        _m_isTouchClick: false, // 是否触发点击
        _m_selectGameEleList: [], // 当前选择的游戏元素列表

        _findGameEleList: [], // 找到的游戏元素列表

        // creator
        m_mix_line: 3, // 合成需要数量
        m_hintLine: cc.Node, // 指示线段
        m_gameElePre: cc.Prefab, // 单个游戏元素
        m_eleLinePre: cc.Prefab, // 单个元素线


        m_gameLineNode:cc.Node, // 划线用的节点
        m_gameAreaBg: cc.Node, // 游戏区域背景
        m_gameMaskArea: cc.Node, // 游戏元素存放区域，用于遮罩
    },

    onLoad () {
        this._super();

        this._startX = -this.m_gameAreaBg.getContentSize().width / 2;
        this._startY = -(this.m_gameAreaBg.getContentSize().height - 45) ;

        //this._initEleLineList();
        //this._initGameEleList();
        //this._initListenGameAreaBgEvent();
    },

    start () {
        //this._createEleLineList();
        //this._createGameEleList();
    },

    /**
     * 初始化元素线list
     * @private
     */
    _initEleLineList: function () {
        this._m_eleLineList = [];

        for(let x = 0; x < this.m_col; x++){
            this._m_eleLineList[x]= new Array();

            for(let y=0; y < this.m_raw; y++){
                let line = cc.instantiate(this.m_eleLinePre);
                this._m_eleLineList[x][y] = line;
                this.m_gameLineNode.addChild(line);
            }
        }
    },

    /**
     * 创建元素线
     * @private
     */
    _createEleLineList: function () {
        let size = this.m_gameAreaBg.getContentSize();
        let oneCol = size.width / this.m_col;
        let oneRaw = size.height / this.m_raw;

        for(let i=0; i< this.m_col; i++){
            for(let j=0; j<this.m_raw; j++){

                let x = this._startX + oneCol / 2 + oneCol * i;
                let y = this._startY + oneRaw * j;
                if(this._m_eleLineList[i] && this._m_eleLineList[i][j]) {
                    let line = this._m_eleLineList[i][j];
                    let logic = line.getComponent('lc_game_line');
                    logic.init(x, y);
                }
            }
        }
    },

    /**
     * 初始化元素list
     * @private
     */
    _initGameEleList: function () {
        this._m_gameEleList = [];

        for(let x = 0; x < this.m_col; x++){
            this._m_gameEleList[x]= new Array();

            for(let y=0; y < this.m_raw; y++){
                let ele = cc.instantiate(this.m_gameElePre);
                this.m_gameMaskArea.addChild(ele);
                this._m_gameEleList[x][y] = ele;
            }
        }
    },

    /**
     * 创建游戏元素
     * @private
     */
    _createGameEleList: function () {
        let size = this.m_gameAreaBg.getContentSize();
        this._m_colSize = size.width / this.m_col;
        this._m_rawSize = size.height / this.m_raw;

        for(let i = 0; i < this.m_col; i++){
            for(let j = 0; j < this.m_raw; j++){
                let x = this._startX + this._m_colSize / 2 + this._m_colSize * i;
                let y = this._startY + this._m_rawSize * j;

                if(this._m_gameEleList[i] && this._m_gameEleList[i][j]) {
                    let ele = this._m_gameEleList[i][j];
                    let logic = ele.getComponent('lc_game_ele');
                    logic.init(cc.v2(x, y), i ,j);
                }
            }
        }
    },

    /**
     * 监听游戏背景消息
     * @private
     */
    _initListenGameAreaBgEvent () {
        this.m_gameAreaBg.on(tm.NodeEventType.TOUCH_START, function ( event ) {
            this._m_isTouchClick = true;
            this.onTouchStart(event);
        }, this);

        this.m_gameAreaBg.on(tm.NodeEventType.TOUCH_MOVE, function ( event ) {
            this.onTouchMove(event);
        }, this);

        this.m_gameAreaBg.on(tm.NodeEventType.TOUCH_END, function ( event ) {
            this.onTouchFinish();
        }, this);

        this.m_gameAreaBg.on(tm.NodeEventType.TOUCH_CANCEL, function ( event ) {
            this.onTouchFinish();
        }, this);
    },

    /**
     * 点击开始
     * @param event
     */
    onTouchStart: function (event) {
        if(this._m_isTouchClick) {
            let location = event.getLocation();
            let gameEle = this._isGameEleInTouch(location);

            if(gameEle) {
                let useTool = this.game.gameMgr.getUseHammerToolFunc();
                if(useTool) {
                    this._useHammerToolFunc(gameEle);
                } else {
                    this._changeCurrGameEle(gameEle);
                    this._changeHintLineColor(gameEle);
                }
            }
        }
    },

    /**
     * 使用锤子道具
     * @private
     */
    _useHammerToolFunc: function (cell) {
        if(cell) {
            this._m_selectGameEleList.push(cell);

            this._cleanSelectGameEleList(true);
            this._m_selectGameEleList.length = 0;

            this._cleanUpGameEleList();
            this._addGameEleIntoMap();
        }
    },

    /**
     *
     * @private
     */
    _cleanSelectGameEleList: function (isAddScore) {
        // 删除网格
        for (let i = 0; i < this._m_selectGameEleList.length; i++) {
            let gameEle = this._m_selectGameEleList[i];
            if(gameEle) {
                let logic = gameEle.getComponent('lc_game_ele');

                if (isAddScore) {
                    gameEle.removeFromParent(true);
                    logic.isDead(true);
                } else {
                    this._stopGameEleEffect(gameEle);
                }
            }
        }
    },

    /**
     *  显示格子的特效
     * @param cell
     * @private
     */
    _playGameEleEffect (ele) {
        let logic = ele.getComponent('lc_game_ele');
        if(logic) {
            logic.playEffect();
        }
    },


    /**
     * 停止格子的特效
     * @param cell
     * @private
     */
    _stopGameEleEffect : function (ele) {
        let logic = ele.getComponent('lc_game_ele');
        if(logic) {
            logic.stopEffect();
        }
    },

    /**
     * 隐藏指示线
     * @private
     */
    _hideHintLine () {
        this.m_hintLine.height = 0;
        this.m_hintLine.active = false;
    },

    /**
     * 清理游戏元素的队列
     * @private
     */
    _cleanUpGameEleList: function () {
        for(let i = 0; i < this._m_gameEleList.length; i++) {
            for(let j = 0; j < this._m_gameEleList[i].length; j++){

                let gameEle = this._m_gameEleList[i][j];
                let logic = gameEle.getComponent('lc_game_ele');
                let isDead = logic.getDead();

                if(isDead){
                    continue;
                }

                let dis = 0;
                let z = j-1;

                while(z >= 0){
                    let down = this._m_gameEleList[i][z];
                    let downLogic = down.getComponent('lc_game_ele');

                    if(downLogic.getDead()){
                        ++dis;
                    }

                    --z;
                }

                if(dis > 0){
                    logic.drop(0, j - dis, 0, dis * this._m_rawSize);
                    this._swapGameEle(cc.v2(i, j), cc.v2(i, j - dis));
                }

            }
        }
    },

    /**
     * 交换两个游戏元素
     * @param pos1
     * @param pos2
     * @private
     */
    _swapGameEle (pos1, pos2){
        let gameEle_1 = this._m_gameEleList[pos1.x][pos1.y];
        let gameEle_2 = this._m_gameEleList[pos2.x][pos2.y];

        if(gameEle_1 && gameEle_2) {
            this._m_gameEleList[pos1.x][pos1.y] = gameEle_2;
            this._m_gameEleList[pos2.x][pos2.y] = gameEle_1;
        }
    },

    /**
     * 向地图中加入到地图中
     * @private
     */
    _addGameEleIntoMap () {
        for(let i = 0; i < this._m_gameEleList.length; i++){
            for(let j = 0; j < this._m_gameEleList[i].length; j++){
                let gameEle = this._m_gameEleList[i][j];
                if(gameEle) {
                    let logic = gameEle.getComponent('lc_game_ele');
                    let dead = logic.getDead();

                    if (dead) {
                        this._m_gameEleList[i][j].removeFromParent(true);
                        this._m_gameEleList[i][j] = null;

                        //创建一个并飞到该地方
                        let x = this._startX + this._m_colSize / 2 + this._m_colSize * i;
                        let y = this._startY + this._m_rawSize * j
                        let gameEle = this._createGameEle(x, y, i, j);

                        this._m_gameEleList[i][j] = gameEle;
                    }
                }
            }
        }
    },

    /**
     * 隐藏道具找到的格子
     * @private
     */
    _hideFindGameEle () {
        let self = this;
        this._findGameEleList.forEach(function (item, index) {
            let logicX = item.logicX;
            let logicY = item.logicY;

            if(self._m_gameEleList[logicX] && self._m_gameEleList[logicX][logicY]) {
                let gameEle = self._m_gameEleList[logicX][logicY];
                if (gameEle) {
                    gameEle.opacity = 255;
                }
            }
        });

        this._findGameEleList.length = 0;
    },

    /**
     * 创建游戏元素
     * @param posx
     * @param posy
     * @param x
     * @param y
     * @returns {Node}
     * @private
     */
    _createGameEle: function (posx, posy, x, y) {
        let ele = cc.instantiate(this.m_gameElePre);
        let logic = ele.getComponent('lc_game_ele');

        this.m_gameMaskArea.addChild(ele);
        logic.init(cc.v2(posx, posy), x ,y);

        return ele;
    },

    /**
     * 点击移动
     * @param event
     */
    onTouchMove: function (event) {
        let location = event.getLocation();
        this._refreshHintLine(location);

        let gameEle = this._isGameEleInTouch(location);
        if(gameEle) {
            // 是否和队列中相同
            if(this._isSameGameEle(gameEle)) {
                return;
            }

            // 游戏元素是否可以移除
            if(this.isGameEleCanRemove(gameEle)){
                return;
            }

            if(this._m_currGameEle){
                this._setGameELeLineActive(this._m_currGameEle, gameEle, true);
                this._changeCurrGameEle(gameEle);
            }
        }
    },

    /**
     * 刷新指示线长度
     * @private
     */
    _refreshHintLine: function (location) {
        if(this.m_hintLine) {
            let start = cc.v2(this.m_hintLine.x, this.m_hintLine.y);
            let end = this.m_gameAreaBg.convertToNodeSpaceAR(location);
            let dis = end.sub(start).mag();

            // 向量差计算,结束点-开始点，向量的指向是朝着结束点
            let posSub = end.sub(start);

            //向量的角度计算，Math.atan2是获得弧度值，角度 = 弧度/PI*180
            let angle = Math.atan2(posSub.x, posSub.y) / Math.PI * 180;

            this.m_hintLine.rotation = angle;
            this.m_hintLine.height = dis;
        }
    },

    /**
     * 是否和已有列表中的最后一个是相同的
     * @param gameEle
     * @private
     */
    _isSameGameEle: function (gameEle) {
        if(this._m_selectGameEleList.find(function(value){
            return value === gameEle;
        })){
            if(this._m_selectGameEleList.length > 1) {
                let ele = this._m_selectGameEleList[this._m_selectGameEleList.length - 2];
                if(ele) {
                    if (this._checkIsSamePos(ele, gameEle)) {
                        this._popLastGameEle();
                    }
                }
            }

            return true;
        }

        return false;
    },

    /**
     * 这个游戏原始是否可以删掉
     */
    isGameEleCanRemove: function (gameEle){
        if(!this._m_currGameEle){
            cc.log("还没开始选择到格子");
            return false;
        }

        if(!gameEle.getComponent('lc_game_ele').checkSametype(this._m_currGameEle.getComponent('lc_game_ele').getType())){
            cc.log("选中的格子类型不同");
            return true;
        }

        if(!gameEle.getComponent('lc_game_ele').checkAreaIn(this._m_currGameEle)){
            cc.log("选中的格子不在上一个元素的周围");
            return true;
        }

        return false;
    },

    /**
     * 更换当前cell
     * @param cell
     * @private
     */
    _changeCurrGameEle (gameEle) {
        this._playGameEleEffect(gameEle);
        this._resetHintLineStartPos(gameEle);

        this._m_currGameEle = gameEle;


        this._m_selectGameEleList.push(gameEle);
    },

    /**
     * 切换画线颜色
     * @param cell
     * @private
     */
    _changeHintLineColor (gameEle) {
        let logic = gameEle.getComponent('lc_game_ele');
        let color = logic.getColorType();
        this.m_hintLine.color = cc.color(0, 0, 0).fromHEX(color);
    },

    /**
     * 检测是否在同一坐标下
     * @private
     */
    _checkIsSamePos: function (eleA, eleB) {
        let flag = false;
        if(eleA && eleB) {
            let logicA = eleA.getComponent('lc_game_ele');
            let logicX = logicA.getLogicX();
            let logicY = logicA.getLogicY();

            let logicB = eleB.getComponent('lc_game_ele');
            flag = logicB.checkSamePos(logicX, logicY);
        }

        return flag;
    },

    /**
     * 弹出最后一个游戏元素
     * @private
     */
    _popLastGameEle: function () {
        let gameEle = this._m_selectGameEleList.pop();
        if(gameEle) {
            this._stopGameEleEffect(gameEle);
        }

        let newEle = this._m_selectGameEleList[this._m_selectGameEleList.length - 1];
        if(newEle) {
            this._m_currGameEle = newEle;
            this._setGameELeLineActive(this._m_currGameEle, null, false);
            this._resetHintLineStartPos(this._m_currGameEle);
        }
    },

    /**
     * 设置游戏元素线的可见度
     * @private
     */
    _setGameELeLineActive: function (cEle, tEle, flag) {
        let logic = cEle.getComponent('lc_game_ele');
        let logicX = logic.getLogicX();
        let logicY = logic.getLogicY();

        if(this._m_eleLineList[logicX] &&  this._m_eleLineList[logicX][logicY]) {
            let line = this._m_eleLineList[logicX][logicY];
            if(line) {
                let lineLogic = line.getComponent('lc_game_line');
                if(flag) {
                    let rotation = logic.getShowDrawLineRotation(tEle);
                    let color = logic.getColorType();

                    lineLogic.showLine(rotation);
                    lineLogic.setLineColor(color);
                } else {
                    lineLogic.hideLine();
                }
            }
        }
    },

    /**
     * 重制画线提示坐标
     * @private
     */
    _resetHintLineStartPos: function (gameEle) {
        this.m_hintLine.x = gameEle.x;
        this.m_hintLine.y = gameEle.y;
        this.m_hintLine.height = 0;
        this.m_hintLine.active = true;
    },

    /**
     * 点击完成
     * @param event
     */
    onTouchFinish: function (event) {
        this._hideHintLine();
        this._hideAllGameEleHintLine();
        this._removeGameEleFunc();

        this._m_isTouchClick = false;
        this._m_currGameEle = null;
        this._m_selectGameEleList.length = 0;

        this._cleanUpGameEleList();
        this._addGameEleIntoMap();
        this._hideFindGameEle();
    },

    /**
     * 隐藏所有格子的画线
     * @private
     */
    _hideAllGameEleHintLine: function () {
        for(let i = 0; i < this._m_eleLineList.length; i++) {
            let col = this._m_eleLineList[i];

            for (let j = 0; j < col.length; j++) {
                let line = col[j];
                if(line) {
                    let logic = line.getComponent('lc_game_line');
                    logic.hideLine();
                }
            }
        }
    },

    /**
     * 当前点击是否在元素上
     * @private
     */
    _isGameEleInTouch (location) {
        let list = this._m_gameEleList;
        for (let i = 0; i < list.length; i++) {

            let col = list[i];
            for (let j = 0; j < col.length; j++) {
                let one = col[j];
                let pos = one.convertToNodeSpaceAR(location);
                if (pos.x > -one.width / 2 && pos.x < one.width / 2 && pos.y < one.height && pos.y > -one.height) {
                    return one;
                }
            }
        }

        return null;
    },

    /**
     * 移除选中网格
     * @private
     */
    _removeGameEleFunc: function () {
        let isRemove = this._m_selectGameEleList.length >= this.m_mix_line ? true : false;
        if(isRemove) {

            // 清理前记录当前数据
            this._addGameHistory();

            // 计算选择网格
            this._calculateSelectGameEle(isRemove);

            // 增加分数
            this._addGameEleScore();

            // 减少步数
            this._subStepCount();
        }
    },

    /**
     * 保存历史记录
     * @private
     */
    _addGameHistory: function () {
        this.game.gameMgr.saveHistory(this);
    },

    /**
     * 计算选择网格
     * @private
     */
    _calculateSelectGameEle: function (isRemove) {
        // 删除网格
        for (let i = 0; i < this._m_selectGameEleList.length; i++) {
            let gameEle = this._m_selectGameEleList[i];
            let logic = gameEle.getComponent('lc_game_ele');

            if(isRemove){
                gameEle.removeFromParent(true);
                logic.isDead(true);
            }else{
                this._stopGameEleEffect(gameEle);
            }
        }
    },

    /**
     * 计算游戏元素分数
     * @private
     */
    _addGameEleScore: function () {
        let score = 0;
        let type = null;

        this._m_selectGameEleList.forEach(function (oneEle, index) {
            if(oneEle) {
                let logic = oneEle.getComponent('lc_game_ele');

                type = logic.getType();
            }
        });

        if(type >= 0) {
            this.trigger(lc.Event.GameEvent.AddScore, {"type": type, "score": score});
        }
    },

    /**
     * 减少步数
     * @private
     */
    _subStepCount: function () {
        this.trigger(lc.Event.GameEvent.SubStepCount, {"count": 1});

    },


});
