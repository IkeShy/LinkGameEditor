"use strict";
cc._RF.push(module, 'b4c3d4S5aBLpa46Q9+K4vwv', 'lc_layer_game_area_copy');
// lcGame/scripts/layers/gameArea/lc_layer_game_area_copy.js

'use strict';

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


        m_gameLineNode: cc.Node, // 划线用的节点
        m_gameAreaBg: cc.Node, // 游戏区域背景
        m_gameMaskArea: cc.Node // 游戏元素存放区域，用于遮罩
    },

    onLoad: function onLoad() {
        this._super();

        this._startX = -this.m_gameAreaBg.getContentSize().width / 2;
        this._startY = -(this.m_gameAreaBg.getContentSize().height - 45);

        //this._initEleLineList();
        //this._initGameEleList();
        //this._initListenGameAreaBgEvent();
    },
    start: function start() {
        //this._createEleLineList();
        //this._createGameEleList();
    },


    /**
     * 初始化元素线list
     * @private
     */
    _initEleLineList: function _initEleLineList() {
        this._m_eleLineList = [];

        for (var x = 0; x < this.m_col; x++) {
            this._m_eleLineList[x] = new Array();

            for (var y = 0; y < this.m_raw; y++) {
                var line = cc.instantiate(this.m_eleLinePre);
                this._m_eleLineList[x][y] = line;
                this.m_gameLineNode.addChild(line);
            }
        }
    },

    /**
     * 创建元素线
     * @private
     */
    _createEleLineList: function _createEleLineList() {
        var size = this.m_gameAreaBg.getContentSize();
        var oneCol = size.width / this.m_col;
        var oneRaw = size.height / this.m_raw;

        for (var i = 0; i < this.m_col; i++) {
            for (var j = 0; j < this.m_raw; j++) {

                var x = this._startX + oneCol / 2 + oneCol * i;
                var y = this._startY + oneRaw * j;
                if (this._m_eleLineList[i] && this._m_eleLineList[i][j]) {
                    var line = this._m_eleLineList[i][j];
                    var logic = line.getComponent('lc_game_line');
                    logic.init(x, y);
                }
            }
        }
    },

    /**
     * 初始化元素list
     * @private
     */
    _initGameEleList: function _initGameEleList() {
        this._m_gameEleList = [];

        for (var x = 0; x < this.m_col; x++) {
            this._m_gameEleList[x] = new Array();

            for (var y = 0; y < this.m_raw; y++) {
                var ele = cc.instantiate(this.m_gameElePre);
                this.m_gameMaskArea.addChild(ele);
                this._m_gameEleList[x][y] = ele;
            }
        }
    },

    /**
     * 创建游戏元素
     * @private
     */
    _createGameEleList: function _createGameEleList() {
        var size = this.m_gameAreaBg.getContentSize();
        this._m_colSize = size.width / this.m_col;
        this._m_rawSize = size.height / this.m_raw;

        for (var i = 0; i < this.m_col; i++) {
            for (var j = 0; j < this.m_raw; j++) {
                var x = this._startX + this._m_colSize / 2 + this._m_colSize * i;
                var y = this._startY + this._m_rawSize * j;

                if (this._m_gameEleList[i] && this._m_gameEleList[i][j]) {
                    var ele = this._m_gameEleList[i][j];
                    var logic = ele.getComponent('lc_game_ele');
                    logic.init(cc.v2(x, y), i, j);
                }
            }
        }
    },

    /**
     * 监听游戏背景消息
     * @private
     */
    _initListenGameAreaBgEvent: function _initListenGameAreaBgEvent() {
        this.m_gameAreaBg.on(tm.NodeEventType.TOUCH_START, function (event) {
            this._m_isTouchClick = true;
            this.onTouchStart(event);
        }, this);

        this.m_gameAreaBg.on(tm.NodeEventType.TOUCH_MOVE, function (event) {
            this.onTouchMove(event);
        }, this);

        this.m_gameAreaBg.on(tm.NodeEventType.TOUCH_END, function (event) {
            this.onTouchFinish();
        }, this);

        this.m_gameAreaBg.on(tm.NodeEventType.TOUCH_CANCEL, function (event) {
            this.onTouchFinish();
        }, this);
    },


    /**
     * 点击开始
     * @param event
     */
    onTouchStart: function onTouchStart(event) {
        if (this._m_isTouchClick) {
            var location = event.getLocation();
            var gameEle = this._isGameEleInTouch(location);

            if (gameEle) {
                var useTool = this.game.gameMgr.getUseHammerToolFunc();
                if (useTool) {
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
    _useHammerToolFunc: function _useHammerToolFunc(cell) {
        if (cell) {
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
    _cleanSelectGameEleList: function _cleanSelectGameEleList(isAddScore) {
        // 删除网格
        for (var i = 0; i < this._m_selectGameEleList.length; i++) {
            var gameEle = this._m_selectGameEleList[i];
            if (gameEle) {
                var logic = gameEle.getComponent('lc_game_ele');

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
    _playGameEleEffect: function _playGameEleEffect(ele) {
        var logic = ele.getComponent('lc_game_ele');
        if (logic) {
            logic.playEffect();
        }
    },


    /**
     * 停止格子的特效
     * @param cell
     * @private
     */
    _stopGameEleEffect: function _stopGameEleEffect(ele) {
        var logic = ele.getComponent('lc_game_ele');
        if (logic) {
            logic.stopEffect();
        }
    },

    /**
     * 隐藏指示线
     * @private
     */
    _hideHintLine: function _hideHintLine() {
        this.m_hintLine.height = 0;
        this.m_hintLine.active = false;
    },


    /**
     * 清理游戏元素的队列
     * @private
     */
    _cleanUpGameEleList: function _cleanUpGameEleList() {
        for (var i = 0; i < this._m_gameEleList.length; i++) {
            for (var j = 0; j < this._m_gameEleList[i].length; j++) {

                var gameEle = this._m_gameEleList[i][j];
                var logic = gameEle.getComponent('lc_game_ele');
                var isDead = logic.getDead();

                if (isDead) {
                    continue;
                }

                var dis = 0;
                var z = j - 1;

                while (z >= 0) {
                    var down = this._m_gameEleList[i][z];
                    var downLogic = down.getComponent('lc_game_ele');

                    if (downLogic.getDead()) {
                        ++dis;
                    }

                    --z;
                }

                if (dis > 0) {
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
    _swapGameEle: function _swapGameEle(pos1, pos2) {
        var gameEle_1 = this._m_gameEleList[pos1.x][pos1.y];
        var gameEle_2 = this._m_gameEleList[pos2.x][pos2.y];

        if (gameEle_1 && gameEle_2) {
            this._m_gameEleList[pos1.x][pos1.y] = gameEle_2;
            this._m_gameEleList[pos2.x][pos2.y] = gameEle_1;
        }
    },


    /**
     * 向地图中加入到地图中
     * @private
     */
    _addGameEleIntoMap: function _addGameEleIntoMap() {
        for (var i = 0; i < this._m_gameEleList.length; i++) {
            for (var j = 0; j < this._m_gameEleList[i].length; j++) {
                var gameEle = this._m_gameEleList[i][j];
                if (gameEle) {
                    var logic = gameEle.getComponent('lc_game_ele');
                    var dead = logic.getDead();

                    if (dead) {
                        this._m_gameEleList[i][j].removeFromParent(true);
                        this._m_gameEleList[i][j] = null;

                        //创建一个并飞到该地方
                        var x = this._startX + this._m_colSize / 2 + this._m_colSize * i;
                        var y = this._startY + this._m_rawSize * j;
                        var _gameEle = this._createGameEle(x, y, i, j);

                        this._m_gameEleList[i][j] = _gameEle;
                    }
                }
            }
        }
    },


    /**
     * 隐藏道具找到的格子
     * @private
     */
    _hideFindGameEle: function _hideFindGameEle() {
        var self = this;
        this._findGameEleList.forEach(function (item, index) {
            var logicX = item.logicX;
            var logicY = item.logicY;

            if (self._m_gameEleList[logicX] && self._m_gameEleList[logicX][logicY]) {
                var gameEle = self._m_gameEleList[logicX][logicY];
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
    _createGameEle: function _createGameEle(posx, posy, x, y) {
        var ele = cc.instantiate(this.m_gameElePre);
        var logic = ele.getComponent('lc_game_ele');

        this.m_gameMaskArea.addChild(ele);
        logic.init(cc.v2(posx, posy), x, y);

        return ele;
    },

    /**
     * 点击移动
     * @param event
     */
    onTouchMove: function onTouchMove(event) {
        var location = event.getLocation();
        this._refreshHintLine(location);

        var gameEle = this._isGameEleInTouch(location);
        if (gameEle) {
            // 是否和队列中相同
            if (this._isSameGameEle(gameEle)) {
                return;
            }

            // 游戏元素是否可以移除
            if (this.isGameEleCanRemove(gameEle)) {
                return;
            }

            if (this._m_currGameEle) {
                this._setGameELeLineActive(this._m_currGameEle, gameEle, true);
                this._changeCurrGameEle(gameEle);
            }
        }
    },

    /**
     * 刷新指示线长度
     * @private
     */
    _refreshHintLine: function _refreshHintLine(location) {
        if (this.m_hintLine) {
            var start = cc.v2(this.m_hintLine.x, this.m_hintLine.y);
            var end = this.m_gameAreaBg.convertToNodeSpaceAR(location);
            var dis = end.sub(start).mag();

            // 向量差计算,结束点-开始点，向量的指向是朝着结束点
            var posSub = end.sub(start);

            //向量的角度计算，Math.atan2是获得弧度值，角度 = 弧度/PI*180
            var angle = Math.atan2(posSub.x, posSub.y) / Math.PI * 180;

            this.m_hintLine.rotation = angle;
            this.m_hintLine.height = dis;
        }
    },

    /**
     * 是否和已有列表中的最后一个是相同的
     * @param gameEle
     * @private
     */
    _isSameGameEle: function _isSameGameEle(gameEle) {
        if (this._m_selectGameEleList.find(function (value) {
            return value === gameEle;
        })) {
            if (this._m_selectGameEleList.length > 1) {
                var ele = this._m_selectGameEleList[this._m_selectGameEleList.length - 2];
                if (ele) {
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
    isGameEleCanRemove: function isGameEleCanRemove(gameEle) {
        if (!this._m_currGameEle) {
            cc.log("还没开始选择到格子");
            return false;
        }

        if (!gameEle.getComponent('lc_game_ele').checkSametype(this._m_currGameEle.getComponent('lc_game_ele').getType())) {
            cc.log("选中的格子类型不同");
            return true;
        }

        if (!gameEle.getComponent('lc_game_ele').checkAreaIn(this._m_currGameEle)) {
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
    _changeCurrGameEle: function _changeCurrGameEle(gameEle) {
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
    _changeHintLineColor: function _changeHintLineColor(gameEle) {
        var logic = gameEle.getComponent('lc_game_ele');
        var color = logic.getColorType();
        this.m_hintLine.color = cc.color(0, 0, 0).fromHEX(color);
    },


    /**
     * 检测是否在同一坐标下
     * @private
     */
    _checkIsSamePos: function _checkIsSamePos(eleA, eleB) {
        var flag = false;
        if (eleA && eleB) {
            var logicA = eleA.getComponent('lc_game_ele');
            var logicX = logicA.getLogicX();
            var logicY = logicA.getLogicY();

            var logicB = eleB.getComponent('lc_game_ele');
            flag = logicB.checkSamePos(logicX, logicY);
        }

        return flag;
    },

    /**
     * 弹出最后一个游戏元素
     * @private
     */
    _popLastGameEle: function _popLastGameEle() {
        var gameEle = this._m_selectGameEleList.pop();
        if (gameEle) {
            this._stopGameEleEffect(gameEle);
        }

        var newEle = this._m_selectGameEleList[this._m_selectGameEleList.length - 1];
        if (newEle) {
            this._m_currGameEle = newEle;
            this._setGameELeLineActive(this._m_currGameEle, null, false);
            this._resetHintLineStartPos(this._m_currGameEle);
        }
    },

    /**
     * 设置游戏元素线的可见度
     * @private
     */
    _setGameELeLineActive: function _setGameELeLineActive(cEle, tEle, flag) {
        var logic = cEle.getComponent('lc_game_ele');
        var logicX = logic.getLogicX();
        var logicY = logic.getLogicY();

        if (this._m_eleLineList[logicX] && this._m_eleLineList[logicX][logicY]) {
            var line = this._m_eleLineList[logicX][logicY];
            if (line) {
                var lineLogic = line.getComponent('lc_game_line');
                if (flag) {
                    var rotation = logic.getShowDrawLineRotation(tEle);
                    var color = logic.getColorType();

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
    _resetHintLineStartPos: function _resetHintLineStartPos(gameEle) {
        this.m_hintLine.x = gameEle.x;
        this.m_hintLine.y = gameEle.y;
        this.m_hintLine.height = 0;
        this.m_hintLine.active = true;
    },

    /**
     * 点击完成
     * @param event
     */
    onTouchFinish: function onTouchFinish(event) {
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
    _hideAllGameEleHintLine: function _hideAllGameEleHintLine() {
        for (var i = 0; i < this._m_eleLineList.length; i++) {
            var col = this._m_eleLineList[i];

            for (var j = 0; j < col.length; j++) {
                var line = col[j];
                if (line) {
                    var logic = line.getComponent('lc_game_line');
                    logic.hideLine();
                }
            }
        }
    },

    /**
     * 当前点击是否在元素上
     * @private
     */
    _isGameEleInTouch: function _isGameEleInTouch(location) {
        var list = this._m_gameEleList;
        for (var i = 0; i < list.length; i++) {

            var col = list[i];
            for (var j = 0; j < col.length; j++) {
                var one = col[j];
                var pos = one.convertToNodeSpaceAR(location);
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
    _removeGameEleFunc: function _removeGameEleFunc() {
        var isRemove = this._m_selectGameEleList.length >= this.m_mix_line ? true : false;
        if (isRemove) {

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
    _addGameHistory: function _addGameHistory() {
        this.game.gameMgr.saveHistory(this);
    },

    /**
     * 计算选择网格
     * @private
     */
    _calculateSelectGameEle: function _calculateSelectGameEle(isRemove) {
        // 删除网格
        for (var i = 0; i < this._m_selectGameEleList.length; i++) {
            var gameEle = this._m_selectGameEleList[i];
            var logic = gameEle.getComponent('lc_game_ele');

            if (isRemove) {
                gameEle.removeFromParent(true);
                logic.isDead(true);
            } else {
                this._stopGameEleEffect(gameEle);
            }
        }
    },

    /**
     * 计算游戏元素分数
     * @private
     */
    _addGameEleScore: function _addGameEleScore() {
        var score = 0;
        var type = null;

        this._m_selectGameEleList.forEach(function (oneEle, index) {
            if (oneEle) {
                var logic = oneEle.getComponent('lc_game_ele');

                type = logic.getType();
            }
        });

        if (type >= 0) {
            this.trigger(lc.Event.GameEvent.AddScore, { "type": type, "score": score });
        }
    },

    /**
     * 减少步数
     * @private
     */
    _subStepCount: function _subStepCount() {
        this.trigger(lc.Event.GameEvent.SubStepCount, { "count": 1 });
    }

});

cc._RF.pop();