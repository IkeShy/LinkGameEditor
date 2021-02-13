/**
 * 内容: 平台消息协议配置
 *
 */


/**
 *
 * "key" : {           //key: 消息/model/协议 的key
 *     modelClass:lottory.baseModel,  //
 *     bCache:false,   //  是否缓存
 *     triggerKey: "",
 *     cmd:"",         // 命令类型
 *     params:{        // 命令参数
 *        action:""
 *     }
 * }
 *
 * @type {{}}
 */



window.lc = window.lc || {};

lc.msgProtocol = (function(){

    let msg = {};
    let bInit = false;

    function init() {
        if(bInit)
            return;
    }

    return {
        init:init,
        msg:msg
    };
})();