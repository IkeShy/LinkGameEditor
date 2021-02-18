/**
 *  被撞击组件
 */
window.lc = window.lc || {};
lc.ComponentCrashed = cc.Class({
    extends: lc.ComponentBase,

    properties: {

    },

    ctor () {
        this.type = lc.GameType.ComType.Crashed;
    },

    init () {
        if(this._item) {
            this.enabled = true;
        }
    },


    doLogic () {
        // 如果开启
        let flag = false;
        if(this.enabled) {
            this._item.beatCount--;
            if(this._item.beatCount <= 0) {
                flag = true;
            }
        }

        return flag;
    },

    destroy () {
        this._super();
    }

});

