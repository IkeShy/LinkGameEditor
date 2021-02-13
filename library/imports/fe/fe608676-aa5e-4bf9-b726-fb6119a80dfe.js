"use strict";
cc._RF.push(module, 'fe608Z2ql5L+bcm+2EZqA3+', 'tm_message_queue');
// commonScript/utils/tm_message_queue.js

"use strict";

/**
 *
 * 内容: 消息队列
 *
 */

tm.window = tm.window || {};

tm.MessageQuene = cc.Class({

    properties: {
        _msgList: [],
        uuid: -1
    },

    // LIFE-CYCLE CALLBACKS:

    ctor: function ctor() {
        this._scheduler = cc.director.getScheduler();
        this.uuid = tm.utils.uuid();
    },
    destroy: function destroy() {
        this._target = null;
        this._scheduler.unschedule(this.step, this);
        this._msgList = null;
    },
    bindTarget: function bindTarget(target) {
        this._target = target;
    },


    /*
    **
    * 演算开始
    */
    begin: function begin() {

        var paused = this._scheduler.isTargetPaused(this);

        this._scheduler.schedule(this.step, this, 0, cc.macro.REPEAT_FOREVER, 0, paused);

        this._isRunning = true;
    },

    /**
     * 停止
     */
    stop: function stop() {
        this._scheduler.unschedule(this.step, this);

        this._isRunning = false;
    },
    /**
     * s
     * @returns {boolean}
     */
    isRunning: function isRunning() {
        return this._isRunning;
    },
    /**
     * 暂停
     */
    pause: function pause() {
        this._isRunning = false;
    },
    /**
     * 继续
     */
    restore: function restore() {
        this._isRunning = true;
    },

    reset: function reset() {
        this._msgList = [];
    },


    step: function step(dt) {
        if (!this._isRunning) {
            return;
        }

        try {
            var localMsg = this._msgList || [];
            if (this._target && localMsg.length > 0) {
                var msg = localMsg.shift();
                if (this._target.do_logic) {
                    this._target.do_logic(msg);
                }
            }
        } catch (e) {
            tm.notifierCenter.trigger(tm.Event.APP_CATCH, e);
        }
    },

    /**
     * 公共命令添加
     * @param cmd
     */
    addCmd: function addCmd(msg) {
        if (!this._msgList) {
            return;
        }

        try {
            this._msgList.push(msg);
        } catch (e) {
            tm.notifierCenter.trigger(tm.Event.APP_CATCH, e);
        }
    }
    // update (dt) {},
});

cc._RF.pop();