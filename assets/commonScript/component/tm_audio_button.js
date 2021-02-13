cc.Class({
    extends: cc.Component,

    properties: {
        m_audio: {
            type: cc.AudioClip,
            default: null,
        },
    },

    editor: {
        requireComponent: cc.Button
    },

    onLoad: function () {
        let button = this.node.getComponent(cc.Button);
        let eventHandler = new cc.Component.EventHandler();
        eventHandler.target = this.node;
        eventHandler.component = "tm_audio_button";
        eventHandler.handler = 'playEffect';
        button.clickEvents.push(eventHandler); 
    },

    playEffect: function () {
        this.m_audio && tm.soundCore.playEffect(this.m_audio, false);
    }
});
