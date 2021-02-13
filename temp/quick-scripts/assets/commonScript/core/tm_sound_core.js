(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/core/tm_sound_core.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '757658ilVBD77FxxtsdTLLX', 'tm_sound_core', __filename);
// commonScript/core/tm_sound_core.js

"use strict";

/**
 *
 * 内容: 音乐控制
 *
 */

window.tm = window.tm || {};

tm.SoundCore = cc.Class({
    _muteFlag: false, // 是否静音

    m_musicId: null, // 当前播放的音乐id
    m_musicClip: null, // 当前播放的音乐文件

    m_effectVal: null, // 音量
    m_id2Effect: null,

    ctor: function ctor() {
        this._muteFlag = false;
        this.m_effectVal = 1;
        this.m_id2Effect = [];

        tm.notifierCenter.register(tm.Event.EVT_CHANGE_BG_MUSIC_VAL, this._onChangeBgmVal, this);
        tm.notifierCenter.register(tm.Event.EVT_CHANGE_EFFECT_VAL, this._onChangeEffectVal, this);
    },

    /**
     * 修改背景音量
     * @private
     */
    _onChangeBgmVal: function _onChangeBgmVal(val) {
        if (this.m_musicId) {
            this._setVolume(this.m_musicId, val);
        }
    },


    /**
     *  设置背景音量大小
     * @param id
     * @param volume
     */
    _setVolume: function _setVolume(id, val) {
        if (val === "" || val == null) {
            return false;
        }

        if (val < 0) val = 0;
        if (val > 1) val = 1;

        cc.audioEngine.setVolume(id, val);
    },

    /**
     * 修改特效音量
     * @private
     */
    _onChangeEffectVal: function _onChangeEffectVal(val) {
        this._setEffectVolume(val);
    },


    /**
     *  设置特效音量大小
     * @param id
     * @param volume
     */
    _setEffectVolume: function _setEffectVolume(val) {
        if (val < 0) val = 0;
        if (val > 1) val = 1;

        this.m_effectVal = val;

        for (var i = 0; i < this.m_id2Effect.length; i++) {
            var one = this.m_id2Effect[i];
            if (one >= 0) {
                cc.audioEngine.setVolume(one, val);
            }
        }
    },

    playMusic: function playMusic(clip, bLoop) {
        if (this._muteFlag) {
            return;
        }

        if (clip != undefined && clip != null) {
            this.m_musicClip = clip;
        }
        if (bLoop === undefined || bLoop === null) {
            bLoop = false;
        }

        // 先停止之前播放的音乐
        this.stopMusic();
        this.m_musicId = cc.audioEngine.play(this.m_musicClip, bLoop, 1);
        return this.m_musicId;
    },
    isMute: function isMute() {
        return this._muteFlag;
    },
    playEffect: function playEffect(clip, loop) {
        if (this._muteFlag) {
            return;
        }

        if (loop === undefined || loop === null) {
            loop = false;
        }

        var effectId = cc.audioEngine.play(clip, loop, this.m_effectVal);

        // 如果是一直循环的音效添加列表中，调整音效的时候改变音乐大小
        if (loop) {
            this.m_id2Effect.push(effectId);
        }

        return effectId;
    },
    playWithCb: function playWithCb(path, bLoop, cb) {
        if (this._muteFlag) {
            return;
        }

        bLoop = typeof bLoop === 'undefined' ? false : bLoop;

        var id = cc.audioEngine.play(path, bLoop);

        cc.audioEngine.setFinishCallback(id, function () {
            cb && cb(id);
        });

        return id;
    },


    /**
     * 停止播放音乐
     */
    stopMusic: function stopMusic() {
        if (this.m_musicId != undefined && this.m_musicId != null) {
            cc.audioEngine.stop(this.m_musicId);
            this.m_musicId = null;
        }
    },


    /**
     * 暂停音乐
     */
    pauseMusic: function pauseMusic() {
        if (this.m_musicId != undefined && this.m_musicId != null) {
            cc.audioEngine.pause(this.m_musicId);
        }
    },

    /**
     * 恢复音乐
     */
    resumeMusic: function resumeMusic() {
        if (this.m_musicId != undefined && this.m_musicId != null) {
            cc.audioEngine.resume(this.m_musicId);
        }
    },

    setMute: function setMute(mute) {
        this._muteFlag = !!mute;
    },


    /**
     *   停止所有正在播放资源
     */
    stopAll: function stopAll() {
        this.m_musicId = null;
        this.m_id2Effect.length = 0;

        cc.audioEngine.stopAll();
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
        //# sourceMappingURL=tm_sound_core.js.map
        