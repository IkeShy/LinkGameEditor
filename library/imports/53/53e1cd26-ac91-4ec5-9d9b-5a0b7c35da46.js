"use strict";
cc._RF.push(module, '53e1c0mrJFOxZ2bWgt8NdpG', 'lc_layer_container');
// lcGame/scripts/layers/gameArea/lc_layer_container.js

'use strict';

/**
 * 游戏元素 -- 游戏区域
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        _startX: 0, // 初始化x坐标
        _startY: 0, // 初始化y坐标

        // 容器的
        _curLevelInfo: null, // 当前地图数据
        _containerList: null,
        _chanceLogic: null, // 切换逻辑

        // 线的
        _lineList: null, // 线

        // creator
        lineNode: cc.Node,
        linePrefab: cc.Prefab,

        containerNode: cc.Node,
        containerPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        this._super();
        this._initLine();
        this._initListen();
        this._lineList = [];
        this._containerList = [];
        this._startX = -this.containerNode.getContentSize().width / 2;
        this._startY = -(this.containerNode.getContentSize().height - 45);
        this._chanceLogic = this.node.getComponent('lc_logic_chance');

        this._parseInfo();
    },
    _initListen: function _initListen() {
        this.register(lc.Event.GameEvent.HideLastLine, this._onHideLastLine, this);
        this.register(lc.Event.GameEvent.CrashOtherContainer, this._onCrashOtherContainer, this);
    },
    _initLine: function _initLine() {
        var line = cc.instantiate(this.linePrefab);
        line.active = false;
        this.lineNode.addChild(line);
        this._line = line.getComponent('lc_game_line');
    },


    _parseInfo: function _parseInfo() {
        this._curLevelInfo = this.game.levelMgr.getLevelInfo();
        this._createContainer();
    },

    /**
     * 创建容器
     * @private
     */
    _createContainer: function _createContainer() {
        for (var col = 0; col < this._curLevelInfo.length; col++) {
            this._lineList[col] = [];
            this._containerList[col] = [];

            var oneCol = this._curLevelInfo[col];
            if (oneCol) {
                for (var raw = 0; raw < oneCol.length; raw++) {
                    var info = oneCol[raw];
                    this._createOneContainer(col, raw, info);
                }
            }
        }
    },
    _createOneContainer: function _createOneContainer(col, raw, info) {
        var oneWidth = 81;
        var oneHeight = 81;

        var x = this._startX + oneWidth / 2 + oneWidth * col;
        var y = this._startY + oneHeight * raw;

        // 地图
        var cLogic = this._addOneContainerBackLogic();
        cLogic.setPos(cc.v2(x, y), col, raw);
        cLogic.setContainer(info);

        // 线
        var cline = this._addOneLineBackLogic();
        cline.pos(x, y);
        cline.hide();

        this._lineList[col][raw] = cline;
        this._containerList[col][raw] = cLogic;
    },
    _addOneContainerBackLogic: function _addOneContainerBackLogic() {
        var container = cc.instantiate(this.containerPrefab);
        var mContainer = container.getComponent('lc_game_container');
        this.containerNode.addChild(container);
        return mContainer;
    },
    _addOneLineBackLogic: function _addOneLineBackLogic() {
        var line = cc.instantiate(this.linePrefab);
        var mLine = line.getComponent('lc_game_line');
        this.lineNode.addChild(line);
        return mLine;
    },
    start: function start() {
        this._initTouchEvent();
    },


    /**
     * 注册触摸事件
     * @private
     */
    _initTouchEvent: function _initTouchEvent() {
        this.node.on(tm.NodeEventType.TOUCH_START, function (event) {
            this._onTouchStart(event);
        }, this);

        this.node.on(tm.NodeEventType.TOUCH_MOVE, function (event) {
            this._onTouchMove(event);
        }, this);

        this.node.on(tm.NodeEventType.TOUCH_END, function () {
            this._onTouchFinish();
        }, this);

        this.node.on(tm.NodeEventType.TOUCH_CANCEL, function () {
            this._onTouchFinish();
        }, this);
    },
    _onTouchStart: function _onTouchStart(event) {
        var location = event.getLocation();
        var ele = this._getEleInTouch(location);
        if (ele && ele.isCanChance()) {

            tm.LOGD("logicX", ele.logicX);
            tm.LOGD("logicY", ele.logicY);
            this._changeCurEle(ele);
            this._showLineByEle(ele);
        }
    },


    /**
     * 显示线
     * 设置初始坐标
     * 确定颜色
     * @param cell
     * @private
     */
    _showLineByEle: function _showLineByEle(ele) {
        if (ele) {
            this._line.show();
            this._line.setHigh(0);
            this._line.pos(ele.node.x, ele.node.y);
        }
    },


    /**
     * 设置线的高度和旋转
     * @param ele
     * @private
     */
    _setLineHeightAndRotationByEle: function _setLineHeightAndRotationByEle(location) {
        if (location) {
            var start = cc.v2(this._line.node.x, this._line.node.y);
            var end = this.containerNode.convertToNodeSpaceAR(location);
            var dis = end.sub(start).mag();

            //向量差计算,结束点-开始点，向量的指向是朝着结束点
            var posSub = end.sub(start);

            //向量的角度计算，Math.atan2是获得弧度值，角度 = 弧度/PI*180
            var angle = Math.atan2(posSub.x, posSub.y) / Math.PI * 180;

            this._line.setRotation(angle);
            this._line.setHigh(dis);
        }
    },


    /**
     * 隐藏线
     * @private
     */
    _hideLine: function _hideLine() {
        this._line.hide();
        this._line.setHigh(0);
    },


    /**
     * 隐藏最后一个跳线
     * @private
     */
    _onHideLastLine: function _onHideLastLine() {
        var curEle = this._chanceLogic.getCurEle();
        if (curEle && this._lineList[curEle.logicX] && this._lineList[curEle.logicX][curEle.logicY]) {
            var line = this._lineList[curEle.logicX][curEle.logicY];
            line.hide();
            this._showLineByEle(curEle);
        }
    },


    /**
     * 撞击其他容器
     * @private
     */
    _onCrashOtherContainer: function _onCrashOtherContainer(info) {
        if (info && info.to && info.count >= 0) {
            switch (info.to) {
                case lc.GameEnum.CrashToType.Left:
                    this._crashToLeft(info);
                    break;

                case lc.GameEnum.CrashToType.Right:
                    this._crashToRight(info);
                    break;

                case lc.GameEnum.CrashToType.Up:
                    this._crashToUp(info);
                    break;

                case lc.GameEnum.CrashToType.Down:
                    this._crashToDown(info);
                    break;

                case lc.GameEnum.CrashToType.LeftUpAndRightDown:
                    this._crashToLeftUpAndRightDown(info);
                    break;

                case lc.GameEnum.CrashToType.LeftDownAndRightUp:
                    this._crashToLeftDownAndRightUp(info);
                    break;
            }

            this._chanceLogic.onCrashedContainer();
        }
    },


    /**
     * 向左碰撞
     * @param info
     * @private
     */
    _crashToLeft: function _crashToLeft(info) {
        var logicX = info.x;
        var logicY = info.y;
        var count = info.count;
        for (var i = 1; i <= count; i++) {
            var crashX = logicX - i;
            if (this._containerList[crashX] && this._containerList[crashX][logicY]) {
                var container = this._containerList[crashX][logicY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },


    /**
     * 向右碰撞
     * @param info
     * @private
     */
    _crashToRight: function _crashToRight(info) {
        var logicX = info.x;
        var logicY = info.y;
        var count = info.count;
        for (var i = 1; i <= count; i++) {
            var crashX = logicX + i;
            if (this._containerList[crashX] && this._containerList[crashX][logicY]) {
                var container = this._containerList[crashX][logicY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },


    /**
     * 向上碰撞
     * @param info
     * @private
     */
    _crashToUp: function _crashToUp(info) {
        var logicX = info.x;
        var logicY = info.y;
        var count = info.count;
        for (var i = 1; i <= count; i++) {
            var crashY = logicY + i;
            if (this._containerList[logicX] && this._containerList[logicX][crashY]) {
                var container = this._containerList[logicX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },


    /**
     * 向下碰撞
     * @param info
     * @private
     */
    _crashToDown: function _crashToDown(info) {
        var logicX = info.x;
        var logicY = info.y;
        var count = info.count;
        for (var i = 1; i <= count; i++) {
            var crashY = logicY - i;
            if (this._containerList[logicX] && this._containerList[logicX][crashY]) {
                var container = this._containerList[logicX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },


    /**
     * 左上右下
     *   *
     *     *
     *       *
     *         *
     *
     * @param info
     * @private
     */
    _crashToLeftUpAndRightDown: function _crashToLeftUpAndRightDown(info) {
        var logicX = info.x;
        var logicY = info.y;
        var count = info.count;

        // 先搜索左上
        for (var i = 1; i <= count; i++) {
            var crashX = logicX - i;
            var crashY = logicY + i;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                var container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }

        // 再搜索右下
        for (var _i = 1; _i <= count; _i++) {
            var _crashX = logicX + _i;
            var _crashY = logicY - _i;
            if (this._containerList[_crashX] && this._containerList[_crashX][_crashY]) {
                var _container = this._containerList[_crashX][_crashY];
                this._chanceLogic.addCrashedContainer(_container);
            }
        }
    },


    /**
     * 左下右上
     *         *
     *       *
     *     *
     *   *
     *
     * @param info
     * @private
     */
    _crashToLeftDownAndRightUp: function _crashToLeftDownAndRightUp(info) {
        var logicX = info.x;
        var logicY = info.y;
        var count = info.count;

        // 先搜索左下
        for (var i = 1; i <= count; i++) {
            var crashX = logicX - i;
            var crashY = logicY - i;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                var container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }

        // 再搜索右上
        for (var _i2 = 1; _i2 <= count; _i2++) {
            var _crashX2 = logicX + _i2;
            var _crashY2 = logicY + _i2;
            if (this._containerList[_crashX2] && this._containerList[_crashX2][_crashY2]) {
                var _container2 = this._containerList[_crashX2][_crashY2];
                this._chanceLogic.addCrashedContainer(_container2);
            }
        }
    },


    /**
     * 获取当前被点击的元素
     * @private
     */
    _getEleInTouch: function _getEleInTouch(location) {
        var list = this._containerList;
        for (var i = 0; i < list.length; i++) {
            var col = list[i];
            for (var j = 0; j < col.length; j++) {
                var one = col[j];
                if (one.isInTouch(location)) {
                    return one;
                }
            }
        }

        return null;
    },
    _onTouchMove: function _onTouchMove(event) {
        var location = event.getLocation();
        this._setLineHeightAndRotationByEle(location);
        var ele = this._getEleInTouch(location);
        if (ele && ele.isCanChance()) {
            // 如果是同一个糖果
            if (this._chanceLogic.isSame(ele)) {
                return;
            }

            // 如果不是同一种类型
            if (!this._chanceLogic.isSameType(ele)) {
                return;
            }

            // 如果不再区域内
            if (!this._chanceLogic.checkIsInArea(ele)) {
                return;
            }

            this._showContainerLine(ele);
            this._chanceLogic.changeCurEle(ele);
            this._showLineByEle(ele);
        }
    },


    /**
     * 显示容器的线
     * @private
     */
    _showContainerLine: function _showContainerLine(next) {
        var curEle = this._chanceLogic.getCurEle();
        if (curEle && this._lineList[curEle.logicX] && this._lineList[curEle.logicX][curEle.logicY]) {
            var line = this._lineList[curEle.logicX][curEle.logicY];
            var rotation = curEle.getNextRotation(next);
            line.show();
            line.setRotation(rotation);
        }
    },
    _onTouchFinish: function _onTouchFinish() {
        this._hideLine();
        this._hideAllContainerLine();
        this._chanceLogic.removeSelectList();
        this._removeDeadContainer();
        this._addContainerInMap();
    },


    /**
     * 隐藏所有线
     * @private
     */
    _hideAllContainerLine: function _hideAllContainerLine() {
        var list = this._lineList;
        for (var i = 0; i < list.length; i++) {
            var col = list[i];
            for (var j = 0; j < col.length; j++) {
                var line = col[j];
                line.hide();
            }
        }
    },


    /**
     * 移除死亡的容器
     * @private
     */
    _removeDeadContainer: function _removeDeadContainer() {
        var list = this._containerList;
        for (var i = 0; i < list.length; i++) {
            var col = list[i];
            for (var j = 0; j < col.length; j++) {
                var logic = col[j];
                var isDead = logic.isDead();

                if (isDead) {
                    continue;
                }

                var dis = 0;
                var z = j - 1;
                while (z >= 0) {
                    var down = col[z];
                    if (down.isDead()) {
                        ++dis;
                    }

                    --z;
                }

                if (dis > 0) {
                    logic.dropTo(j - dis, 0, dis * 81);
                    this._swapTwoContainer(cc.v2(i, j), cc.v2(i, j - dis));
                }
            }
        }
    },


    /**
     * 交换两个游戏的容器坐标
     * @param pos1
     * @param pos2
     * @private
     */
    _swapTwoContainer: function _swapTwoContainer(pos1, pos2) {
        var c1 = this._containerList[pos1.x][pos1.y];
        var c2 = this._containerList[pos2.x][pos2.y];

        if (c1 && c2) {
            this._containerList[pos1.x][pos1.y] = c2;
            this._containerList[pos2.x][pos2.y] = c1;
        }
    },


    /**
     * 向地图中加入到地图中
     * @private
     */
    _addContainerInMap: function _addContainerInMap() {
        var list = this._containerList;
        for (var i = 0; i < list.length; i++) {
            var col = list[i];
            for (var j = 0; j < col.length; j++) {

                var logic = col[j];
                var isDead = logic.isDead();
                if (isDead) {
                    logic.destroy();
                    logic = null;

                    var info = this.game.levelMgr.getOneRandomSweetInfo();
                    this._createOneContainer(i, j, info);
                }
            }
        }
    },


    /**
     * 更换当前cell
     * @param cell
     * @private
     */
    _changeCurEle: function _changeCurEle(ele) {
        this._chanceLogic.changeCurEle(ele);
    }
});

cc._RF.pop();