/**
 * 内容：游戏管理器
 * @type {*|{}}
 */
window.lc = window.lc || {};

lc.GameMgr = cc.Class({

    extends:cc.Component,

    properties : {
        _addStepCount: 3, // 道具增加步数数量

        _m_stepCount: 0, // 步数
        _m_isUseHammer: false, // 是否使用锤子

        _m_gameInfo: null, // 游戏数据
    },

    init : function () {
        this._m_gameInfo = {
            "gameEleList": [],
            "score": {}
        };

        this._registerEventListen();
        this._initVariable();
        this._initStepCount();
        this.resetAllScore();
    },

    /**
     * 释放函数
     */
    onDestroy : function () {
        tm.notifierCenter.ignoreScope(this);

        if(lc.game) {
            lc.game.ignoreScope(this);
        }
    },

    /**
     * 注册消息
     * @private
     */
    _registerEventListen () {
        lc.game.register(lc.Event.GameEvent.AddScore, this._addScoreEventFunc, this);
        lc.game.register(lc.Event.GameEvent.SubStepCount, this._subStepCountFunc, this);
        lc.game.register(lc.Event.PropEvent.UseHammer, this.onUseHammerFunc, this);

        //util.eventCenter.register(util.define.GameEvent.AddStepCount, this._addStepCountFunc, this);
        //util.eventCenter.register(util.define.GameEvent.LoadHistory, this._loadHisrotyFunc, this);
    },

    /**
     * 使用锤子
     */
    onUseHammerFunc (info) {
        this.setUseHammerToolFunc(info.use);
    },

    /**
     * 加分
     * @param data
     * @private
     */
    _addScoreEventFunc (data) {
        let type = data.type;
        let score = data.score;

        switch (type) {
            case 0:
                this.addGreenScore(score);
                break;

            case 1:
                this.addYellowScore(score);
                break;

            case 2:
                this.addBlueScore(score);
                break;

            case 3:
                this.addRedScore(score);
                break;
        }
    },

    /**
     * 初始化变量
     * @private
     */
    _initVariable : function () {
        this.setUseHammerToolFunc(false);
    },

    /**
     * 初始化步数
     * @private
     */
    _initStepCount : function () {
        this._m_stepCount = 20;
    },

    /**
     * 获取步数
     * @returns {number|*}
     */
    getStepCount : function () {
        return this._m_stepCount;
    },

    /**
     * 增加步数
     * @param data
     * @private
     */
    _addStepCountFunc: function (data) {
        let count = data.count;
        if(count > 0) {
            this._m_stepCount += count;
            lc.game.trigger(lc.Event.GameEvent.RefreshStep, {"step": this._m_stepCount});
        }
    },

    /**
     * 减少步数
     * @private
     */
    _subStepCountFunc: function (data) {
        let count = data.count;
        if(count > 0) {
            this._m_stepCount -= count;
            lc.game.trigger(lc.Event.GameEvent.RefreshStep, {"step": this._m_stepCount});

            if(this._m_stepCount <= 0) {
                // 游戏结束
            }
        }
    },

    /**
     * 重置分数
     */
    resetAllScore : function () {
        this._initCurrScore();
        this._initAchieveScore();
    },

    /**
     * 初始化当前分数
     * @private
     */
    _initCurrScore : function () {
        this.allScore = 0;
        this.greenScore = 0;
        this.yellowScore = 0;
        this.blueScore = 0;
        this.redScore = 0;
    },

    _initAchieveScore : function () {
        this.achieveGreen = 1000;
        this.achieveYellow = 1000;
        this.achieveBlue = 2000;
        this.achieveRed = 4000;
    },

    /**
     * 增加绿色分数
     */
    addGreenScore : function (score) {
        this.greenScore += score;
        this._addAllScore(score);
        this._refreshAchieveGreenScore();
    },

    /**
     * 刷新绿色目标分数
     * @private
     */
    _refreshAchieveGreenScore : function () {
        this.achieveGreen = (this.achieveGreen - this.greenScore) < 0 ? 0 : (this.achieveGreen - this.greenScore);
        lc.game.trigger(lc.Event.GameEvent.RefreshAchieveScore, {"type": "green", "score": this.achieveGreen});
    },

    /**
     * 增加黄色分数
     */
    addYellowScore : function (score) {
        this.yellowScore += score;
        this._addAllScore(score);
        this._refreshAchieveYellowScore();
    },

    /**
     * 刷新黄色目标分数
     * @private
     */
    _refreshAchieveYellowScore : function () {
        this.achieveYellow = (this.achieveYellow - this.yellowScore) < 0 ? 0 : (this.achieveYellow - this.yellowScore);
        lc.game.trigger(lc.Event.GameEvent.RefreshAchieveScore, {"type": "yellow", "score": this.achieveYellow});
    },

    /**
     * 增加蓝色分数
     */
    addBlueScore : function (score) {
        this.blueScore += score;
        this._addAllScore(score);
        this._refreshAchieveBlueScore();
    },

    /**
     * 刷新黄色目标分数
     * @private
     */
    _refreshAchieveBlueScore : function () {
        this.achieveBlue = (this.achieveBlue - this.blueScore) < 0 ? 0 : (this.achieveBlue - this.blueScore);
        lc.game.trigger(lc.Event.GameEvent.RefreshAchieveScore, {"type": "blue", "score": this.achieveBlue});
    },

    /**
     * 增加红色分数
     */
    addRedScore : function (score) {
        this.redScore += score;
        this._addAllScore(score);
        this._refreshAchieveRedScore();
    },

    /**
     * 刷新黄色目标分数
     * @private
     */
    _refreshAchieveRedScore : function () {
        this.achieveRed = (this.achieveRed - this.redScore) < 0 ? 0 : (this.achieveRed - this.redScore);
        lc.game.trigger(lc.Event.GameEvent.RefreshAchieveScore, {"type": "red", "score": this.achieveRed});
    },

    /**
     * 增加全部分数
     * @param score
     * @private
     */
    _addAllScore : function (score) {
        this.allScore += score;
        lc.game.trigger(lc.Event.GameEvent.RefreshAllScore, {"score": this.allScore});
    },

    /**
     * 目标绿色
     */
    getAchieveGreen: function () {
        return this.achieveGreen;
    },

    /**
     * 目标黄色
     */
    getAchieveYellow: function () {
        return this.achieveYellow;
    },

    /**
     * 目标蓝色
     */
    getAchieveBlue: function () {
        return this.achieveBlue;
    },

    /**
     * 目标红色
     */
    getAchieveRed: function () {
        return this.achieveRed;
    },


    /**
     * 获取历史记录
     */
    getScoreHistory: function () {
        let obj = {
            "allScore": this.allScore,
            "greenScore": this.greenScore,
            "yellowScore": this.yellowScore,
            "blueScore": this.blueScore,
            "redScore": this.redScore,
            "achieveGreen": this.achieveGreen,
            "achieveYellow": this.achieveYellow,
            "achieveBlue": this.achieveBlue,
            "achieveRed": this.achieveRed,
        };

        return obj;
    },

    /**
     * 读取历史记录
     */
    _loadHisrotyFunc: function (data) {
        let history = data.history;
        if(history && history.score) {
            let info = history.score;
            if(info){
                this.allScore = info.allScore;
                this.greenScore = info.greenScore;
                this.yellowScore = info.yellowScore;
                this.blueScore = info.blueScore;
                this.redScore = info.redScore;

                this.achieveGreen = info.achieveGreen;
                this.achieveYellow = info.achieveYellow;
                this.achieveBlue = info.achieveBlue;
                this.achieveRed = info.achieveRed;

                lc.game.trigger(lc.Event.GameEvent.RefreshAchieveScore, {"type": "green", "score": this.achieveGreen});
                lc.game.trigger(lc.Event.GameEvent.RefreshAchieveScore, {"type": "yellow", "score": this.achieveYellow});
                lc.game.trigger(lc.Event.GameEvent.RefreshAchieveScore, {"type": "blue", "score": this.achieveBlue});
                lc.game.trigger(lc.Event.GameEvent.RefreshAchieveScore, {"type": "red", "score": this.achieveRed});
                lc.game.trigger(lc.Event.GameEvent.RefreshAllScore, {"score": this.allScore});
            }
        }
    },

    /*---------------道具使用-----------------*/
    /**
     * 设置是否用锤子
     */
    setUseHammerToolFunc: function (flag) {
        this._m_isUseHammer = flag;
    },

    /**
     * 获取是否锤子
     * @returns {boolean|*}
     */
    getUseHammerToolFunc: function () {
        let flag = this._m_isUseHammer;
        this._m_isUseHammer = false;

        return flag;
    },

    /**
     * 使用增加步数
     */
    onAddStepToolFunc: function () {
        lc.game.trigger(lc.Event.GameEvent.AddStepCount, {"count": this._addStepCount});
    },

    /**
     * 保存历史记录
     * @param scene
     */
    saveHistory: function (scene) {
        if(scene) {
            this._saveGameEleList(scene);
            this._saveScore();
        }
    },

    /**
     * 保存游戏元素列表
     * @private
     */
    _saveGameEleList: function (scene) {
        let gameEleList = this._m_gameInfo.gameEleList;
        gameEleList.length = 0;

        let gameEle = scene._m_gameEleList;
        if(gameEle) {
            for (let i = 0; i < gameEle.length; i++) {
                let col = gameEle[i];
                gameEleList[i] = [];

                for (let j= 0; j < col.length; j++ ) {
                    let raw = col[j];
                    let logic = raw.getComponent("lc_game_ele");
                    let obj = {
                        "type": logic.getType(),
                        "logicX": logic.getLogicX(),
                        "logicY": logic.getLogicY()
                    };

                    gameEleList[i][j] = obj;
                }
            }
        }
    },

    /*
     * 保存分数
     */
    _saveScore: function () {
        let history = this.getScoreHistory();
        if(history) {
            this._m_gameInfo.score = history;
        }
    },

});