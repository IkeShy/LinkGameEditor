/**
 *  撞击组件
 */
window.lc = window.lc || {};
lc.ComponentCrash = cc.Class({
    extends: lc.ComponentBase,

    properties: {

    },

    ctor () {
        this.type = lc.GameType.ComType.Crash;
    },

    init () {
        if(this._item) {
            this.enabled = true;
        }
    },


    doLogic (info) {
        // 如果开启
        let flag = false;
        if(this.enabled && info) {
            flag = true;

            info['to'] = this._item.crashToType;
            info['count'] = this._item.crashCount;

            lc.game.trigger(lc.Event.GameEvent.CrashOtherContainer, info);
        }

        return flag;
    },

    destroy () {
        this._super();
    }

});

