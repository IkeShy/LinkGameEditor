(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/render/tm_frame_tool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e3060qKAHlPL54ijYpXMefy', 'tm_frame_tool', __filename);
// commonScript/render/tm_frame_tool.js

"use strict";

/**
 *
 * 内容:
 *
 */

cc.Class({
    extends: cc.Component,

    properties: {
        _fpss: null
    },

    begin: function begin() {
        this._fpss = [];

        this.unschedule(this._stepCheck);
        this.schedule(this._stepCheck, 0.2, cc.macro.REPEAT_FOREVER, 0, false);
    },
    endSampling: function endSampling() {
        this.unschedule(this._stepCheck);

        if (!this._fpss) {
            return 0;
        }

        if (this._fpss.length == 0) {
            return 0;
        }
        var eFps = this.sum();

        var pf = eFps / this._fpss.length;
        //tm.LOGD("Frame Tool eFps : ", pf);
        return pf;
    },
    sum: function sum() {
        var _sum = 0;
        var localFps = this._fpss;
        var len = localFps.length;

        for (var i = 0; i < len; i++) {
            _sum += localFps[i];
        }

        return _sum;
    },
    _stepCheck: function _stepCheck() {
        var fps = cc.director.getDeltaTime();

        tm.LOGD("Frame Tool : ", fps);

        this._fpss.push(fps);
    }
});

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
        //# sourceMappingURL=tm_frame_tool.js.map
        