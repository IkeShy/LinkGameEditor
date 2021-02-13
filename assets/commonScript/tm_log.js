/**
 *
 * 注意: 标记为Ref的对象为引用对象, 不要在这个类改变属性.
 *
 * 内容: LOG工具函数
 *
 */

require('./tm_index');

tm.LOGD = function(tag, msg){

    if(!CC_DEBUG){
        return;
    }

    if(typeof msg == "object"){
        msg = JSON.stringify(msg)
    }

    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            var s = "";
            if(typeof arguments[i] == "object"){
                s = JSON.stringify(arguments[i])
            }else {
                s = arguments[i];
            }
            msg += ' ' + s;
        }
    }

    var curDate = new Date();
    var curTime = curDate.toLocaleTimeString() + ':' + curDate.getMilliseconds();
    var str = '[DEBUG][ ' + curTime + ']\t';

    cc.log(str + "[" + tag + "]" + msg);
};

tm.LOGE = function(tag, msg){
    if(!CC_DEBUG){
        return;
    }

    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            msg += ' ' + arguments[i];
        }
    }

    var curDate = new Date();
    var curTime = curDate.toLocaleTimeString() + ':' + curDate.getMilliseconds();
    var str = '[ERROR][ ' + curTime + ']\t';

    cc.error(str + "[" + tag + "]" + msg);
};

tm.ASSERT = function(cond,msg){
    if(!CC_DEBUG){
        return;
    }

    if (!cond) {
        if (arguments.length > 2) {
            for (var i = 2; i < arguments.length; i++) {
                msg += ' ' + arguments[i];
            }
        }

        var curDate = new Date();

        var curTime = curDate.toLocaleTimeString() + ':' + curDate.getMilliseconds();
        var str = '[ ' + curTime + ']\t';

        cc.assert(cond, str + msg);
    }
};
