"use strict";
cc._RF.push(module, '230c6q7QxxKvqKBxSmrSEIp', 'tm_base_scene');
// commonScript/common/tm_base_scene.js

"use strict";

/**
 *
 * 内容: 场景基类
 *
 */

window.tm = window.tm || {};

tm.BaseScene = cc.Class({
    extends: require("./tm_game_wapper"),

    properties: {

        ui_parent: {
            default: null,
            type: cc.Node
        },

        top_hint_parent: {
            default: null,
            type: cc.Node
        },

        common_sm_hint: {
            default: null,
            type: cc.Prefab
        },

        common_loading_effect: {
            default: null,
            type: cc.Prefab
        },

        common_dialogBox: {
            default: null,
            type: cc.Prefab
        },

        // 音乐
        m_gameBgm: {
            type: cc.AudioClip,
            default: null
        },

        commom_scroll_msg_parent: cc.Node, // 跑马灯节点
        common_scroll_msg: cc.Prefab, // 公用跑马灯

        _startReconnect: false,

        /*启动参数*/
        _tempLaunchQuery: null,

        _commonBoxLogic: null // 通用弹窗
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._super();
        // 背景音乐
        this.m_gameBgm && tm.soundCore.playMusic(this.m_gameBgm, true);

        // 屏幕适配
        tm.utils.adaptiveWin();

        //
        if (this.top_hint_parent) {
            //黑底小提示语
            if (this.common_sm_hint) {
                var hintPrb = cc.instantiate(this.common_sm_hint);
                hintPrb.x = 0;
                hintPrb.width = cc.winSize.width;
                hintPrb.height = cc.winSize.height;
                hintPrb.y = 0;
                this.top_hint_parent.addChild(hintPrb);
            }

            //转圈特效
            if (this.common_loading_effect) {
                var effectPrb = cc.instantiate(this.common_loading_effect);
                effectPrb.x = 0;
                effectPrb.y = 0;
                this.top_hint_parent.addChild(effectPrb);
            }
        }

        //子类不要监听
        tm.notifierCenter.register(tm.Event.EVT_SYS_GAME_SHOW, this.onGameShow, this);
        this._initCommomScrollMsg();
    },


    /**
     * 初始化通用跑马灯
     * @private
     */
    _initCommomScrollMsg: function _initCommomScrollMsg() {
        if (this.commom_scroll_msg_parent) {

            if (this.common_scroll_msg) {
                var uiObj = cc.instantiate(this.common_scroll_msg);
                this.commom_scroll_msg_parent.addChild(uiObj);
            }
        }
    },
    start: function start() {
        //监听网络事件
        tm.notifierCenter.register(tm.Event.EVT_NET_WEB_SOCKET_RECT_BEGIN, this.onNetReconnect, this);
        tm.notifierCenter.register(tm.Event.EVT_NET_WEB_SOCKET_CONNECT, this.onNetReconnectOK, this);

        //对话框
        tm.notifierCenter.register(tm.Event.EVT_POP_COMMON_DIALOG_BOX, this.onPopDialogBox, this);
    },
    onDestroy: function onDestroy() {
        tm.soundCore.stopMusic();
        this._super();
    },


    /**
     *  通用对话框
     *  tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_DIALOG_BOX,{
            msg: "123",
            cb:function (error, res) {
         }});
     * @param data
     */
    onPopDialogBox: function onPopDialogBox(data) {
        //TODO:
        if (!this._commonBoxLogic) {
            if (this.common_dialogBox) {
                var uiObj = cc.instantiate(this.common_dialogBox);
                this.top_hint_parent.addChild(uiObj);
                this._commonBoxLogic = uiObj.getComponent("tm_common_tip_view");
            }
        }

        if (this._commonBoxLogic) {
            this._commonBoxLogic.onShow(data);
        }
    },


    /**
     * 网络开始重连
     */
    onNetReconnect: function onNetReconnect() {
        this._startReconnect = true;
        tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, {
            bShow: true,
            title: tm.String.NET_RECONNECT
        });
    },

    /**
     * 重连成功
     */
    onNetReconnectOK: function onNetReconnectOK() {
        if (this._startReconnect) {
            tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, false);
        }

        this._startReconnect = false;
    },


    /**
     * 断线重新是否重新启动登陆逻辑
     * 子类重写
     */
    isAgainDoLaunchLogic: function isAgainDoLaunchLogic() {
        return true;
    },


    /**
     *
     * @param res
     */
    onGameShow: function onGameShow(res) {}
});

cc._RF.pop();