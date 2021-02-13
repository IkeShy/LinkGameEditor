"use strict";
cc._RF.push(module, 'cf87dGJ2XRB3JvgLFtccKk9', 'tm_common_tip_view');
// commonScript/component/tm_common_tip_view.js

"use strict";

/**
 * 通用同意弹窗
 */
cc.Class({
    extends: cc.Component,

    properties: {
        // creator
        m_contentLabel: cc.Label, // 内容文本
        _m_cb: null, // 回调
        _m_info: null // 数据
    },

    onLoad: function onLoad() {},
    start: function start() {},
    onShow: function onShow(info) {
        this.node.active = true;
        this._m_info = info;
        this._showContent();
        this._bindCb();
    },
    onHide: function onHide() {
        this.node.active = false;
    },


    /**
     * 显示文本
     * @private
     */
    _showContent: function _showContent() {
        var msg = this._m_info.msg;
        if (msg) {
            this.m_contentLabel.string = msg;
        }
    },

    /**
     * 绑定回调方法
     * @private
     */
    _bindCb: function _bindCb() {
        this._m_cb = null;

        var cb = this._m_info.cb;
        if (cb) {
            this._m_cb = cb;
        }
    },

    /**
     * 确认
     */
    onSureFunc: function onSureFunc() {
        this.onHide();
        this._m_cb && this._m_cb(null, true);
    },

    /**
     * 取消
     */
    onCancelFunc: function onCancelFunc() {
        this.onHide();
        this._m_cb && this._m_cb(null, false);
    }

});

cc._RF.pop();