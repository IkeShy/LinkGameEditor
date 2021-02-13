"use strict";
cc._RF.push(module, '7272f+XQYBLubd/5C3g+WUp', 'tm_audio_button');
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