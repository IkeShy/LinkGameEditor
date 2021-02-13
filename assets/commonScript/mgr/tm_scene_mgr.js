/**
 *
 * 内容: 场景管理器
 *
 */

window.tm = window.tm || {};

tm.sceneMgr = {

    _curSceneName : null,
    _state:-1,//1:开始加载 2：加载完成, 3:加载失败

    preloadScene(name, cb){
        if(this._state == 1){
            return;
        }

        this._curSceneName = name;
        this._state = 1;

        let self = this;

        tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, true);
        cc.director.preloadScene(name, null, function(error, asset){
            tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, false);
            self.resetOnProgress();
            if(!error) {
                cc.director.loadScene(name, function () {
                     self._state = 2;
                    cb && cb(error, asset);
                 });
            } else {
                self.loadSceneFail();
            }
        });
    },

    customPreloadScene(name, cb){
        if(this._state == 1){
            return;
        }

        this._curSceneName = name;
        this._state = 1;

        var self = this;
        cc.director.preloadScene(name, null, function (error, asset) {
            self.resetOnProgress();
            if(!error) {
                self._state = 2;
                cb && cb(error, asset);
            }
        }, this.loadSceneFail.bind(this));
    },

    resetOnProgress(){
        cc.loader.onProgress = null;
    },

    loadSceneFail(error, asset){
        this.resetOnProgress();
        this._state = 3;
    },

    destroy:function(){
        this._curScene = null;
    }
};