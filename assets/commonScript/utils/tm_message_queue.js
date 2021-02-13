/**
 *
 * 内容: 消息队列
 *
 */

tm.window = tm.window || {};

tm.MessageQuene = cc.Class({

    properties: {
        _msgList:[],
        uuid:-1,
    },

    // LIFE-CYCLE CALLBACKS:

    ctor(){
        this._scheduler = cc.director.getScheduler();
        this.uuid = tm.utils.uuid();
    },

    destroy(){
        this._target = null;
        this._scheduler.unschedule(this.step, this);
        this._msgList = null;
    },

    bindTarget(target){
        this._target = target;
    },

    /*
    **
    * 演算开始
    */
    begin:function() {

        var paused = this._scheduler.isTargetPaused(this);

        this._scheduler.schedule(this.step, this, 0, cc.macro.REPEAT_FOREVER, 0, paused);

        this._isRunning = true;
    },

    /**
     * 停止
     */
    stop:function(){
        this._scheduler.unschedule(this.step, this);

        this._isRunning = false;
    },
    /**
     * s
     * @returns {boolean}
     */
    isRunning:function(){
        return this._isRunning;
    },
    /**
     * 暂停
     */
    pause:function(){
        this._isRunning = false;
    },
    /**
     * 继续
     */
    restore:function(){
        this._isRunning = true;
    },

    reset(){
        this._msgList = [];
    },

    step:function(dt){
        if(!this._isRunning){
            return;
        }

        try {
            var localMsg = this._msgList || [];
            if(this._target && localMsg.length > 0){
                var msg = localMsg.shift();
                if(this._target.do_logic){
                    this._target.do_logic(msg);
                }
            }
        }catch(e){
            tm.notifierCenter.trigger(tm.Event.APP_CATCH, e);
        }
    },

    /**
     * 公共命令添加
     * @param cmd
     */
    addCmd:function(msg){
        if(!this._msgList){
            return;
        }

        try {
            this._msgList.push(msg);
        }catch(e){
            tm.notifierCenter.trigger(tm.Event.APP_CATCH, e);
        }
    }
    // update (dt) {},
});