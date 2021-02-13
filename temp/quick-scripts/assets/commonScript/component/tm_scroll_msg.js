(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/component/tm_scroll_msg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f3176e8lZ9IS7fuPfSS3UzU', 'tm_scroll_msg', __filename);
// commonScript/component/tm_scroll_msg.js

"use strict";

/**
 * 大厅元素 -- 跑马灯
 * tm.notifierCenter.trigger(tm.Event.EVT_SHOW_COMMON_SCROLL_MSG, {"msg": "我是跑马灯"});
 */
cc.Class({
    extends: cc.Component,

    properties: {
        // creator
        maskNode: cc.Node, // 裁切层
        strLabel: cc.Label, // 显示的字符串

        // 变量
        _m_startPos: cc.v2(0, 0), // 字符串移动坐标
        _m_infoList: [], // 数据列表
        _m_isRunning: false
    },

    onLoad: function onLoad() {
        this._initData();
        this._initListen();
    },


    /**
     * 注册监听
     * @private
     */
    _initListen: function _initListen() {
        tm.notifierCenter.register(tm.Event.EVT_SHOW_COMMON_SCROLL_MSG, this._showScrollMsg, this);
    },
    onDestroy: function onDestroy() {
        tm.notifierCenter.ignoreScope(this);
    },


    /*
     * 显示跑马灯消息
     */
    _showScrollMsg: function _showScrollMsg(data) {
        this.startScrollFunc(data);
    },
    _initData: function _initData() {
        this._m_isRunning = false;
        this._m_startPos = cc.v2(20, 0);
    },


    /**
     * 开始播放循环
     */
    startScrollFunc: function startScrollFunc(data) {
        if (data == null) {
            return;
        }

        this.node.active = true;
        this._m_infoList.push(data);
        this._showStrLabel();
    },


    /**
     * 显示字符串
     * @private
     */
    _showStrLabel: function _showStrLabel() {
        if (this._m_isRunning) {
            return;
        }

        if (this._m_infoList.length > 0) {
            this._m_isRunning = true;
            this.strLabel.string = this._m_infoList.shift();
            //需要先更新标签的宽度，不然下一帧才更新，这里取到的值就会是原来的值，导致宽度计算错误
            this.strLabel._updateRenderData(true);
            this.strLabel.node.position = this._m_startPos;

            var distance = this.strLabel.node.width + this.maskNode.width / 2;
            var duration = distance / 100;

            var moveBy = cc.moveBy(duration, cc.v2(-distance, 0));
            var callBack = cc.callFunc(function () {
                this._m_isRunning = false;
                this.strLabel.string = "";
                this.strLabel.node.position = this._m_startPos;
                this._showStrLabel();
            }, this);

            var seq = cc.sequence(moveBy, callBack);
            this.strLabel.node.runAction(seq);
        } else {
            this.node.active = false;
        }
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
        //# sourceMappingURL=tm_scroll_msg.js.map
        