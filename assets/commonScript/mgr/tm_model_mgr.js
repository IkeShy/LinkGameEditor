/**
 *
 * 内容: 游戏数据结构管理
 *
 */

window.tm = window.tm || {};

tm.ModelMgr = cc.Class({

    extends: require("../common/tm_game_wapper"),

    properties:{
        _msgCbs:null,
        _notifierCenter:null,
        _msgConfig:null,
    },
    /**
     *
     * @param namesp 对应插件游戏的命名空间
     */
    ctor: function () {
        this.gameId = arguments[0] || 666;
        this.modelMap = {};
        this._msgCbs = {};
    },

    init: function (msgConfig, notifier) {
        this._msgConfig = msgConfig;

        this._notifierCenter = notifier;

        this.registAllMsgCmd(msgConfig);
    },

    reloadMsgCmd:function (msgConfig) {
        this.registAllMsgCmd(msgConfig);
    },

    registAllMsgCmd:function(msgConfig){
        let msgC = msgConfig;
        for (let k in msgC) {
            let prot = msgC[k];
            let cmd = prot.cmd;
            let bCache = prot.bCache;

            if (bCache) {
                if (!this._msgCbs[k]) {
                    let model = this._msgCbs[k] = this.createModel(k);
                    if(model) {
                        tm.netSocketIo.on(cmd, model.onResponse, model);
                    }
                }
            }
        }
    },

    newMsg:function(cmd, moreParams){
        var msg = {};
        msg.params = {};
        msg.cmd = cmd;
        if (moreParams != null) {
            for (var item in moreParams) {
                msg.params[item] = moreParams[item];
            }
        }
        return msg;
    },

    getMsgProtocol:function(key, moreParams){
        let protocols = this._msgConfig;
        let prot = JSON.parse(JSON.stringify(protocols[key]));
        let cmd = prot.cmd;
        moreParams = moreParams || {};

        if(prot.params){
            for (let item in moreParams) {
                //兼容
                if(moreParams.hasOwnProperty(item)){
                    prot.params[item] = moreParams[item];
                }
            }
        }

        let msg = this.newMsg(cmd, prot.params);
        return msg;
    },

    /**
     * 请求
     * @param protocolName
     * @param params
     */
    request: function (protocolName, params) {
        let protocol = this.getMsgProtocol(protocolName, params);
        if(protocol){
            tm.netSocketIo.send(protocol);
        }
    },

    /**
     * 监听
     * @param protocolName
     * @param handler
     * @param scoper
     */
    listenMsg:function (protocolName, handler, scoper) {
        let config = this._msgConfig[protocolName];
        let triggerKey = config['triggerKey'] || protocolName + "_update";

        this._notifierCenter.register(triggerKey, handler, scoper);
    },

    ignoreMsg:function (protocolName, handler, scoper) {
        let config = this._msgConfig[protocolName];
        let triggerKey = config['triggerKey'] || protocolName + "_update";

        this._notifierCenter.ignore(triggerKey, handler, scoper);
    },

    onResponse: function (response, modelName) {
        if(!response){
            tm.LOGE("tm.ModelMgr", "onResponse response is null");
            return;
        }

        if(!modelName){
            tm.LOGE("tm.ModelMgr", "onResponse modelName is null");
            return;
        }

        let config = this._msgConfig[modelName];
        let triggerKey = config['triggerKey'] || modelName + "_update";

        if(response){
            this._notifierCenter.trigger(triggerKey, response);
        }
    },

    createModel:function(modelName){
        let model = this.modelMap[modelName];
        if (!model) {
            let msgConfig = this._msgConfig[modelName];
            let modelClass = msgConfig['modelClass'] || tm.MsgModel;

            model = new modelClass(modelName, this._notifierCenter, this);
            this.addModel(model);
        }
        return model;
    },

    fgetModel: function (modelName) {
        return this.modelMap[modelName];
    },

    /**
     * Register a model with the ModelManager
     * @param {puremvc.model}
     */
    addModel: function (model) {
        this.modelMap[model.model_name] = model;
    },

    hasModel: function (modelName) {
        return this.modelMap[modelName] != null;
    },

    /**
     * Remove a model from the ModelManager.
     *
     * @param {string} modelName
     *  The name of the model instance to remove
     * @return {puremvc.model}
     *  The model that was removed from the ModelManager
     */
    removeModel: function (modelName) {
        var model = this.modelMap[modelName];
        if (model) {

            if(model.destroy){
                model.destroy();
            }

            this.modelMap[modelName] = null;
        }
    },

    destroy:function(){
        for(var k in this.modelMap){
            this.removeModel(k);
        }
        this._msgCbs = null;
        this.modelMap = null;
        this._super();
    }
});