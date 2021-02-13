/**
 * 内容: 网络协议model
 */

tm.window = tm.window || {};

tm.MsgModel = cc.Class({

    extends:require("./tm_base_model"),

    properties:{
        _modelMgr: null,
    },

    ctor:function () {
        this._modelMgr = arguments[2];
        this._triggerKey = arguments[3];

        this.isAsync = true;
        this._isRequestIng = false;
        this._callbacks = [];

        if(this._notifierCenter) {
            this._notifierCenter.register(tm.Event.EVT_NET_WEB_SOCKET_DISCONNECT, this.reset, this);
        }
    },

    destroy:function () {
        this._modelMgr = null;
        this._triggerKey = null;
    },


    reset:function () {
        tm.LOGD("tm.MsgModel", "网络错误重置Model请求状态：", this.model_name);
        this._isRequestIng = false;
        this._callbacks = [];
        this.isAsync = true;
    },


    resetResponseCb:function(){
        this._callbacks.length = 0;
    },

    request: function (params, handler, owner) {
        if(!this.isAsync){
            return;
        }
        //有人请求了,只需要在回调中触发
        let bHaveCb = false;
        if(handler){
            this._callbacks.push(
                {
                    'cb':handler,
                    'owner': owner
                }
            );
            bHaveCb = true;
        }

        if(this._isRequestIng && bHaveCb){
            return;
        }

        this._isRequestIng = true;

        this._modelMgr.request(this.model_name, params);
    },

    onResponse: function (result) {
        this._showErrorCode(result);

        this.data = result;
        this._isRequestIng = false;

        this.parse(result);

        this._callbacks.forEach(function (info) {
            let callback = info['cb'];
            if(callback){
                callback.call(info['owner'] || this, result);
            }
        },this);

        this.resetResponseCb();

        if(this._modelMgr) {
            this._modelMgr.onResponse.call(this._modelMgr, this.data, this.model_name);
        }
    },

    /**
     *  显示错误码
     * @private
     */
    _showErrorCode: function (data) {
        if(data && data.Result && data.Result.code) {
            tm.socketErrorCode.showHit(data.Result.code);
        }

        if(data && data.status) {
            tm.socketErrorCode.showHit(data.status);
        }

    },
});
