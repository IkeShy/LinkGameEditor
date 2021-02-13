(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/component/tm_effect_loading.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69c31GpiLNKwrfIlFb7MQri', 'tm_effect_loading', __filename);
// commonScript/component/tm_effect_loading.js

"use strict";

/**
 * loading 界面
 */
cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,

        bg: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._aniCtrl = this.getComponent(cc.Animation);
        this.node.active = false;
        tm.notifierCenter.register(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, this.onShowEffect, this);
    },
    onDestroy: function onDestroy() {
        tm.notifierCenter.ignoreScope(this);
    },
    onShowEffect: function onShowEffect(args) {

        var bShow = args;
        if (typeof args == 'boolean') {
            this.title.node.active = false;
            this.bg.height = this.bg.width;
        } else {
            var info = args;
            bShow = info.bShow;

            if (info.title) {
                this.title.node.active = true;
                this.title.string = info.title;
                this.bg.height = this.bg.width + 20;
            }
        }

        if (bShow) {
            this._aniCtrl.play("common_effect_loading");
            this.node.active = true;
        } else {
            this.node.active = false;
        }
    },
    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=tm_effect_loading.js.map
        