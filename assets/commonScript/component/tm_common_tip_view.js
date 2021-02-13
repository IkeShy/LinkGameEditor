/**
 * 通用同意弹窗
 */
cc.Class({
    extends: cc.Component,

    properties: {
        // creator
        m_contentLabel: cc.Label, // 内容文本
        _m_cb: null, // 回调
        _m_info: null, // 数据
    },

    onLoad () {

    },

    start(){

    },

    onShow (info) {
        this.node.active = true;
        this._m_info = info;
        this._showContent();
        this._bindCb();
    },

    onHide () {
        this.node.active = false;
    },

    /**
     * 显示文本
     * @private
     */
    _showContent: function () {
        let msg = this._m_info.msg;
        if(msg) {
            this.m_contentLabel.string = msg;
        }
    },

    /**
     * 绑定回调方法
     * @private
     */
    _bindCb: function () {
        this._m_cb = null;

        let cb = this._m_info.cb;
        if(cb) {
            this._m_cb = cb;
        }
    },

    /**
     * 确认
     */
    onSureFunc: function(){
        this.onHide();
        this._m_cb && this._m_cb(null, true);
    },

    /**
     * 取消
     */
    onCancelFunc: function(){
        this.onHide();
        this._m_cb && this._m_cb(null, false);
    },

});
