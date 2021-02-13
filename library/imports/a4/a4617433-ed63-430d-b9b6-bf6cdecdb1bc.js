"use strict";
cc._RF.push(module, 'a4617Qz7WNDDbm2v2zezbG8', 'tm_progress_timer');
// commonScript/component/tm_progress_timer.js

"use strict";

/**
 * 倒计时方法
 */
cc.Class({
    extends: cc.Component,

    properties: {

        _curProgress: 1,
        _oTime: 0, // 结束时间
        _from: 0,
        _to: 0,
        _cb: null,
        _scoper: null,
        _showL: false, // 是否显示倒计时字符串
        _type: 0, // 0 倒计时，1 增量

        progressBar: cc.ProgressBar,
        timeLabel: cc.Label,

        _isPause: false // 是否暂停
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    /**
     * TODO:
     * @param dt
     * @param from
     * @param to
     * @param cb
     * @param stepCb -- 每一秒回调
     */
    run: function run(from, to, cb, showL, scoper) {
        this._isPause = false;
        this.unschedule(this.stepUpdate);

        this._from = from;
        this._to = to;
        this._cb = cb;
        this._showL = showL;
        this._oTime = this._from;
        this._scoper = scoper;

        this._showTimeLabel(this._from);

        this._type = this._from > this._to ? 0 : 1;
        this.schedule(this.stepUpdate, 1, cc.macro.REPEAT_FOREVER, 0, false);
    },


    // added by bruke
    stop: function stop() {
        this._showTimeLabel(0);
        this.unschedule(this.stepUpdate);
        this._cb = null;
        this._oTime = 0;
        this._from = 0;
        this._to = 0;
        this._showL = false;
        this.timeLabel.node.active = false;
    },

    // end

    // 暂停
    pause: function pause() {
        this._isPause = true;
    },


    // 恢复
    resume: function resume() {
        this._isPause = false;
    },
    stepUpdate: function stepUpdate(dt) {
        if (this._isPause) {
            return;
        }

        if (this._type == 0) {
            if (this._from-- <= this._to) {
                this._cb && this._cb.call(this._scoper);
                this.stop();
            }
        } else if (this._type) {
            if (this._from++ >= this._to) {
                this._cb && this._cb.call(this._scoper);
                this.stop();
            }
        }

        this._showTimeLabel(this._from);
    },


    // 显示时间倒计时
    _showTimeLabel: function _showTimeLabel(str) {
        if (this._showL && this.timeLabel) {
            this.timeLabel.node.active = true;
            this.timeLabel.string = Math.ceil(str);
        }
    }

});

cc._RF.pop();