/**
 *
 * 内容:
 *
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _fpss: null,
    },

    begin(){
        this._fpss = [];

        this.unschedule(this._stepCheck);
        this.schedule(this._stepCheck, 0.2, cc.macro.REPEAT_FOREVER, 0, false);
    },

    endSampling(){
        this.unschedule(this._stepCheck);

        if(!this._fpss){
            return 0;
        }

        if(this._fpss.length == 0){
            return 0;
        }
        let eFps = this.sum();

        let pf = eFps/this._fpss.length;
        //tm.LOGD("Frame Tool eFps : ", pf);
        return pf;
    },

    sum(){
        let _sum = 0;
        let localFps = this._fpss;
        let len = localFps.length

        for(var i = 0;i < len;i++){
            _sum += localFps[i];
        }

        return _sum;
    },

    _stepCheck(){
        let fps = cc.director.getDeltaTime();

        tm.LOGD("Frame Tool : ", fps);

        this._fpss.push(fps);
    }

});