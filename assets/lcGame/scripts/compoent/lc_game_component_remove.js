/**
 *  消除组件
 */
window.lc = window.lc || {};
lc.ComponentRemove = cc.Class({
    extends: lc.ComponentBase,

    properties: {

    },

    ctor () {
        this.type = lc.GameType.ComType.Remove;
    },

    init () {
        this.enabled = true;
    },


    doLogic () {
        let flag = false;
        // 如果开启
        if(this.enabled) {
            flag = true;
        }

        return flag;
    },

    destroy () {
        this._super();
    }

});

