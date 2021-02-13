(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/commonScript/mgr/tm_model_mgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '44634lqiFJNdahwFgqgoyFn', 'tm_model_mgr', __filename);
// commonScript/mgr/tm_model_mgr.js

"use strict";

/**
 *
 * 内容: 游戏数据结构管理
 *
 */

window.tm = window.tm || {};

tm.ModelMgr = cc.Class({

    extends: require("../common/tm_game_wapper"),

    properties: {
        _msgCbs: null,
        _notifierCenter: null,
        _msgConfig: null
    },
    /**
     *
     * @param namesp 对应插件游戏的命名空间
     */
    ctor: function ctor() {
        this.gameId = arguments[0] || 666;
        this.modelMap = {};
        this._msgCbs = {};
    },

    init: function init(msgConfig, notifier) {
        this._msgConfig = msgConfig;

        this._notifierCenter = notifier;

        this.registAllMsgCmd(msgConfig);
    },

    reloadMsgCmd: function reloadMsgCmd(msgConfig) {
        this.registAllMsgCmd(msgConfig);
    },

    registAllMsgCmd: function registAllMsgCmd(msgConfig) {
        var msgC = msgConfig;
        for (var k in msgC) {
            var prot = msgC[k];
            var cmd = prot.cmd;
            var bCache = prot.bCache;

            if (bCache) {
                if (!this._msgCbs[k]) {
                    var model = this._msgCbs[k] = this.createModel(k);
                    if (model) {
                        tm.netSocketIo.on(cmd, model.onResponse, model);
                    }
                }
            }
        }
    },

    newMsg: function newMsg(cmd, moreParams) {
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

    getMsgProtocol: function getMsgProtocol(key, moreParams) {
        var protocols = this._msgConfig;
        var prot = JSON.parse(JSON.stringify(protocols[key]));
        var cmd = prot.cmd;
        moreParams = moreParams || {};

        if (prot.params) {
            for (var item in moreParams) {
                //兼容
                if (moreParams.hasOwnProperty(item)) {
                    prot.params[item] = moreParams[item];
                }
            }
        }

        var msg = this.newMsg(cmd, prot.params);
        return msg;
    },

    /**
     * 请求
     * @param protocolName
     * @param params
     */
    request: function request(protocolName, params) {
        var protocol = this.getMsgProtocol(protocolName, params);
        if (protocol) {
            tm.netSocketIo.send(protocol);
        }
    },

    /**
     * 监听
     * @param protocolName
     * @param handler
     * @param scoper
     */
    listenMsg: function listenMsg(protocolName, handler, scoper) {
        var config = this._msgConfig[protocolName];
        var triggerKey = config['triggerKey'] || protocolName + "_update";

        this._notifierCenter.register(triggerKey, handler, scoper);
    },

    ignoreMsg: function ignoreMsg(protocolName, handler, scoper) {
        var config = this._msgConfig[protocolName];
        var triggerKey = config['triggerKey'] || protocolName + "_update";

        this._notifierCenter.ignore(triggerKey, handler, scoper);
    },

    onResponse: function onResponse(response, modelName) {
        if (!response) {
            tm.LOGE("tm.ModelMgr", "onResponse response is null");
            return;
        }

        if (!modelName) {
            tm.LOGE("tm.ModelMgr", "onResponse modelName is null");
            return;
        }

        var config = this._msgConfig[modelName];
        var triggerKey = config['triggerKey'] || modelName + "_update";

        if (response) {
            this._notifierCenter.trigger(triggerKey, response);
        }
    },

    createModel: function createModel(modelName) {
        var model = this.modelMap[modelName];
        if (!model) {
            var msgConfig = this._msgConfig[modelName];
            var modelClass = msgConfig['modelClass'] || tm.MsgModel;

            model = new modelClass(modelName, this._notifierCenter, this);
            this.addModel(model);
        }
        return model;
    },

    fgetModel: function fgetModel(modelName) {
        return this.modelMap[modelName];
    },

    /**
     * Register a model with the ModelManager
     * @param {puremvc.model}
     */
    addModel: function addModel(model) {
        this.modelMap[model.model_name] = model;
    },

    hasModel: function hasModel(modelName) {
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
    removeModel: function removeModel(modelName) {
        var model = this.modelMap[modelName];
        if (model) {

            if (model.destroy) {
                model.destroy();
            }

            this.modelMap[modelName] = null;
        }
    },

    destroy: function destroy() {
        for (var k in this.modelMap) {
            this.removeModel(k);
        }
        this._msgCbs = null;
        this.modelMap = null;
        this._super();
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
        //# sourceMappingURL=tm_model_mgr.js.map
        