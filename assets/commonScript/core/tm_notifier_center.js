/**
 *
 *
 * 注意: 标记为Ref的对象为引用对象, 不要在这个类改变属性.
 *
 */

class NotifierCenter {

    constructor() {
        this.events = {};
    }

    /**
     * 检查是否重复
     * @param observers
     * @param scope
     * @param handler
     * @returns {boolean}
     */
    checkOverlap(observers, scope, handler){
        var obs = null;
        for(var i = 0; obs = observers[i]; i++){
            if(obs.scope == scope && obs.handler == handler){
                tm.LOGE(false, '[tm.NotifierCenter] 消息重复注册:' + ' function:' + handler.name);
                return true;
            }
        }

        return false;
    }
    /**
     * 添加观察者
     * @param eventName
     * @param handler
     * @param scope
     */
    register  (eventName, handler, scope) {
        if (typeof eventName != 'string' || typeof(handler) != 'function' || !scope) {
            tm.LOGE(false, 'tm.NotifierCenter listen err: eName :' + eventName + 'handler:'+ handler + ' !scope : ' + scope);
            return;
        }

        var observers = this.events[eventName] || [];

        if(!this.checkOverlap(observers, scope, handler)){

            var observer = {handler:handler,scope:scope};
            observers.push(observer);

            this.events[eventName] = observers;
        }
    }
    /**
     * 删除观察者
     * @param eventName
     * @param handler
     * @param scope
     */
    ignore (eventName, handler, scope) {
        if (arguments.length == 1){
            this.ignoreScope(arguments[0]);
            return;
        }

        if (typeof eventName != 'string' || typeof(handler) != 'function' || !scope) {
            tm.LOGE(false, 'tm.NotifierCenter remove err: eName :' + eventName + 'handler:'+ handler + ' scope: ' + scope);
            return;
        }

        //var observers = this.events[eventName],length = observers.length;
        //if (!observers || length <= 0) {
        //    return;
        //}

        var observers = this.events[eventName];
        if (!observers) {
            return;
        }

        var length = observers.length;
        if (length <= 0) {
            return;
        }

        for (var i = length - 1; i >= 0; i--) {
            var obs = observers[i];
            if (obs.scope == scope && obs.handler == handler) {
                observers.splice(i,1);
                break;
            }
        }
    }

    /**
     * 触发事件
     * @param eventName
     * @param params
     */
    trigger (eventName, params) {

        if (typeof eventName != 'string') {
            tm.LOGE(false, 'tm.NotifierCenter trigger err: eventName :' + eventName );
            return;
        }

        var obs = this.events[eventName],ob;
        if (!obs) {
            return;
        }

        var args = Array.prototype.slice.call(arguments, 1);
        var length = obs.length;
        for(var i = length - 1; i >= 0; i--){
            var ob = obs[i];
            if(ob){
                if(CC_DEBUG) {
                    ob.handler.apply(ob.scope, args);
                } else {
                    try {
                        ob.handler.apply(ob.scope, args);
                    }catch (e){
                        tm.notifierCenter.trigger(tm.Event.APP_CATCH, e);
                    }
                }
            }
        }
    }
    /**
     * 删除scope相同的观察者
     * @param scope
     */
    ignoreScope (scope) {
        if(typeof scope  == 'string'){
            tm.LOGE(false, 'ignoreScope parameter error');
            return;
        }

        for (var eventName in this.events) {
            var obs = this.events[eventName];
            if (obs) {
                var length = obs.length;
                for(var i = length - 1; i >= 0; i--){
                    var ob = obs[i];
                    if(ob['scope'] == scope){
                        obs.splice(i, 1);
                    }
                }
            }
        }

    }

    destroy(){
        this.events = null;
    }
}

tm.NotifierCenter = NotifierCenter;