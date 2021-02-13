/**
 * 游戏逻辑 -- 选择逻辑
 *
 */
cc.Class({
    extends: tm.GameWapper,

    properties: {
        _curEle: null, // 当前选择的元素
        _selectList: [], // 当前选择的所有
        _crashList: [], // 爆炸列表
        mixCount: 1, // 最小移除数量
    },

    onLoad () {
        this._super();
    },

    /**
     * 切换当前的元素
     * @param ele
     */
    changeCurEle (ele) {
        this.playEleEffect(ele);
        this._curEle = ele;
        this._selectList.push(ele);
    },

    /**
     * 是否和已有列表中的最后一个是相同的
     * @param gameEle
     * @private
     */
    isSame: function (ele) {
        if(this._selectList.find(function(value){
            return value === ele;
        })){
            if(this._selectList.length > 1) {
                let last = this._selectList[this._selectList.length - 2];
                if(last) {
                    if (this._checkIsSamePos(last, ele)) {
                        this._popLastEle();
                    }
                }
            }

            return true;
        }

        return false;
    },

    /**
     * 检测是否是同一个
     * @private
     */
    _checkIsSamePos: function (eleA, eleB) {
        let flag = false;
        if(eleA && eleB) {
            let logicX = eleA.logicX;
            let logicY = eleA.logicY;
            flag = eleB.checkIsSamePos(logicX, logicY);
        }

        return flag;
    },

    /**
     * 弹出最后一个游戏元素
     * @private
     */
    _popLastEle: function () {
        let ele = this._selectList.pop();
        if(ele) {
            this.stopEleEffect(ele);
        }

        ele = this._selectList[this._selectList.length - 1];
        if(ele) {
            this._curEle = ele;
            this.trigger(lc.Event.GameEvent.HideLastLine);
        }
    },

    /**
     * 是同一类型
     */
    isSameType: function (ele){
        let flag = false;
        if(this._curEle){
            if(ele.checkIsSameType(this._curEle)){
                tm.LOGD("同一种类型的格子");
                flag = true;
            }
        } else {
            tm.LOGD("还没开始选择到格子");
        }

        return flag;
    },

    /**
     * 是否在区域内
     * @param ele
     * @returns {boolean}
     */
    checkIsInArea: function  (ele) {
        let flag = false;
        if(this._curEle){
            if(ele.checkIsInArea(this._curEle)){
                tm.LOGD("在区域内");
                flag = true;
            }
        } else {
            tm.LOGD("还没开始选择到格子");
        }

        return flag;
    },

    /**
     * 移除选中的网格
     */
    removeSelectList: function () {
        let isRemove = this._selectList.length >= this.mixCount ? true : false;
        if(isRemove) {
           this._cleanSelectList(isRemove);
        }
    },

    _cleanSelectList (isRemove) {
        this._selectList.forEach((value) => {
            if(isRemove) {
                value.onBeat();
            }
        });

        this._selectList.length = 0;
    },

    /**
     * 添加被被撞物体
     * @param ele
     */
    addCrashedContainer (ele) {
        if(ele) {
            this._crashList.push(ele);
        }
    },

    /**
     * 触发被碰撞物体
     * @param info
     */
    onCrashedContainer() {
        let tmpList = [];
        for (let i = 0; i < this._crashList.length; i++) {
            let one = this._crashList[i];
            tmpList.push(one)
        }

        this._crashList.length = 0;

        tmpList.forEach((value) => {
            value.onCrashed();
        });
    },

    getCurEle () {
      return this._curEle
    },

    playEleEffect (ele) {

    },

    stopEleEffect (ele) {

    }



});