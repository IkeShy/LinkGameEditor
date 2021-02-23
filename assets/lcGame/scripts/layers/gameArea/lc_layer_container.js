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
        containerPrefab: cc.Prefab,
    },

    onLoad () {
        this._super();
        this._initLine();
        this._initListen();
        this._lineList = [];
        this._containerList = [];
        this._startX = -this.containerNode.getContentSize().width / 2;
        this._startY = -(this.containerNode.getContentSize().height - 45) ;
        this._chanceLogic = this.node.getComponent('lc_logic_chance');

        this._parseInfo();
    },

    _initListen () {
        this.register(lc.Event.GameEvent.HideLastLine, this._onHideLastLine, this);
        this.register(lc.Event.GameEvent.CrashOtherContainer, this._onCrashOtherContainer, this);
    },

    _initLine () {
        let line = cc.instantiate(this.linePrefab);
        line.active = false;
        this.lineNode.addChild(line);
        this._line = line.getComponent('lc_game_line');
    },

    _parseInfo: function () {
        this._curLevelInfo = this.game.levelMgr.getLevelInfo();
        this._createContainer();

    },

    /**
     * 创建容器
     * @private
     */
    _createContainer () {
        for (let col = 0; col <  this._curLevelInfo.length; col++) {
            this._lineList[col] = [];
            this._containerList[col] = [];

            let oneCol = this._curLevelInfo[col];
            if(oneCol) {
                for (let raw = 0; raw < oneCol.length; raw ++) {
                    let info = oneCol[raw];
                    this._createOneContainer(col, raw, info);
                }
            }
        }
    },

    _createOneContainer (col, raw, info) {
        let oneWidth  = 81;
        let oneHeight = 81;

        let x = this._startX + oneWidth / 2 + oneWidth * col;
        let y = this._startY + oneHeight * raw;

        // 地图
        let cLogic = this._addOneContainerBackLogic();
        cLogic.setPos(cc.v2(x, y), col ,raw);
        cLogic.setContainer(info);

        // 线
        let cline = this._addOneLineBackLogic();
        cline.pos(x, y);
        cline.hide();

        this._lineList[col][raw] = cline;
        this._containerList[col][raw] = cLogic;
    },

    _addOneContainerBackLogic() {
        let container = cc.instantiate(this.containerPrefab);
        let mContainer = container.getComponent('lc_game_container');
        this.containerNode.addChild(container);
        return mContainer;
    },

    _addOneLineBackLogic () {
        let line = cc.instantiate(this.linePrefab);
        let mLine = line.getComponent('lc_game_line');
        this.lineNode.addChild(line);
        return mLine;
    },

    start () {
        this._initTouchEvent();
    },

    /**
     * 注册触摸事件
     * @private
     */
    _initTouchEvent () {
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

    _onTouchStart (event) {
        let location = event.getLocation();
        let ele = this._getEleInTouch(location);
        if(ele && ele.isCanChance()) {

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
    _showLineByEle (ele) {
        if(ele) {
            this._line.show();
            this._line.setHigh(0);
            this._line.pos(ele.node.x, ele.node.y) ;
        }
    },

    /**
     * 设置线的高度和旋转
     * @param ele
     * @private
     */
    _setLineHeightAndRotationByEle (location) {
        if(location) {
            let start = cc.v2(this._line.node.x, this._line.node.y);
            let end = this.containerNode.convertToNodeSpaceAR(location);
            let dis = end.sub(start).mag();

            //向量差计算,结束点-开始点，向量的指向是朝着结束点
            let posSub = end.sub(start);

            //向量的角度计算，Math.atan2是获得弧度值，角度 = 弧度/PI*180
            let angle = Math.atan2(posSub.x, posSub.y) / Math.PI * 180;

            this._line.setRotation(angle);
            this._line.setHigh(dis);
        }
    },

    /**
     * 隐藏线
     * @private
     */
    _hideLine () {
        this._line.hide();
        this._line.setHigh(0);
    },

    /**
     * 隐藏最后一个跳线
     * @private
     */
    _onHideLastLine () {
        let curEle = this._chanceLogic.getCurEle();
        if(curEle && this._lineList[curEle.logicX] &&
            this._lineList[curEle.logicX][curEle.logicY]) {
            let line = this._lineList[curEle.logicX][curEle.logicY];
            line.hide();
            this._showLineByEle(curEle);
        }
    },

    /**
     * 撞击其他容器
     * @private
     */
    _onCrashOtherContainer (info) {
        if(info && info.to && info.count >= 0) {
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

                case lc.GameEnum.CrashToType.Row:
                    this._crashToRow(info);
                    break;

                case lc.GameEnum.CrashToType.Col:
                    this._crashToCol(info);
                    break;

                case lc.GameEnum.CrashToType.Cross:
                    this._crashToCross(info);
                    break;

                case lc.GameEnum.CrashToType.X:
                    this._crashToX(info);
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
    _crashToLeft (info) {
        let logicX = info.x;
        let logicY = info.y;
        let count = info.count;
        for (let i = 1; i <= count; i++) {
            let crashX = logicX - i;
            if (this._containerList[crashX] && this._containerList[crashX][logicY]) {
                let container = this._containerList[crashX][logicY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },

    /**
     * 向右碰撞
     * @param info
     * @private
     */
    _crashToRight (info) {
        let logicX = info.x;
        let logicY = info.y;
        let count = info.count;
        for (let i = 1; i <= count; i++) {
            let crashX = logicX + i;
            if (this._containerList[crashX] && this._containerList[crashX][logicY]) {
                let container = this._containerList[crashX][logicY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },

    /**
     * 向上碰撞
     * @param info
     * @private
     */
    _crashToUp (info) {
        let logicX = info.x;
        let logicY = info.y;
        let count = info.count;
        for (let i = 1; i <= count; i++) {
            let crashY = logicY + i;
            if (this._containerList[logicX] && this._containerList[logicX][crashY]) {
                let container = this._containerList[logicX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },

    /**
     * 向下碰撞
     * @param info
     * @private
     */
    _crashToDown (info) {
        let logicX = info.x;
        let logicY = info.y;
        let count = info.count;
        for (let i = 1; i <= count; i++) {
            let crashY = logicY - i;
            if (this._containerList[logicX] && this._containerList[logicX][crashY]) {
                let container = this._containerList[logicX][crashY];
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
    _crashToLeftUpAndRightDown (info) {
        let logicX = info.x;
        let logicY = info.y;
        let count = info.count;

        // 先搜索左上
        for (let i = 1; i <= count; i++) {
            let crashX = logicX - i;
            let crashY = logicY + i;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                let container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }

        // 再搜索右下
        for (let i = 1; i <= count; i++) {
            let crashX = logicX + i;
            let crashY = logicY - i;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                let container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
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
    _crashToLeftDownAndRightUp (info) {
        let logicX = info.x;
        let logicY = info.y;
        let count = info.count;

        // 先搜索左下
        for (let i = 1; i <= count; i++) {
            let crashX = logicX - i;
            let crashY = logicY - i;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                let container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }

        // 再搜索右上
        for (let i = 1; i <= count; i++) {
            let crashX = logicX + i;
            let crashY = logicY + i;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                let container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },

    /**
     * 消灭一行
     * @param info
     * @private
     */
    _crashToRow (info) {
        let logicX = info.x;
        let logicY = info.y;
        let count = info.count;

        // 先搜索左
        for (let i = 1; i <= count; i++) {
            let crashX = logicX - i;
            let crashY = logicY;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                let container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }

        // 再搜索右
        for (let i = 1; i <= count; i++) {
            let crashX = logicX + i;
            let crashY = logicY;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                let container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },

    /**
     * 消灭一列
     * @param info
     * @private
     */
    _crashToCol (info) {
        let logicX = info.x;
        let logicY = info.y;
        let count = info.count;

        // 先搜索下
        for (let i = 1; i <= count; i++) {
            let crashX = logicX;
            let crashY = logicY - i;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                let container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }

        // 再搜索上
        for (let i = 1; i <= count; i++) {
            let crashX = logicX;
            let crashY = logicY + i;
            if (this._containerList[crashX] && this._containerList[crashX][crashY]) {
                let container = this._containerList[crashX][crashY];
                this._chanceLogic.addCrashedContainer(container);
            }
        }
    },


    /**
     * 消灭十字
     * @param info
     * @private
     */
    _crashToCross (info) {
        this._crashToCol(info);
        this._crashToRow(info);
    },

    /**
     * 消灭X字
     * @param info
     * @private
     */
    _crashToX (info) {
        this._crashToLeftUpAndRightDown(info);
        this._crashToLeftDownAndRightUp(info);
    },


    /**
     * 获取当前被点击的元素
     * @private
     */
    _getEleInTouch (location) {
        let list = this._containerList;
        for (let i = 0; i < list.length; i++) {
            let col = list[i];
            for (let j = 0; j < col.length; j++) {
                let one = col[j];
                if(one.isInTouch(location)) {
                    return one;
                }

            }
        }

        return null;
    },

    _onTouchMove (event) {
        let location = event.getLocation();
        this._setLineHeightAndRotationByEle(location);
        let ele = this._getEleInTouch(location);
        if(ele && ele.isCanChance()) {
            // 如果是同一个糖果
            if(this._chanceLogic.isSame(ele)) {
                return;
            }

            // 如果不是同一种类型
            if(!this._chanceLogic.isSameType(ele)) {
                return;
            }

            // 如果不再区域内
            if(!this._chanceLogic.checkIsInArea(ele)) {
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
    _showContainerLine (next) {
        let curEle = this._chanceLogic.getCurEle();
        if(curEle && this._lineList[curEle.logicX] &&
            this._lineList[curEle.logicX][curEle.logicY]) {
            let line = this._lineList[curEle.logicX][curEle.logicY];
            let rotation = curEle.getNextRotation(next);
            line.show();
            line.setRotation(rotation);
        }
    },

    _onTouchFinish () {
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
    _hideAllContainerLine () {
        let list = this._lineList;
        for (let i = 0; i < list.length; i++) {
            let col = list[i];
            for (let j = 0; j < col.length; j++) {
                let line = col[j];
                line.hide();
            }
        }
    },

    /**
     * 移除死亡的容器
     * @private
     */
    _removeDeadContainer () {
        let list = this._containerList;
        for (let i = 0; i < list.length; i++) {
            let col = list[i];
            for (let j = 0; j < col.length; j++) {
                let logic = col[j];
                let isDead = logic.isDead();

                if(isDead) {
                    continue;
                }

                let dis = 0;
                let z = j-1;
                while(z >= 0){
                    let down = col[z];
                    if(down.isDead()){
                        ++dis;
                    }

                    --z;
                }

                if(dis > 0){
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
    _swapTwoContainer (pos1, pos2){
        let c1 = this._containerList[pos1.x][pos1.y];
        let c2 = this._containerList[pos2.x][pos2.y];

        if(c1 && c2) {
            this._containerList[pos1.x][pos1.y] = c2;
            this._containerList[pos2.x][pos2.y] = c1;
        }
    },

    /**
     * 向地图中加入到地图中
     * @private
     */
    _addContainerInMap () {
        let list = this._containerList;
        for (let i = 0; i < list.length; i++) {
            let col = list[i];
            for (let j = 0; j < col.length; j++) {

                let logic = col[j];
                let isDead = logic.isDead();
                if(isDead) {
                    logic.destroy();
                    logic = null;

                    let info = this.game.levelMgr.getOneRandomSweetInfo();
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
    _changeCurEle (ele) {
        this._chanceLogic.changeCurEle(ele);
    },





});
