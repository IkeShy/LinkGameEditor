/**
 *
 * 注意: 标记为Ref的对象为引用对象, 不要在这个类改变属性.
 *
 * 内容: http请求,请求策略: 目前是one by one 可以满足业务需求
 *
 *
 */

tm.NetState = {
    UNKNOWN : -1,
    NO_NETWORK : 0,
    WWAN:1,
    WIFI:2
};

tm.netHttpCore =  (function(){
    var _netState =  -1;

    function netChange (data) {
        _netState = data['state'];
    };

    function get(url, params, cb, target, bLoading) {

        bLoading = typeof bLoading == "undefined" ? true : bLoading;

        if(_netState == tm.NetState.NO_NETWORK){
            tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_SM_HINT, tm.String.NO_NETWORK_HINT);
            return;
        };

        url = parseGetMsg(url, params);

        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 10 * 1000;
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
        xhr.setRequestHeader("Authorization", myAccount.account.token); // 添加token认证

        ['abort', 'error', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                cb(1, eventname);
            }
        });

        xhr.onreadystatechange = function () {
            var httpStatus = xhr.status;
            if (xhr.readyState == 4 && (httpStatus >= 200 && httpStatus <= 207)) {
                var response = xhr.responseText;
                tm.LOGD("Http Post", "response msg: ", response);

                bLoading && tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, false);
                let info = JSON.parse(response);
                if(info) {
                    if(info.status == 0) {
                        cb && cb.call(target, 0, JSON.parse(response), httpStatus);
                    } else {
                        tm.httpErrorCode.showHit(info.status);
                    }
                }
            } else if(xhr.status >= 400){

                bLoading && tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, false);

                tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_SM_HINT, tm.String.NET_ERROR);
                cb && cb.call(target, 1, null, httpStatus);
            }
        };

        tm.LOGD("Http get send msg: ", url);

        bLoading&&tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, true);

        xhr.send();
    }

    /**
     * 数据get方法
     * @param params
     * @returns {string}
     */
    function parseGetMsg(url, params) {
        if (!params) {
            return url;
        }

        let keys = Object.keys(params);
        for (let i = 0; i < keys.length; i++) {
            if (i == 0)
                url += '?'
            else
                url += '&';
            url += (keys[i] + '=' + params[keys[i]]);
        }

        return url;
    }

    /**
     * @param url
     * @param params
     * @param callback
     *
     * 例子：
     * let url = mySdk.config.ip + "/api/bi/getShareList";
       let params = {
            clientId:mySdk.config.clientId
       };

       tm.netHttpCore.post(url, params, function (error,data) {
         if(!error){
            let ret = data['data'];

         }
       });
     *
     */
    function post(url, params, callback, target, bLoading, async) {

        bLoading = typeof bLoading == "undefined" ? true : bLoading;

        if (_netState == tm.NetState.NO_NETWORK) {
            tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_SM_HINT, tm.String.NO_NETWORK_HINT);
            return;
        }

        var nums = arguments.length;
        if (nums == 2 && typeof  arguments[1] == 'function') {
            callback = arguments[1];
            params = "";
        }

        if (typeof async == "undefined") {
            async = true;
        }

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", url, !!async);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.setRequestHeader("Authorization", myAccount.account.token); // 添加token认证
        xhr.onreadystatechange = function () {
            var err = false;
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                err = false;

                bLoading && tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, false);

                let response = xhr.responseText;
                tm.LOGD("Http Post", "response msg: ", response);

                if (!response) {
                    callback && callback.call(target, err, null);
                } else {
                    let info = JSON.parse(response);
                    if(info) {
                        if(info.status == 0) {
                            callback && callback.call(target, err, JSON.parse(response));
                        } else {
                            tm.httpErrorCode.showHit(info.status);
                        }
                    }
                }
            } else if(xhr.status >= 400){
                err = true;

                bLoading&&tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, false);

                tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_SM_HINT, tm.String.NET_ERROR);

                tm.LOGD("NetHttpCore", "xhr readyState: " + xhr.readyState + " status: " + xhr.status);
            }
        };

        params = params || {};
        let sendStr = parsePostMsg(params);
        tm.LOGD("send msg: ", url ,sendStr);

        bLoading&&tm.notifierCenter.trigger(tm.Event.EVT_POP_COMMON_LOADING_EFFECT, true);

        try {
            xhr.send(sendStr)
        } catch(e) {
            tm.notifierCenter.trigger(tm.Event.APP_CATCH, e);
        }
    }

    /**
     * 数据解析方法
     * @param params
     * @returns {string}
     */
    function parsePostMsg(params) {
        if (!params) {
            return "";
        }

        let info = {
            "data": params
        };

        return JSON.stringify(info);
    }

    function init(){
        //TODO:监听网络变化
    }

    init();

    return {
        "get": get,
        "post": post
    }
})();