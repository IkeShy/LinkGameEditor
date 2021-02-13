"use strict";
cc._RF.push(module, 'c2275DUu4hHiY4eIwuw+D4k', 'tm_common_sm_hint');
// commonScript/component/tm_common_sm_hint.js

'use strict';

/*
 * 通用提示弹框
 */
// tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_SM_HINT, tm.String.NO_NETWORK_HINT);
cc.Class({
    extends: cc.Component,

    properties: {
        lbl_hint: cc.Label,
        spr_bg: cc.Node,

        duration: {
            default: 2,
            type: cc.Float
        },

        minWidth: {
            default: 350,
            type: cc.Integer
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        tm.notifierCenter.register(tm.Event.EVT_POP_COMMON_SM_HINT, this.preShow, this);
        this._aniCtrl = this.getComponent(cc.Animation);
        this.node.active = false;
    },
    preShow: function preShow(arg) {
        this.scheduleOnce(function () {
            this.onShowHint(arg);
        }, 0);
    },
    onShowHint: function onShowHint(arg) {
        if (!arg) {
            return;
        }

        var hintTime = this.duration;
        if (cc.js.isString(arg)) {
            this.lbl_hint.string = arg || "";
        } else {
            hintTime = arg['dt'];
            this.lbl_hint.string = arg['str'] || "";
        }

        var w = this.lbl_hint.node.width;

        w = Math.max(w, this.minWidth);
        this.spr_bg.width = w + 200;

        this.node.active = true;
        //show ani
        this._aniCtrl.play("common_sm_hint_show");

        this.unschedule(this.onHide);
        this.scheduleOnce(this.onHide, hintTime);
    },
    onDestroy: function onDestroy() {
        tm.notifierCenter.ignoreScope(this);
    },
    onHide: function onHide() {
        this._aniCtrl.play("common_sm_hint_hide");
    }
}

// update (dt) {},
);

cc._RF.pop();