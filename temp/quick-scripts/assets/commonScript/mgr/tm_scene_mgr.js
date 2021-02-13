(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/mgr/tm_scene_mgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2836fpKgOdE16J0zV0vXtpm', 'tm_scene_mgr', __filename);
// commonScript/mgr/tm_scene_mgr.js

"use strict";

/**
 *
 * 内容: 场景管理器
 *
 */

window.tm = window.tm || {};

tm.sceneMgr = {

    _curSceneName: null,
    _state: -1, //1:开始加载 2：加载完成, 3:加载失败

    preloadScene: function preloadScene(name, cb) {
        if (this._state == 1) {
            return;
        }

        this._curSceneName = name;
        this._state = 1;

        var self = this;

        tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, true);
        cc.director.preloadScene(name, null, function (error, asset) {
            tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, false);
            self.resetOnProgress();
            if (!error) {
                cc.director.loadScene(name, function () {
                    self._state = 2;
                    cb && cb(error, asset);
                });
            } else {
                self.loadSceneFail();
            }
        });
    },
    customPreloadScene: function customPreloadScene(name, cb) {
        if (this._state == 1) {
            return;
        }

        this._curSceneName = name;
        this._state = 1;

        var self = this;
        cc.director.preloadScene(name, null, function (error, asset) {
            self.resetOnProgress();
            if (!error) {
                self._state = 2;
                cb && cb(error, asset);
            }
        }, this.loadSceneFail.bind(this));
    },
    resetOnProgress: function resetOnProgress() {
        cc.loader.onProgress = null;
    },
    loadSceneFail: function loadSceneFail(error, asset) {
        this.resetOnProgress();
        this._state = 3;
    },


    destroy: function destroy() {
        this._curScene = null;
    }
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=tm_scene_mgr.js.map
        