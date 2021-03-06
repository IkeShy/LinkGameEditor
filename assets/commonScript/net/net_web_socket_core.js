/**
 *
 * 注意: 标记为Ref的对象为引用对象, 不要在这个类改变属性.
 *
 * 内容:
 * socket
 *
 * 例子：
 *  tm.netSocketIo.linkServer(host);
 */

const NetState = {
    DEFAULT:-1,//默认状态，开没开始链接
    CONNECTED:1,//链接成功
    ERROR:2//链接错误
};

tm.NetSocketCore = cc.Class({
    extends:cc.Component,

    properties:{
        _TAG: "MainNetSocket",
        _sioClient:null,
        _bGameShow:true,
        _gameHideTime: -1,
        _dispatchMap:null,
        _netState:NetState.DEFAULT,
        _hbInterval: 3,

        _host: null,
        _post: null,
    },

    ctor:function(){
        this._dispatchMap = {};
        this._delayTime = 100;//默认100ms


        this.init();
    },

    init:function(){
        this.registerEvent();
    },

    onDestroy:function(){
        this._sioClient = null;

        this._dispatchMap = null;
    },

    registerEvent:function () {
        tm.notifierCenter.register(tm.Event.EVT_SYS_GAME_HIDE, this.onGameHide, this);
        tm.notifierCenter.register(tm.Event.EVT_SYS_GAME_SHOW, this.onGameShow, this);
    },

    netChange:function (state) {
        this._netState = state;
    },

    getNetState:function () {
        return this._netState;
    },

    registerNetDispatch:function (gameId, notifier) {
        this._dispatchMap[gameId] = notifier;
    },

    removeNetDispatch:function (gameId) {
        if(this._dispatchMap[gameId]){
            delete  this._dispatchMap[gameId];
        }

        tm.LOGD("tm.NetSocketCore removeNetDispatch ", "gameId", gameId);
    },
    /**
     * app切入前台
     */
    onGameShow:function(){
        this._bGameShow = true;
    },

    /**
     * app切入后台
     */
    onGameHide:function(){
        this._bGameShow = false;
        this._gameHideTime = new Date().getTime();
    },

    setHBInterval:function (time) {
        this._hbInterval = time || 3;
    },

    linkServer:function(host, post){
        if(!host){
            return;
        }

        try {
            if(this._sioClient.connected) {
                this._sioClient.disconnect();
                this._sioClient.connected = false;
            }

            tm.LOGD("tm.NetSocketCore host ", host);
            tm.LOGD("tm.NetSocketCore post ", post);

            if (typeof  this._sioClient  === 'undefined') {
                tm.LOGE("tm.NetSocketCore ", 'You should new mqlib first !');
                return;
            }

            this._host = host;
            this._post = post;

            let prop = {
                "connect": this.onConnect,
                "error": this.onError,
                "close": this.onClose,
                "reconnect": this.onReconnect,
                "useSSL": false,
                "host": host,
                "port": post
            };

            this._sioClient.init(prop, this);
            this._sioClient.tag = this._TAG;
        } catch(e) {
            tm.notifierCenter.trigger(tm.Event.APP_CATCH, e);
        }
    },

    onConnect: function() {
        tm.LOGD(this._TAG, "链接成功");

        this.netChange(NetState.CONNECTED);

        //native 需要手动标记
        this._sioClient.connected = true;

        tm.notifierCenter.trigger(tm.Event.EVT_NET_WEB_SOCKET_CONNECT);
    },


    /**
     * Fired when an error occurs.
     * 发生错误
     */
    onError:function (msg) {
        tm.LOGD(this._TAG, "onError", msg);
        this.netChange(NetState.ERROR);
    },

    /**
     * 触发关闭
     */
    onClose: function () {
        tm.LOGD(this._TAG, "onClose");
        this.netChange(NetState.ERROR);
    },

    __rconnect(){
        tm.notifierCenter.trigger(tm.Event.EVT_NET_WEB_SOCKET_DISCONNECT);
        //开始重连
        tm.notifierCenter.trigger(tm.Event.EVT_NET_WEB_SOCKET_RECT_BEGIN);

        this.linkServer(this._host, this._post);
    },
    /**
     * 成功的重连
     * Fired upon a successful reconnection.
     */
    onReconnect:function () {
        tm.LOGD(this._TAG, "onReconnect");
        this.netChange(NetState.CONNECTED);
        tm.notifierCenter.trigger(tm.Event.EVT_NET_WEB_SOCKET_CONNECT);
    },

    getDelayTime(){
        return this._delayTime;
    },

    /**
     * 发送消息
     * @param protocol
     * @param callback
     * @param context
     */
    send:function (protocol){
        let sio = this._sioClient;
        if(!sio){
            tm.notifierCenter.trigger(tm.Event.EVT_NET_WEB_SOCKET_UNINIT);
            return;
        }

        if(sio.connected){
            let topic = protocol.cmd;
            let params = protocol.params;
            let msg_json = JSON.stringify(params);

            tm.LOGD("Send topic: ", topic, " msg: ",  msg_json);

            sio.request(topic, params);
        } else {
            tm.notifierCenter.trigger(tm.Event.EVT_NET_WEB_SOCKET_UNCONNECT);
        }
    },

    /**
     * 监听消息
     * @param callback
     * @param context
     */
    on:function (topic, callback, context) {
        let sio = this._sioClient;
        if(!sio){
            tm.notifierCenter.trigger(tm.Event.EVT_NET_WEB_SOCKET_UNINIT);
            return;
        }

        if(sio.connected){
           // tm.LOGD("on topic: ", topic);

            sio.on(topic, callback, context);
        } else {
            tm.notifierCenter.trigger(tm.Event.EVT_NET_WEB_SOCKET_UNCONNECT);
        }
    }
});