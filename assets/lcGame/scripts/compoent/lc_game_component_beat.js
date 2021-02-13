/**
 *  击打组件
 */
window.lc = window.lc || {};
lc.ComponentBeat = cc.Class({
    extends: lc.ComponentBase,

    properties: {
        _count: 0, // 受打击次数
    },

    ctor () {
        this.type = lc.GameType.ComType.Beat;
    },

    init () {
        if(this._item) {
            this.enabled = true;
            this._count = this._item.beatCount;
        }
    },


    doLogic () {
        // 如果开启
        let flag = false;
        if(this.enabled) {
            this._count--;
            if(this._count <= 0) {
                flag = true;
            }
        }

        return flag;
    },

    destroy () {
        this._super();
    }

});

