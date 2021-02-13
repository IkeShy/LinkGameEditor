/**
 *  选择组件
 */
window.lc = window.lc || {};
lc.ComponentChance = cc.Class({
    extends: lc.ComponentBase,

    properties: {

    },

    ctor () {
        this.type = lc.GameType.ComType.Chance;
    },

    init () {
        this.enabled = true;
    },


    doLogic () {
        // 如果开启
        let flag = false;
        if(this.enabled) {
            flag = true;
        }

        return flag;
    },

    destroy () {
        this._super();
    }

});

