/**
 * 游戏元素：元素父类 -- 所有东西都继承他
 */
window.lc = window.lc || {};
lc.ItemBase = cc.Class({
    extends: tm.GameWapper,

    properties: {
        comNode: cc.Node, // 组件的节点
        spf: [cc.SpriteFrame], // 贴图

        _comMap: null, // 组件列表

        Priority: {
            visible: false,
            get: function () {
                return this._itemPriority;
            }
        }, // 优先级

        ItemType: {
            visible: false,
            get: function () {
                return this._itemType;
            }
        }, // 物体类型

    },

    ctor () {
        this._itemPriority = lc.GamePriority.Invalid;
        this._itemType = lc.GameType.ItemType.Invalid;
    },

    onLoad () {
        this._super();
        this._comMap = {};
        this.initUseCom();

    },

    onDestroy(){
        this._removeAllCom();

        this._super();
    },

    /**
     * 移除所有组件
     * @private
     */
    _removeAllCom () {
        for (let key in this._comMap) {
            let oneCom = this._comMap[key];
            if(oneCom) {
                oneCom.destroy();
            }
        }
    },

    /**
     * 初始化组件
     */
    initUseCom: function () {
        return;
    },

    /**
     * 添加组件
     */
    addComByType (type) {
        let clazz = this.game.comFactory.createComByType(type);
        if(clazz) {
            let com = new clazz();
            com.item = this;
            com.init();

            this._comMap[type] = com;
        } else {
            tm.LOGE(false, 'addComByType error : ' + type);
        }

    },

    /**
     * 移除组件
     */
    removeComByType (type) {

    },

    /**
     * 是否可选择
     */
    isCanChance () {
        return this._doComLogicByType(lc.GameType.ComType.Chance);
    },

    onBeat () {
        return this._doComLogicByType(lc.GameType.ComType.Beat);
    },

    onRemove () {
        return this._doComLogicByType(lc.GameType.ComType.Remove);
    },

    /**
     * 是否可以爆炸
     * @returns
     */
    onCrash (info) {
        return this._doComLogicByType(lc.GameType.ComType.Crash, info);
    },

    /**
     * 是否可以被爆炸
     * @returns
     */
    onCrashed () {
        return this._doComLogicByType(lc.GameType.ComType.Crashed);
    },

    _doComLogicByType (type, info) {
        let flag = false;
        let com = this._comMap[type];
        if(com) {
            flag = com.doLogic(info);
        }

        return flag;
    },

    /**
     * 设置物体的坐标
     * @private
     */
    setPos (x, y) {
        this.node.setPosition(x, y);
    },

});

