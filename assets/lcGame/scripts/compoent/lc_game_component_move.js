/**
 *  移动组件
 */
window.lc = window.lc || {};
lc.ComponentMove = cc.Class({
    extends: lc.ComponentBase,

    properties: {

    },

    ctor () {
        this.type = lc.GameType.ComType.Move;
    },

    init () {

    },

    doLogic () {
        // 如果开启
        if(this.enabled) {

        }
    },

    destroy () {
        this._super();
    }

});

