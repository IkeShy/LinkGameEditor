(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/component/tm_audio_button.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7272f+XQYBLubd/5C3g+WUp', 'tm_audio_button', __filename);
// commonScript/component/tm_audio_button.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        m_audio: {
            type: cc.AudioClip,
            default: null
        }
    },

    editor: {
        requireComponent: cc.Button
    },

    onLoad: function onLoad() {
        var button = this.node.getComponent(cc.Button);
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "tm_audio_button";
        eventHandler.handler = 'playEffect';
        button.clickEvents.push(eventHandler);
    },

    playEffect: function playEffect() {
        this.m_audio && tm.soundCore.playEffect(this.m_audio, false);
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
        //# sourceMappingURL=tm_audio_button.js.map
        